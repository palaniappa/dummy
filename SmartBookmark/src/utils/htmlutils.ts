import { doc } from "prettier";


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

    public static getListItemWithClose(childElemet: HTMLElement): HTMLElement {
        let newLi = document.createElement("li");
        newLi.appendChild(childElemet);
        let closeButton = document.createElement("span");
        closeButton.className = "close";
        closeButton.innerHTML = '&times;';
        newLi.appendChild(closeButton);
        return newLi;

    }

    public static getBookmarkDisplay(name: string, resolvedUrl: string): HTMLElement {
        let anchorElement = HtmlUtil.getAnchorElement(name, resolvedUrl);
        return HtmlUtil.getListItemWithClose(anchorElement);
    }

    public static getAnchorElement(name: string, resolvedUrl: string): HTMLElement {
        let x = document.createElement("A");
        let t = document.createTextNode(name);
        x.setAttribute("target", "_base");
        x.setAttribute("href", resolvedUrl);
        x.appendChild(t);
        return x;
    }
}