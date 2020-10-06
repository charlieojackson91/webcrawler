const fetch     = require('node-fetch');
const jsdom     = require('jsdom');
const { JSDOM } = jsdom;
const urldecode = require('url');


class Crawler {
    constructor(url){
        this.url            = url;
        this.tld            = url.replace('http://', '');
        this.host           = urldecode.parse(this.url).host;
        this.internalLinks  = [];
        this.externalLinks  = [];
        this.document       = {};
    }

    async crawlPage(){
        const res  = await fetch(this.url);
        const data = await res.text();
        
        this.html = data;

        this.extractSEO();
    }

    extractSEO(){
        let dom = new JSDOM(this.html);

        try {
            this.title         = dom.window.document.querySelector("title").textContent;
            this.canonical     = dom.window.document.querySelector("link[rel='canonical']").getAttribute("href");
            
            let links = dom.window.document.querySelectorAll('a')
            links     = Array.from(links);
            
            links.forEach(link => {
                if (link.href.includes(this.host)){
                    this.internalLinks.push(link.href);
                } else if (!link.href.includes(this.url) & !this.externalLinks.includes(link.href)) {
                    this.externalLinks.push(link.href);
                } else {}
            });

            this.document = {
                url           : this.url,
                title         : this.title,
                tld           : this.tld,
                internalLinks : this.internalLinks,
                externalLinks : this.externalLinks,
                canonical     : this.canonical
            }

        } catch {
            console.log('crawl failed', this.url)
            return
        }
    }
};


module.exports = Crawler;