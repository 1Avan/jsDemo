//引入模块
import { load } from "/web/utils/LoadView.js"
import { curserverUrl } from "/admin/config/config.js"
load("")//加载topbar
let url = new URL(document.location.href)
let id = url.searchParams.get("id")

async function renderDatail(){

    let detailContent = await fetch(curserverUrl+"/news/"+id).then(res=>res.json())
    document.querySelector(".title").textContent = detailContent.title
    document.querySelector("#author").innerHTML += detailContent.author
    document.querySelector("#main-content").innerHTML = detailContent.content
    console.log(detailContent);
}

renderDatail()