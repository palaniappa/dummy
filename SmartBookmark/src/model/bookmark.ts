interface Bookmark {
    name: string;
    url: string;
}
interface Bookmarks {
    items: Array<Bookmark>;
}

export { Bookmark, Bookmarks};
