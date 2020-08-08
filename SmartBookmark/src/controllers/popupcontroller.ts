import { Store } from "./store";
import { Bookmarks, Bookmark, BOOKMARK_ID_PREFIX } from "../model/bookmark";
import { Parameters, Parameter, PARAMETER_ID_PREFIX } from "../model/parameter";
import { HtmlUtil } from "../utils/htmlutils";
import { ParameterUtil } from "../utils/parameterutils";
import { Util } from "../utils/util";

import * as $ from 'jquery';

export class PopupController {

    public static instance: PopupController = new PopupController();
    public bookmarkEditId: string = null;

    public render(): Promise<void> {
        console.log("rendering!")
        let p = this.renderBookmarks();
        this.renderBookmarkAddControls();
        this.renderParameters();
        this.renderParameterAddControls();
        return p.then(() => {
            console.log("rendering complete!");
        });
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
                let bmList = document.createElement("ul");
                bmList.className = "bmUList";
                return ParameterUtil.getAllParameterValues(parameters, currentTab).then((parameterValues) => {
                    bookmarks.items.forEach(bookmark => {
                        let url = bookmark.url;
                        let resolvedUrl = ParameterUtil.getResolvedUrl(url, parameters, parameterValues);
                        let bmUi = HtmlUtil.getBookmarkDisplay(bookmark, resolvedUrl, this.deleteBookmark.bind(this), this.editBookmark.bind(this));
                        bmList.appendChild(bmUi);
                    });
                    bookmarkListContainer.appendChild(bmList);
                });

            }
        });
    }

    private renderBookmarkAddControls(): void {
        $("#bmName").val('');
        $("#bmUrl").val('');
        this.bookmarkEditId = '';
        $('#bmAdd').off('click').on('click',() => {
            let bmName = $("#bmName").val() as string;
            let bmUrl = $("#bmUrl").val() as string;
            this.addBookmarkItem(this.bookmarkEditId,bmName, bmUrl).then(() => {
                this.render();
            });
        });
    }

    private addBookmarkItem(id: string, name: string, url: string): Promise<void> {
        if (name && url) {
            if (id == '') {
                id = Util.getUniqueId(BOOKMARK_ID_PREFIX);
            }
            let newBookmark: Bookmark = { id: id, name: name, url: url };
            return Store.instance.addBookmark(newBookmark);
        }
        return
    }

    public deleteBookmark(bookmarkId: string): void {
        Store.instance.deleteBookmark(bookmarkId).then(() => {
            this.render();
        });
    }

    public editBookmark(bookmarkId: string): void {
        Store.instance.getBookmark(bookmarkId).then((bookmark) => {
            if (bookmark) {
                this.bookmarkEditId = bookmarkId;
                $("#bmName").val(bookmark.name);
                $("#bmUrl").val(bookmark.url);
            }
        });
    }

    private renderParameters(): void {
        let promiseParameters = Store.instance.getParameters();
        let globalParameterListContainer = document.getElementById("globalParameterList");
        if (globalParameterListContainer) {
            promiseParameters.then((parametersObject: Parameters) => {
                document.createElement("table");
                let items: Array<Array<Object>> = [];
                parametersObject.items.forEach(p => {
                    if (p) {
                        let closeButton = HtmlUtil.getCloseButton(p.id,this.deleteParameter.bind(this));
                        let paramItem = [p.key, p.value,closeButton];
                        items.push(paramItem);
                    }
                });
                let hearders: Array<string> = [];
                hearders.push("Key");
                hearders.push("Value");
                hearders.push("x");
                let table = HtmlUtil.createTable(items, hearders);
                globalParameterListContainer.innerHTML = '';
                globalParameterListContainer.appendChild(table);
            });

        }
    }

    private renderParameterAddControls(): void {
        $("#pmKey").val("");
        $("#pmValue").val("");
        $('#pmAdd').off('click').on('click',() => {
            let pmKey = $("#pmKey").val() as string;
            let pmValue = $("#pmValue").val() as string;
            this.addParameter(pmKey, pmValue).then(() => {
                this.render();
            });
        });
    }

    private addParameter(key: string, value: string): Promise<void> {
        if (key && value) {
            let newParameter: Parameter = { id: Util.getUniqueId(PARAMETER_ID_PREFIX), key: key, value: value };
            return Store.instance.addParameter(newParameter);
        }
        return
    }

    public deleteParameter(parameterId: string): void {
        Store.instance.deleteParameter(parameterId).then(() => {
            this.render();
        });
    }
}