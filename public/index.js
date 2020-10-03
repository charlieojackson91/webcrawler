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
const getData = async (url) => {
    const options = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body   : JSON.stringify({url})
    }
    const data = await fetch('/crawler', options);
    const res  = await data.json();

    let ul            = createElement('ul')
    let title         = createElement('li', {textContent:`Title: ${res.title}`});
    let canonical     = createElement('li', {textContent:`Canonical: ${res.canonical}`});
    let internalLinks = createElement('li', {textContent:`Internal links: ${res.internalLinks.toString()}`});
    let externalLinks = createElement('li', {textContent:`External links: ${res.externalLinks.toString()}`});

    ul.append(title, canonical, internalLinks, externalLinks);
    ouput.appendChild(ul);
}


// listen to form submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const url = document.getElementById('url').value;
    console.log(url);

    getData(url);
})






