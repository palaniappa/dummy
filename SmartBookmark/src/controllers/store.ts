import { Parameter, Parameters } from "../model/parameter";
import { Bookmark, Bookmarks } from "../model/bookmark";
import { ParameterUtil } from "../utils/parameterutils";

export class Store {

    public static instance: Store = new Store();

    parameters: Parameters = { items: [] };
    bookmarks: Bookmarks = { items: [] };


    private initializeDefaults(): void {
        this.parameters.items.push({ key: "CurrentTabOrigin", value: ParameterUtil.PARAM_TYPE_ACTIVE_TAB + ParameterUtil.PARAM_TYPE_SEPARATOR + "origin" });
        this.parameters.items.push({ key: "CurrentTabHost", value: ParameterUtil.PARAM_TYPE_ACTIVE_TAB + ParameterUtil.PARAM_TYPE_SEPARATOR + "host" });
        this.parameters.items.push({ key: "SearchText", value: ParameterUtil.PARAM_TYPE_JS_VALUE + ParameterUtil.PARAM_TYPE_SEPARATOR + "'news on ' + new Date().toString()" });
        this.parameters.items.push({ key: "DayOfWeek", value: ParameterUtil.PARAM_TYPE_JS_VALUE + ParameterUtil.PARAM_TYPE_SEPARATOR + "new Date().toString().split(' ')[0] + 'day'" });
        this.parameters.items.push({ key: "PageTitle", value: ParameterUtil.PARAM_TYPE_ACTIVE_TABE_JS_VALUE + ParameterUtil.PARAM_TYPE_SEPARATOR + "document.querySelector('title') ? document.querySelector('title').innerText : 'no title';" });
        this.parameters.items.push({ key: "TenantId", value: ParameterUtil.PARAM_TYPE_ACTIVE_TABE_JS_VALUE + ParameterUtil.PARAM_TYPE_SEPARATOR + 'document.querySelector("body > table > tbody > tr:nth-child(3) > td:nth-child(2)").textContent.trim()' });
        this.parameters.items.push({ key: "OrgId", value: ParameterUtil.PARAM_TYPE_ACTIVE_TABE_JS_VALUE + ParameterUtil.PARAM_TYPE_SEPARATOR + 'document.querySelector("body > table > tbody > tr:nth-child(2) > td:nth-child(2)").textContent.trim()' });

        this.bookmarks.items.push({ name: "TenantInfo", url: "{{CurrentTabOrigin}}/qa/cdp/cdp.jsp" });
        this.bookmarks.items.push({ name: "Generate JWT", url: "{{CurrentTabOrigin}}/qa/cdp/generatejwt.jsp" });
        this.bookmarks.items.push({ name: "Mint JWT", url: "{{CurrentTabOrigin}}/qa/cdp/mintedjwt.jsp?issuerId={{OrgId}}&audienceId={{TenantId}}&type=JWT" });
        this.bookmarks.items.push({ name: "News Today", url: "https://www.google.com/search?q={{SearchText}}" });
        this.bookmarks.items.push({ name: "Google Current Host", url: "https://www.google.com/search?q={{CurrentTabHost}}" });
        this.bookmarks.items.push({ name: "Joke on Day", url: "https://www.google.com/search?q=Tell me a joke about {{DayOfWeek}}" });
        this.bookmarks.items.push({ name: "Google Current Page Title", url: "https://www.google.com/search?q={{PageTitle}}" });

    }

    public initialize(): Promise<void> {
        this.initializeDefaults();
        let p1 = this.saveParameters(this.parameters);
        let p2 = this.saveBookmarks(this.bookmarks);
        return Promise.all([p1, p2]).then();
    }

    public getBookmarks(): Promise<Bookmarks> {
        let p = new Promise<Bookmarks>( (resolve,reject) =>{
            chrome.storage.sync.get("BookmarkList", (result: any) => {
                let bookmarks: Bookmarks = result.BookmarkList as Bookmarks;
                resolve(bookmarks);
            });
        });
        return p;
    }

    public getParameters(): Promise<Parameters> {
        let p = new Promise<Parameters>( (resolve,reject) =>{
            chrome.storage.sync.get("ParamList", (result: any) => {
                let parameters: Parameters = result.ParamList as Parameters;
                resolve(parameters);
            });
        });
        return p;
    }

    public saveParameters(parametersObject: Parameters): Promise<void> {
        let p = new Promise<void>((resolve, reject) => {
            chrome.storage.sync.set({ ParamList: parametersObject }, () => {
                console.log("Saved parameters");
                resolve();
            });
        });
        return p;
    }

    public saveBookmarks(bookmarksObject: Bookmarks): Promise<void> {
        let p = new Promise<void>((resolve, reject) => {
            chrome.storage.sync.set({ BookmarkList: bookmarksObject }, () => {
                console.log("Saved bookmarks");
                resolve();
            });
        });
        return p;
    }

    public addBookmark( newBookmark: Bookmark): Promise<void> {
        return this.getBookmarks().then( bookmarks => {
            bookmarks.items.push(newBookmark);
            return this.saveBookmarks(bookmarks);
        });
    }

    public deleteBookmark( bookmarkToDelete: string): Promise<void> {
        return this.getBookmarks().then( bookmarks => {
            bookmarks.items = bookmarks.items.filter( bm => bm.name != bookmarkToDelete);
            return this.saveBookmarks(bookmarks);
        });
    }

    public addParameter( newParameter: Parameter): Promise<void> {
        return this.getParameters().then( parameters => {
            parameters.items.push(newParameter);
            return this.saveParameters(parameters);
        })

    }
}

