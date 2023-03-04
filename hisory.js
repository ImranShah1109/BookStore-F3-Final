let displayDiv = document.querySelector('.display-his');

let searchHistory = JSON.parse(localStorage.getItem("searchHistory"));

let search = Object.keys(searchHistory);

for (const i of search) {
    let div = document.createElement('div');
    div.className = "his-item";
    div.dataset.search = i;
    div.innerHTML = i;
    displayDiv.appendChild(div);

    div.addEventListener('click',()=>{
        window.location.href = `./historyResult.html?search=${i}`;
    })
}

let clearHisBtn = document.getElementById('clear');
clearHisBtn.addEventListener('click',()=>{
    localStorage.removeItem('searchHistory');
    let his = document.querySelectorAll('.his-item');
    his.forEach((i)=>{
        i.remove();
    })
})