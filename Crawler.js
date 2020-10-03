const fetch     = require('node-fetch');
const jsdom     = require('jsdom');
const { JSDOM } = jsdom;


class Crawler {
    constructor(url){
        this.url            = url;
        this.internalLinks  = [];
        this.externalLinks  = [];
        this.crawlDocuments = [];
    }

    async crawlPage(){
        const res  = await fetch(this.url);
        const data = await res.text();
        
        this.html = data;

        this.extractSEO();
        return 'page completed crawling!';
    }

    extractSEO(){
        let dom = new JSDOM(this.html);

        this.title         = dom.window.document.querySelector("title").textContent;
        this.canonical     = dom.window.document.querySelector("link[rel='canonical']").getAttribute("href");
        
        let links = dom.window.document.querySelectorAll('a')
        links     = Array.from(links);
        
        links.forEach(link => {
            if (link.href.includes(this.url) & !this.internalLinks.includes(link.href)){
                this.internalLinks.push(link.href);
            } else if (!link.href.includes(this.url) & !this.externalLinks.includes(link.href)) {
                this.externalLinks.push(link.href);
            } else {}
        });
    }
};


module.exports = Crawler;