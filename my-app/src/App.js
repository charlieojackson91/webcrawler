import React, { useState } from 'react';
import './style.css';

function App() {
  const [url, setUrl] = useState('');
  const [crawlArray, setCrawlArray] = useState([]);

  // fetch crawl data
  const startCrawl = async (url) => {
    const options = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body   : JSON.stringify({url})
    }
    const data = await fetch('http://localhost:4000/crawler', options);
    const res  = await data.json();
    console.log(res);
  }

  // listen to form submit
  const formListener = (e) => {

    e.preventDefault();
    
    
    startCrawl(url);

    const hostURL = new URL(url).host
    console.log('host url', hostURL)

    const timer = setInterval(async () => {
        const data = await fetch(`http://localhost:4000/crawler/${hostURL}`);
        const res  = await data.json();
        console.log(res);
        res.forEach(crawlObject => {
            if (crawlObject['status'] === 1){
                clearInterval(timer);
                console.log('finished crawling')
            };

            setCrawlArray([...crawlArray, crawlObject]);
            console.log('existing crawl data: ',crawlArray, 'new crawl data',crawlObject);
            // if (crawlDocs.includes(crawlObject["url"])) {
            //     return;
            // } else {
            //     setCrawlArray([...crawlArray, crawlObject]);
            // }
        })
    }, 3000)
    
  }

  const rows = crawlArray.map((item,count) => 
                  <tr key={count + 1}>
                    <td>{count + 1}</td>
                    <td>{item.url}</td>
                  </tr>
                );

  // console.log(rows);
  return (

        <>
        <div className="docCont">
        <div className="headCont">
            <h1>Crawl your website</h1>
            <p id='tagline'>Crawl your site*, download a free report and find out how you can improve your SEO.</p>
            <form onSubmit={formListener}>
                <input type='text' placeholder='Enter URL to crawl' value={url} onChange={(e) => setUrl(e.target.value)}/>
                <input type='submit'/>
            </form>
        </div>

        <div className='visual'>
            <div className='btnCont'>
                <button className='btn' id='selected'>Table</button>
            </div>
            <div className='btnCont'>
                <button className='btn'>Internal links</button>
            </div>
            <div className='btnCont'>
                <button className='btn'>External links</button>
            </div>
            <div className='btnCont'>
                <button className='btn'>Non indexed pages</button>
            </div>
            <div className='btnCont'>
                <button className='btn'>Canonicalised</button>
            </div>
            <div className='btnCont'>
                <button className='btn'>Href lang</button>
            </div>
        </div>
        
        <div className='crawlCont'>
            <table className='crawlTable'>
              <thead>
                <tr>
                  <th>Count</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
        </div>
        <div>
            <p id='download'>Download crawl report</p>
            <p>* - free report crawls upto 100 pages. For in depth crawls view our <a href='./custom-crawling'>custom crawling prices.</a></p>
        </div>
    </div>

    <div id= 'footerCont'>
        <footer>
            <ul>
                <li><a href='./about'>About this tool</a></li>
                <li><a href='./how-it-works'>How does this tool work?</a></li>
                <li><a href='./custom-crawling'>Custom crawling prices</a></li>
            </ul>
        </footer>
    </div>
    </>
  );
}

export default App;
