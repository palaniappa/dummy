import { Parameter, Parameters } from "../model/parameter";
import { Bookmark, Bookmarks } from "../model/bookmark";

export class Store {

    public static instance: Store = new Store();

    parameters: Parameters = { items: [] };
    bookmarks: Bookmarks = { items: [] };


    private initializeDefaults(): void {
        this.parameters.items.push({ key: "CurrentTabOrigin", value: "$ActiveTab:origin" });
        this.parameters.items.push({ key: "CurrentTabHost", value: "$ActiveTab:host" });
        this.parameters.items.push({ key: "issuerId", value: "12334534AAFGDFG234" });
        this.parameters.items.push({ key: "audienceId", value: "AUD12334534AAFGDFG234" });
        this.parameters.items.push({ key: "SearchText", value: "$Js:'news on ' + new Date().toString()" });
        this.parameters.items.push({ key: "DayOfWeek", value: "$Js:new Date().toString().split(' ')[0] + 'day'" });

        this.bookmarks.items.push({ name: "TenantInfo", url: "{{CurrentTabOrigin}}/qa/cdp/cdp.jsp" });
        this.bookmarks.items.push({ name: "Generate JWT", url: "{{CurrentTabOrigin}}/qa/cdp/generatejwt.jsp" });
        this.bookmarks.items.push({ name: "Mint JWT", url: "{{CurrentTabOrigin}}/qa/cdp/mintedjwt.jsp?issuerId={{issuerId}}&audienceId={{audienceId}}&type=JWT" });
        this.bookmarks.items.push({ name: "News Today", url: "https://www.google.com/search?q={{SearchText}}" });
        this.bookmarks.items.push({ name: "Google Current Host", url: "https://www.google.com/search?q={{CurrentTabHost}}" });
        this.bookmarks.items.push({ name: "Joke on Day", url: "https://www.google.com/search?q=Tell me a joke about {{DayOfWeek}}" });

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

    public addParameter( newParameter: Parameter): Promise<void> {
        return this.getParameters().then( parameters => {
            parameters.items.push(newParameter);
            return this.saveParameters(parameters);
        })

    }
}

