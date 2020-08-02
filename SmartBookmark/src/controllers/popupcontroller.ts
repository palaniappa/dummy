import { Store } from "./store";
import { Bookmarks, Bookmark } from "../model/bookmark";
import { Parameters, Parameter } from "../model/parameter";
import * as $ from 'jquery';

const PARAM_TYPE_ACTIVE_TAB = "$ActiveTab";
const PARAM_TYPE_JS_VALUE = "$Js";
const PARAM_TYPE_SEPARATOR = ":";

export class PopupController {

    public static instance: PopupController = new PopupController();

    public render(): Promise<void> {
        let p = this.renderBookmarks();
        this.renderBookmarkAddControls();
        this.renderParameters();
        this.renderParameterAddControls();
        return p;
    }

    private getCurrentActiveTab(): Promise<chrome.tabs.Tab> {
        let queryReq = { active: true, currentWindow: true };

        let p = new Promise<chrome.tabs.Tab>((resolve, reject) => {
            chrome.tabs.query(queryReq, (tabs: [chrome.tabs.Tab]) => {
                let currentTab = tabs[0];
                resolve(currentTab);
            });
        });
        return p;
    }

    private renderBookmarks(): Promise<void> {
        let bmPromise = Store.instance.getBookmarks();
        let ctPromise = this.getCurrentActiveTab();
        let parametersPromise = Store.instance.getParameters();
        return Promise.all([bmPromise, parametersPromise, ctPromise]).then((result: any) => {
            let bookmarks: Bookmarks = result[0];
            let parameters: Parameters = result[1];
            let currentTab: chrome.tabs.Tab = result[2];

            let bookmarkListContainer = document.getElementById("bookmarkList");
            if (bookmarkListContainer) {
                bookmarkListContainer.innerHTML = '';
                let first = true;
                bookmarks.items.forEach(bookmark => {

                    let x = document.createElement("A");
                    let t = document.createTextNode(bookmark.name);
                    let url = bookmark.url;
                    let resolvedUrl = this.getResolvedUrl(url, parameters, currentTab);

                    x.setAttribute("target", "_base");
                    x.setAttribute("href", resolvedUrl);
                    x.appendChild(t);

                    if (first == false) {
                        let breakItem = document.createElement("br");
                        bookmarkListContainer.appendChild(breakItem);
                    }
                    first = false;
                    bookmarkListContainer.appendChild(x);
                });
            }

        });
    }

    private getResolvedUrl(url: string, parameters: Parameters, currentTab: chrome.tabs.Tab): string {
        let resolvedUrl: string = url;
        if (parameters) {
            parameters.items.forEach(p => {
                let paramValue = this.getRuntimeParamValue(p.value, currentTab);
                resolvedUrl = this.substituteValue(resolvedUrl, p.key, paramValue)
            });
        }
        return resolvedUrl;
    }

    private getFormattedParamName(paramName: string): string {
        return "{{" + paramName + "}}";
    }

    private getRuntimeParamValue(paramValue: string, currentActiveTab: chrome.tabs.Tab): string {
        if (paramValue.indexOf(PARAM_TYPE_SEPARATOR) > 0) {
            let items = paramValue.split(PARAM_TYPE_SEPARATOR);
            let paramValueType = items[0];
            let computedValue = items[1];
            if (paramValueType == PARAM_TYPE_ACTIVE_TAB) {
                let propertyName = items[1];
                computedValue = this.getActiveTabValue(propertyName, currentActiveTab);
            }
            else if (paramValueType == PARAM_TYPE_JS_VALUE) {
                let expression = items[1];
                computedValue = eval(expression);
            }
            return computedValue;
        }
        return paramValue;
    }

    private getActiveTabValue(variable: string, currentActiveTab: chrome.tabs.Tab) {
        let varValue = "";
        if (currentActiveTab && currentActiveTab.url) {
            let uri = new URL(currentActiveTab.url);
            varValue = uri[variable];
        }

        return varValue;
    }

    private substituteValue(url: string, paramName: string, paramValue: string) {
        url = url.replace(this.getFormattedParamName(paramName), paramValue);
        return url;
    }

    private renderBookmarkAddControls(): void {
        $("#bmName").val('');
        $("#bmUrl").val("");
        $('#bmAdd').click(() => {
            let bmName = $("#bmName").val() as string;
            let bmUrl = $("#bmUrl").val() as string;
            this.addBookmarkItem(bmName, bmUrl).then(() => {
                this.render();
            });
        });
    }

    private addBookmarkItem(name: string, url: string): Promise<void> {
        if (name && url) {
            let newBookmark: Bookmark = { name: name, url: url };
            return Store.instance.addBookmark(newBookmark);
        }
        return
    }

    private renderParameters(): void {
        let promiseParameters = Store.instance.getParameters();

        let globalParameterListContainer = document.getElementById("globalParameterList");

        if (globalParameterListContainer) {
            globalParameterListContainer.innerHTML = '';
            promiseParameters.then((parametersObject: Parameters) => {
                document.createElement("table");
                let items: Array<Array<string>> = [];
                parametersObject.items.forEach(p => {
                    if (p) {
                        let paramItem = [p.key, p.value];
                        items.push(paramItem);
                    }
                });
                let hearders: Array<string> = [];
                hearders.push("Key");
                hearders.push("Value");
                let table = this.createTable(items, hearders);
                globalParameterListContainer.appendChild(table);
            });

        }
    }

    private createTable(tableData: Array<Array<string>>, headers: Array<string>): HTMLElement {
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

    private renderParameterAddControls(): void {
        $("#pmKey").val("");
        $("#pmValue").val("");
        $('#pmAdd').click(() => {
            let pmKey = $("#pmKey").val() as string;
            let pmValue = $("#pmValue").val() as string;
            this.addParameter (pmKey, pmValue).then(() => {
                this.render();
            });
        });

    }

    private addParameter(key: string, value: string): Promise<void> {
        if (key && value) {
            let newParameter: Parameter = { key: key, value: value };
            return Store.instance.addParameter(newParameter);
        }
        return
    }
}