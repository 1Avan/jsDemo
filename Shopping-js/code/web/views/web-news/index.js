//引入模块
import { load } from "/web/utils/LoadView.js"
import { curserverUrl } from "/admin/config/config.js"
load("topbar-news")//加载topbar
let newsList = []
search.oninput = async ()=>{
    // console.log(search.value)
    document.querySelector(".list-group").innerHTML = ""
    document.querySelector(".list-group").style.display = "block"
    if(search.value!=""){
        let res = await fetch(curserverUrl+"/news?title_like="+search.value).then(res=>res.json())
        // <li class="list-group-item">An item</li>
       
        let listContent = res.map(item=>{
            return ` <li class="list-group-item"><a href="/web/views/detail/index.html?id=${item.id}">${item.title}</a></li>`
         }).join("")
         document.querySelector(".list-group").innerHTML = listContent
    }
}

search.onfocus = function(){
    document.querySelector(".list-group").style.display = "block"
}


async function render(){
    await renderList()
    renderTab()
}

async function renderList(){
    newsList = await fetch(curserverUrl+"/news").then(res=>res.json())
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
  let category = _.groupBy(newsList,item=>item.type)
  for(let item in category){
    let curTab = document.querySelector("#tab"+item)
    curTab.innerHTML = `<ul class="list-group" id="list-news-ul">`
    let htmlText = category[item].map(item=>{
      return `
      <a href="/web/views/detail/index.html?id=${item.id}">
      <li class="list-group-item" style="height: 100px; padding: 2px;display: flex;">
      <img src="${item.photo}" class="img-thumbnail" style="height: 100px;width: 200px; margin-right: 20px;" >
      <div class="text-content" style="width: 400px;overflow: hidden;text-overflow:ellipsis;">
        <p class="fw-bold">${item.title}</p>
        <p class="fw-lighter">${item.content}</p>
      </div>
      <div style="display: flex; align-items: end;margin-left: 10px;"><p class="fst-italic" style="margin-bottom:0px">作者：${item.author}</p></div>
    </li>
    </a>
      `
    }).join("")
    curTab.innerHTML += htmlText
    curTab.innerHTML += `</ul>`
  }
}


render()