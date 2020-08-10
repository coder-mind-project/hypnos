import Article from "../entities/Article"

class FoundArticles {
    public articles: typeof Article[]
    public count: number

    constructor(articles: typeof Article[], count: number) {
        this.articles = articles
        this.count = count
    }
}

export default FoundArticles