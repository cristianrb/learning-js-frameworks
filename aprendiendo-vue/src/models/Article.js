class Article {
    constructor(title, content, date, image) {
        this.title = title;
        this.content = content;
        this.date = null;
        this.image = image;
    }
}


/*
title: String,
    content: String,
    date: { type: Date, default: Date.now },
    image: String
*/
export default Article;