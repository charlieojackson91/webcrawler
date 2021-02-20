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






const download = document.getElementById('download');

download.onclick = () => {
    alert('give us your contact details');
}
