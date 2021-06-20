package com.parquet.read;

import com.parquet.model.ColumnMetadata;
import com.parquet.model.ColumnType;
import com.parquet.model.Row;
import com.parquet.model.Table;
import net.sf.jsqlparser.parser.CCJSqlParser;
import net.sf.jsqlparser.parser.CCJSqlParserUtil;
import net.sf.jsqlparser.statement.Statement;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.parquet.ParquetReadOptions;
import org.apache.parquet.column.ColumnDescriptor;
import org.apache.parquet.column.ColumnReader;
import org.apache.parquet.column.impl.ColumnReaderImpl;
import org.apache.parquet.column.page.DataPage;
import org.apache.parquet.column.page.PageReadStore;
import org.apache.parquet.column.page.PageReader;
import org.apache.parquet.example.data.Group;
import org.apache.parquet.example.data.simple.convert.GroupRecordConverter;
import org.apache.parquet.format.LogicalTypes;
import org.apache.parquet.hadoop.ParquetFileReader;
import org.apache.parquet.hadoop.metadata.FileMetaData;
import org.apache.parquet.hadoop.util.HadoopInputFile;
import org.apache.parquet.io.ColumnIOFactory;
import org.apache.parquet.io.InputFile;
import org.apache.parquet.io.MessageColumnIO;
import org.apache.parquet.io.RecordReader;
import org.apache.parquet.io.api.Binary;
import org.apache.parquet.schema.MessageType;
import org.apache.parquet.schema.OriginalType;
import org.apache.parquet.schema.PrimitiveType;
import org.apache.parquet.schema.Type;
import org.checkerframework.checker.units.qual.C;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.MathContext;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Main {

    public static void main(String[] args) throws Exception {
        System.out.println("Welcome to parquet learning!");

        CCJSqlParser parser = CCJSqlParserUtil.newParser("select id,member_id,loan_amnt,int_rate,installment,grade from \"/Volumes/HDD2/mywork/dataset/loans.parquet\"");
        Statement statement = parser.Statement();

        System.out.println(statement.toString());

        String path = args[0];
        InputFile inputFile = HadoopInputFile.fromPath(new Path(path), new Configuration());
        ParquetReadOptions parquetReadOptions = new ParquetReadOptions.Builder().build();
        ParquetFileReader parquetFileReader = new ParquetFileReader(inputFile, parquetReadOptions);
        FileMetaData fileMetaData = parquetFileReader.getFileMetaData();
        System.out.println("Metadata " + fileMetaData.toString());

        Set<String> columnsToProject = new HashSet<>();
//        columnsToProject.add("id");
//        columnsToProject.add("personname");
//        columnsToProject.add("gender");
//        columnsToProject.add("occupation");
//        columnsToProject.add("yearlyincome");
        columnsToProject.add("id");
        columnsToProject.add("member_id");
        columnsToProject.add("loan_amnt");
        columnsToProject.add("int_rate");
        columnsToProject.add("installment");
        columnsToProject.add("grade");


        List<Type> fieldsToRead = new ArrayList<>();

        Table table = new Table();
        table.setTableName(path);
        for(String c : columnsToProject) {
            if(!fileMetaData.getSchema().containsField(c))
                throw new Exception("Requested column " + c + " not found in the file.");
            Type fieldToRead = fileMetaData.getSchema().getType(c);
            fieldsToRead.add(fieldToRead);
            table.getColumnMetadata().add(new ColumnMetadata(c, getColumnType(fieldToRead.getOriginalType())));
        }

        MessageType schemaToRead = new MessageType("hive_schema", fieldsToRead);

//        List<ColumnDescriptor> fieldsToRead = new ArrayList<>();
//        for (ColumnDescriptor columnDescriptor : fileMetaData.getSchema().getColumns()) {
//            String[] paths = columnDescriptor.getPath();
//            for(String p : paths) {
//                if(columnsToProject.contains(p)) {
//                    fieldsToRead.add(columnDescriptor);
//                    break;
//                }
//            }
//        }

        ColumnIOFactory columnIOFactory = new ColumnIOFactory();
        MessageColumnIO messageColumnIO = columnIOFactory.getColumnIO(schemaToRead, fileMetaData.getSchema());

        //messageColumnIO.getChild("id");


        System.out.println("All the requested columns are present");
        PageReadStore rowGroup = parquetFileReader.readNextRowGroup();
        boolean done = rowGroup == null;
        while (!done) {

            System.out.println("total rows in page : " + rowGroup.getRowCount());

             RecordReader<Group> recordReader = messageColumnIO.getRecordReader(rowGroup,new GroupRecordConverter(schemaToRead));

             for(int i=0;i<rowGroup.getRowCount();++i) {
                 Group g = recordReader.read();
                 Row currentRow = readRow(g);
                 table.getRows().add(currentRow);
             }

//            for(ColumnDescriptor columnDescriptor : fieldsToRead) {
//                PageReader pageReader = rowGroup.getPageReader(columnDescriptor);
//                DataPage dataPage = pageReader.readPage();
//                System.out.println(dataPage.getValueCount());
//            }

            rowGroup = parquetFileReader.readNextRowGroup();
            done = rowGroup == null;
        }

        table.print(50);

    }

    private static boolean isInteger(OriginalType originalType) {
        switch (originalType) {
            case INT_8:
            case INT_16:
            case INT_32:
            case INT_64:
            case UINT_8:
            case UINT_16:
            case UINT_32:
            case UINT_64:
                return true;
            default:
                return false;
        }
    }
    private static ColumnType getColumnType(OriginalType originalType) throws Exception {
        if(isInteger(originalType))
            return ColumnType.INTEGER;

        switch (originalType) {
            case DECIMAL:
                return ColumnType.DECIMAL;
            case UTF8:
                return ColumnType.STRING;
            default:
                throw new Exception("Unkown original type");
        }
    }

    private static Row readRow(Group g) throws Exception {

        Row currentRow = new Row();

        int fieldCount = g.getType().getFieldCount();
        for (int field = 0; field < fieldCount; field++) {
            int valueCount = g.getFieldRepetitionCount(field);
            if(valueCount > 1)
                throw new Exception("List type is not supported");

            Type fieldType = g.getType().getType(field);
            String fieldName = fieldType.getName();

            int index = 0;

            //for (int index = 0; index < valueCount; index++) {
                if (fieldType.isPrimitive()) {
                    if(fieldType.getOriginalType() == OriginalType.DECIMAL) {
                        Binary binary = g.getBinary(field, index);
                        BigDecimal decimal = convertBinaryToDecimal(binary,38,15);
                        //System.out.println(decimal);
                        currentRow.add(decimal);
                    }
                    else if(isInteger(fieldType.getOriginalType())) {
                        currentRow.add(g.getLong(field,index));
                    }
                    else {
                        //System.out.println(fieldName + " " + g.getValueToString(field, index));
                        currentRow.add(g.getValueToString(field, index));
                    }
                }
            //}
        }
        return currentRow;
    }

    private static BigDecimal convertBinaryToDecimal(Binary value, int precision, int scale)
    {
        // based on parquet-mr pig conversion which is based on spark conversion... yo dawg?
        if (precision <= 18) {
            ByteBuffer buffer = value.toByteBuffer();
            byte[] bytes = buffer.array();
            int start = buffer.arrayOffset() + buffer.position();
            int end = buffer.arrayOffset() + buffer.limit();
            long unscaled = 0L;
            int i = start;
            while (i < end) {
                unscaled = (unscaled << 8 | bytes[i] & 0xff);
                i++;
            }
            int bits = 8 * (end - start);
            long unscaledNew = (unscaled << (64 - bits)) >> (64 - bits);
            if (unscaledNew <= -Math.pow(10, 18) || unscaledNew >= Math.pow(10, 18)) {
                return new BigDecimal(unscaledNew);
            } else {
                return BigDecimal.valueOf(unscaledNew / Math.pow(10, scale));
            }
        } else {
            return new BigDecimal(new BigInteger(value.getBytes()), scale);
        }
    }
}
