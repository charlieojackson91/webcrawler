const form  = document.querySelector('form');
const ouput = document.querySelector('.crawlCont');


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

    const timer = setInterval(async () => {
        url = url.replace('http://', '')
        const data = await fetch(`./crawler/${url}`);
        const res  = await data.json();
        console.log(res);
    }, 3000)
    
})



const download = document.getElementById('download');

download.onclick = () => {
    alert('give us your contact details');
}
