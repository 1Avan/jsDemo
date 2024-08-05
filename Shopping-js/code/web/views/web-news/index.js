//引入模块
import { load } from "/web/utils/LoadView.js"
load("topbar-news")//加载topbar
let newsList = []
search.oninput = async ()=>{
    // console.log(search.value)
    document.querySelector(".list-group").innerHTML = ""
    document.querySelector(".list-group").style.display = "block"
    if(search.value!=""){
        let res = await fetch("http://localhost:3000/news?title_like="+search.value).then(res=>res.json())
        // <li class="list-group-item">An item</li>
       
        let listContent = res.map(item=>{
            return ` <li class="list-group-item"><a href="/web/views/detail/index.html?id=${item.id}">${item.title}</a></li>`
         }).join("")
         document.querySelector(".list-group").innerHTML = listContent
    }
}

search.onblur = function(){
    document.querySelector(".list-group").style.display = "none"
}
search.onfocus = function(){
    document.querySelector(".list-group").style.display = "block"
}


function render(){
    renderList()
    renderTab()
}

async function renderList(){
    newsList = await fetch("http://localhost:3000/news").then(res=>res.json())
    document.querySelector(".hotList").innerHTML = newsList.slice(0,4).map(item=>{
        return `
        <div class="col">
        <a href="/web/views/detail/index.html?id=${item.id}">
          <div class="card">
            <div class="card-img-top">
                <img src="${item.photo}"  class="card-img-top">
            </div>
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.content}</p>
              <div class="author" style="color:#ccc;font-size:14px;">作者：${item.author}</div>
            </div>
          </div>
        </a>
      </div>
        `
    }).join("")
    console.log(newsList)
}

async function renderTab(){
}


render()