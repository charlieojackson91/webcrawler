// Required imports
const Crawler = require('./Crawler.js');
const express = require('express');
const app     = express();

// Express app set up
app.listen(3000, () => console.log('listening at port 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));


// post API
app.post('/crawler', (request, response) => {
    console.log(request.body);

    // practice URL
    const url  = request.body.url;
    
    // create instance of class
    let page = new Crawler(url);

    // crawl the page
    page.crawlPage()
        .then(res => {
            console.log(res);

            // return crawl data to frontend
            response.json(
                {
                    title        : page.title,
                    canonical    : page.canonical,
                    internalLinks: page.internalLinks,
                    externalLinks: page.externalLinks
                })
        });
})



