

export class HtmlUtil {
    public static createTable(tableData: Array<Array<string>>, headers: Array<string>): HTMLElement {
        let table = document.createElement('table');

        if (headers) {
            let tableHead = document.createElement('thead');

            let headerRow = document.createElement('tr');

            headers.forEach(function (headerData) {
                let cell = document.createElement('th');
                cell.appendChild(document.createTextNode(headerData));
                headerRow.appendChild(cell);
            });
            tableHead.appendChild(headerRow);
            table.appendChild(tableHead);
        }

        let tableBody = document.createElement('tbody');

        tableData.forEach(function (rowData) {
            let row = document.createElement('tr');

            rowData.forEach(function (cellData) {
                let cell = document.createElement('td');
                cell.appendChild(document.createTextNode(cellData));
                row.appendChild(cell);
            });

            tableBody.appendChild(row);
        });

        table.appendChild(tableBody);
        return table;
    }
}