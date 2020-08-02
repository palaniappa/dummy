import { Store } from "./store";
import { Bookmarks, Bookmark } from "../model/bookmark";
import { Parameters, Parameter } from "../model/parameter";
import { HtmlUtil } from "../utils/htmlutils";
import { ParameterUtil } from "../utils/parameterutils";

import * as $ from 'jquery';

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
                    let resolvedUrl = ParameterUtil.getResolvedUrl(url, parameters, currentTab);

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
                let table = HtmlUtil.createTable(items, hearders);
                globalParameterListContainer.innerHTML = '';
                globalParameterListContainer.appendChild(table);
            });

        }
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