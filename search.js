let form = document.querySelector('form');
let searchText = document.getElementById('search');

let showDiv = document.querySelector('.show');
// console.log(showDiv);


form.addEventListener('submit',searchBook);
let storeBooks;
async function searchBook(e){
    e.preventDefault();
    // console.log(searchText.value);
    let itemsDiv = document.querySelectorAll('.item');
    itemsDiv.forEach((i)=>{
        i.remove();
    })
    let res = await fetch("https://www.googleapis.com/books/v1/volumes?q=percy+jackson");
    let data = await res.json();
    storeBooks = data.items;
    console.log("storeBooks >>>",storeBooks);
    let result = storeBooks.filter((item)=>{
        return item.volumeInfo.title.includes(searchText.value) || item.volumeInfo.authors.includes(searchText.value);
    })
    if(result.length != 0){
        console.log("result",result);
        let d = JSON.parse(localStorage.getItem("searchHistory"))
        if(d != null){
            d[searchText.value] = result;
            localStorage.setItem("searchHistory",JSON.stringify(d));
        }else{
            let searchHistory = {};
            searchHistory[searchText.value] = result;
            localStorage.setItem("searchHistory",JSON.stringify(searchHistory));
        }

        for (const i of result) {
            let price = i.saleInfo.listPrice?.amount;
            let div = document.createElement('div');
            div.className = "item";
            div.innerHTML = `
                <img src=${i.volumeInfo.imageLinks.smallThumbnail} alt="">
                <span><b>Title : </b>${i.volumeInfo.title}</span>
                <span><b>Authors : </b>${i.volumeInfo.authors}</span>
                <span><b>Price : </b>${price} ₹</span>
            `
            showDiv.appendChild(div);
        }
    }
    else{
        let msgDiv = document.querySelector('.msg');
        msgDiv.innerHTML = '<h1>Oops Result not Found</h1>';
    }
}