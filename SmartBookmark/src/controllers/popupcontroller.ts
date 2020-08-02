import { Store } from "./store";
import { Bookmarks } from "../model/bookmark";
import { Parameters } from "../model/parameter";

const PARAM_TYPE_ACTIVE_TAB = "$ActiveTab";
const PARAM_TYPE_JS_VALUE = "$Js";
const PARAM_TYPE_SEPARATOR = ":";

export class PopupController {

    public static instance: PopupController = new PopupController();

    public render(): Promise<void> {
        this.renderBookmarks();
        this.renderBookmarkAddControls();
        this.renderParameters();
        this.renderParameterAddControls();
        return null;
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
                var first = true;
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
        var varValue = "";
        var uri = new URL(currentActiveTab.url);
        varValue = uri[variable];
        return varValue;
    }

    private substituteValue(url: string, paramName: string, paramValue: string) {
        url = url.replace(this.getFormattedParamName(paramName), paramValue);
        return url;
    }

    private renderBookmarkAddControls(): void {

    }

    private renderParameters(): void {

    }

    private renderParameterAddControls(): void {

    }
}