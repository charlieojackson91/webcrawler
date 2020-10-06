// Required imports
const Crawler = require('./Crawler.js');
const express = require('express');
const app     = express();

// global crawl data
const documents  = {};
const crawlObj = {}; 

// Express app set up
app.listen(3000, () => console.log('listening at port 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));


const startCrawler = async (url) => {
    let crawlArray = crawlObj[url];

    // loop through crawl list and crawl the pages
    for (let i = 0; i < crawlArray.length; i++) {
        const element = crawlArray[i];
        console.log(`crawling page: ${i}` , element);
        

        let page = new Crawler(element);
        let test = await page.crawlPage()
            .then(res => {
                page.internalLinks.forEach(link => {
                    if (crawlArray.includes(link)){
                        // console.log('already in array', link)
                    } else {
                        console.log('found new URL', link)
                        crawlArray.push(link)  
                    }
                })
                documents[url].push(page.document);
            });
    }

    console.log('completed crawling')
}


// post API
app.post('/crawler', (request, response) => {
    console.log(request.body);

    // practice URL
    const url  = request.body.url;
    
    // create instance of class
    let page = new Crawler(url);
    documents[page.tld] = {}

    page.crawlPage()
        .then(res => {
            documents[page.tld] = [];
            documents[page.tld].push(page.document);
            response.json(documents);

            // append first documents to crawl list
            crawlObj[page.tld] = [...page.internalLinks];
            startCrawler(page.tld);
        });
})


// get API
app.get('/crawler/:url', (req, res) => {
    let url = req.params.url;
    res.json(documents[`${url+'/'}`]);
})

