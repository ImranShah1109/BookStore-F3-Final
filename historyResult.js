const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get('search');
console.log("search",search);


let displayDiv = document.querySelector('.display-his');

let div = document.createElement('div');
div.className = "his-item";
div.innerHTML = search;
displayDiv.appendChild(div);


let history = JSON.parse(localStorage.getItem("searchHistory"))[search];
console.log(history);

let display = document.querySelector('.display')

for (const i of history) {
    let price = i.saleInfo.listPrice?.amount;
    let div = document.createElement('div');
    div.className = "item";
    div.innerHTML = `
        <img src=${i.volumeInfo.imageLinks.smallThumbnail} alt="">
        <span><b>Title : </b>${i.volumeInfo.title}</span>
        <span><b>Authors : </b>${i.volumeInfo.authors}</span>
        <span><b>Price : </b>${price} ₹</span>
    `
    display.appendChild(div);
}

