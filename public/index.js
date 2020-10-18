const form  = document.querySelector('form');
const ouput = document.querySelector('.crawlCont');
const table = document.querySelector('.crawlTable');

// local crawl array
crawlDocs  = [];
crawlCount = 0;

// This function creates the different HTML elements
const createElement = (element, attributes={}) => {
    let objEntries  = Object.entries(attributes)
    let htmlElement = document.createElement(element);

    objEntries.forEach(attribute => {
        if (attribute[0] == 'textContent') htmlElement.textContent = attribute[1];
        else htmlElement.setAttribute(attribute[0], attribute[1]);
    })
    return htmlElement;
}


// Append crawl data to DOM
const appendToDom = (crawlObj) => {

    let row  = table.insertRow(1);
    let cell = row.insertCell(0);
    let cell2 = row.insertCell(1)

    cell2.innerHTML  = crawlObj["url"];
    cell.innerHTML = crawlCount;
};

// fetch crawl data
const startCrawl = async (url) => {
    const options = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body   : JSON.stringify({url})
    }
    const data = await fetch('/crawler', options);
    const res  = await data.json();
    console.log(res);

}


// listen to form submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let url = document.getElementById('url').value;
    console.log(url);

    startCrawl(url);

    url = new URL(url).host

    const timer = setInterval(async () => {
        const data = await fetch(`./crawler/${url}`);
        const res  = await data.json();
        console.log(res);
        res.forEach(crawlObj => {
            if (crawlObj['status'] == 1){
                clearInterval(timer);
                console.log('finished crawling')
            };

            if (crawlDocs.includes(crawlObj["url"])) {
                return;
            } else {
                appendToDom(crawlObj);
                crawlDocs.push(crawlObj["url"]);
                crawlCount = crawlCount + 1;
            }
        })
    }, 3000)
    
})



const download = document.getElementById('download');

download.onclick = () => {
    alert('give us your contact details');
}
