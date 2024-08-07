//引入模块
import {load} from "/admin/utils/LoadView.js"
import {curserverUrl} from "/admin/config/config.js"
load("sidemenu-newsList")


let newsList = document.querySelector("#newsList")
let typeList = ["","最新动态","通知公告","沸点"]
let list = []

//展示modal
const myPreviewModal = new bootstrap.Modal(document.getElementById('previewModalLabel'))
async function ListItemRender() {
    newsList.innerHTML = ""//移除所有子元素
    let url = new URL(curserverUrl+"/news");
    url.searchParams.append("author",JSON.parse(localStorage.getItem("token")).username);

    const news = await fetch(url.toString()).then(res => res.json())
    list = news;
    // console.log(news);
    // news.map(item=>{
    //     if(item.type == 1){
    //         item.type = "最新动态"
    //     }
    //     if(item.type == 2){
    //         item.type = "通知公告"
    //     }
    //     if(item.type == 3){
    //         item.type = "沸点"
    //     }
    // })
    news.forEach((item, index) => {
        let tr = document.createElement("tr")
        tr.style.height = "50px"
        tr.innerHTML = `
        <th scope="row">${index + 1}</th>
        <th >${item.title}</th>
        <td>${typeList[item.type]}</td>
        <td>
        <button class="btn btn-primary btn-edit"  data-myid="${item.id}" >编辑</button>
        <button class="btn btn-danger btn-del"  data-myid="${item.id}"" >删除</button>
        <button class="btn btn-success btn-preview"  data-myid="${item.id}"" >预览</button>
    </td>
        
        `
        newsList.append(tr)
    })
}

document.querySelector(".table").onclick = async (e)=>{
    let id = e.target.dataset.myid;
    if(e.target.className.includes("btn-preview")){
        // console.log("预览");
        myPreviewModal.toggle()
        let prenews = list.filter(item=>item.id == id)[0]
        document.querySelector("#contentTitle").textContent = prenews.title
        document.querySelector(".mainContent").innerHTML = prenews.content
    }
    if(e.target.className.includes("btn-del")){
        await deleteNews(id);
    }
    if(e.target.className.includes("btn-edit")){
        location.href = `/admin/views/news-manage/EditNews//index.html?id=${id}`
    }
}
const deleteNews = async (id) => {
    const res = await fetch(`${curserverUrl}/news/${id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        ListItemRender()
    }
}


ListItemRender()