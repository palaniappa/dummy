package com.data.playground.schema;

import au.com.bytecode.opencsv.CSVParser;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.AmazonS3URI;
import com.amazonaws.services.s3.model.*;
import com.data.playground.exception.PlaygroundException;
import com.data.playground.model.data.dto.FieldType;
import com.data.playground.model.data.dto.SchemaRequest;
import com.data.playground.model.data.dto.TableField;
import com.data.playground.model.data.dto.TableSchema;
import com.data.playground.repositories.entity.Catalog;
import com.data.playground.util.CommonUtil;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

public class S3SchemaAnalyzer extends SchemaAnalyzer {
    public S3SchemaAnalyzer(Catalog catalog, SchemaRequest schemaRequest) {
        super(catalog, schemaRequest);
        if (schemaRequest.getTableNameOrLocationPath().endsWith("/") == false) {
            schemaRequest.setTableNameOrLocationPath(schemaRequest.getTableNameOrLocationPath() + "/");
        }
    }

    @Override
    public TableSchema getSchema() throws PlaygroundException {

        String accessKey = this.catalogConnectProperties.get("hive.s3.aws-access-key");
        String secretKey = this.catalogConnectProperties.get("hive.s3.aws-secret-key");
        String endPoint = this.catalogConnectProperties.get("hive.s3.endpoint");
        //https://s3.ap-south-1.amazonaws.com/
        AmazonS3URI path = new AmazonS3URI(schemaRequest.getTableNameOrLocationPath().replace("s3a://", endPoint));

        BasicAWSCredentials awsCreds = new BasicAWSCredentials(accessKey, secretKey);
        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(endPoint, path.getRegion()))
                .build();

//        S3Object object = s3Client.getObject(new GetObjectRequest(path.getBucket(),path.getKey()));
//        System.out.println(object.getBucketName());

        ListObjectsV2Request request = new ListObjectsV2Request()
                .withBucketName(path.getBucket())
                .withPrefix(path.getKey());

        ListObjectsV2Result objectsV2Result = s3Client.listObjectsV2(request);
        if (objectsV2Result.getObjectSummaries() == null
                || objectsV2Result.getObjectSummaries().size() == 0) {
            throw new PlaygroundException(HttpStatus.BAD_REQUEST, "No csv files found");
        }
        List<TableField> fields = null;
        List<String[]> sampleRows = new ArrayList<>();
        for (S3ObjectSummary object : objectsV2Result.getObjectSummaries()) {
            System.out.println(object.getKey());
            if (object.getKey().endsWith(".csv")) {
                fields = this.getFieldsFromCsv(s3Client, object, sampleRows);
                if (fields != null) {
                    break;
                }
            }
        }

//        ListObjectsRequest listObjectsRequest = new ListObjectsRequest().withBucketName("palaniappas3");
//        ObjectListing listing = s3Client.listObjects(listObjectsRequest);
//        for(S3ObjectSummary s :  listing.getObjectSummaries()) {
//            System.out.println(s.getKey());
//        }

//        GetBucketLocationRequest request =  new GetBucketLocationRequest("palaniappas3");
//        String location = s3Client.getBucketLocation(request);
//        System.out.println(location);

        //s3Client.getObject()

//        ListObjectsV2Result result = s3Client.listObjectsV2("palaniappas3");
//        List<S3ObjectSummary> objects = result.getObjectSummaries();
//        for (S3ObjectSummary os : objects) {
//            System.out.println("* " + os.getKey());
//        }

        TableSchema tableSchema = new TableSchema();
        tableSchema.setFields(fields);
        tableSchema.setSamplesRows(sampleRows);
        return tableSchema;
    }

    private List<TableField> getFieldsFromCsv(AmazonS3 s3Client, S3ObjectSummary fileObject, List<String[]> sampleRows) {
        if (fileObject == null || s3Client == null) {
            return null;
        }
        try {
            CSVParser parser = new CSVParser();
            S3Object object = s3Client.getObject(new GetObjectRequest(fileObject.getBucketName(), fileObject.getKey()));
            if (object != null) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(object.getObjectContent()));
                String[] headers = null;
                String currentLine = null;
                while ((currentLine = reader.readLine()) != null) {
                    if (!CommonUtil.isEmpty(currentLine)) {
                        String[] items = parser.parseLine(currentLine);
                        if (items != null && items.length > 0) {
                            if (headers == null) {
                                headers = items;
                            } else {
                                if (items.length == headers.length) {
                                    sampleRows.add(items);
                                } else {
                                    throw new PlaygroundException("Invalid csv file");
                                }
                            }
                        }

                    }
                    if (sampleRows.size() == 5) {
                        break;
                    }
                }
                List<TableField> fields = new ArrayList<>();
                int idx = 0;
                for (String header : headers) {
                    TableField newField = new TableField();
                    newField.setFieldName(getFormattedFieldName(header));
                    newField.setFieldType(getFieldType(sampleRows, idx));
                    fields.add(newField);
                    idx++;
                }
                return fields;
            }

        } catch (Exception e) {
            System.out.println("Exception while getting the table schema %s" + e.getMessage());
        }

        return null;
    }

    private String getFormattedFieldName(String name) {
        return name.replaceAll(" ", "_");
    }

    private FieldType getFieldType(List<String[]> sampleRows, int columnIndex) {
        FieldType type = FieldType.TEXT;
        int dateCount = 0;
        int numberCount = 0;
        int dateTimeCount = 0;
        if (sampleRows.size() > 0) {
            for (String[] row : sampleRows) {
                String data = row[columnIndex];
                if (isNumber(data))
                    numberCount++;

                if (isDate(data))
                    dateCount++;

                if (isDateTime(data))
                    dateTimeCount++;
            }

            if (numberCount > 0 || dateCount > 0 || dateTimeCount > 0) {
                if (dateTimeCount > numberCount && dateTimeCount > dateCount)
                    return FieldType.DATETIME;
                else if (dateCount > numberCount && dateCount > dateTimeCount)
                    return FieldType.DATE;
                return FieldType.NUMBER;
            }
        }
        return type;
    }

    private boolean isNumber(String data) {
        try {
            Float.parseFloat(data);
            return true;
        } catch (NumberFormatException e) {

        }
        return false;
    }

    private boolean isDate(String data) {
        try {
            new SimpleDateFormat("yyyy-MM-dd").parse(data);
            return true;
        } catch (ParseException e) {

        }
        return false;
    }

    private boolean isDateTime(String data) {
        try {
            DateTimeFormatter format = DateTimeFormat.forPattern("dd/MM/yyyy HH:mm:ss");
            format.parseDateTime(data);
            return true;
        } catch (Exception e) {

        }
        return false;
    }
}
