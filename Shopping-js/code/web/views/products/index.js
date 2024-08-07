//引入模块
import { load } from "/web/utils/LoadView.js"
import  {curserverUrl} from "/admin/config/config.js"
load("products")//加载topbar


let mainBox = document.querySelector("#main-carousel")
async function getImage() {
    mainBox.innerHTML = "";
    let imgs = await fetch(curserverUrl+"/products").then(res => res.json())
    console.log(imgs);
    //动态生成底部按钮
    let indicators = document.querySelector(".carousel-indicators")
    indicators.innerHTML = imgs.map((item, index) => {
        return `
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${index}" class="active" aria-current="true" aria-label="${item.title}"></button>
        `
    }).join("")
    // <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    //动态创建slide
    let htmlContent = imgs.map((item,index) => {
        return `
        <div class="carousel-item ${index===0?"active":""}" data-bs-interval="2000">
        <div id="img-photo" style="background-image: ${`url(${item.cover})`};"></div>
        <div class="carousel-caption d-none d-md-block">
          <h5 id="img-title">${item.title}</h5>
          <p id="img-content">${item.introduction + item.detail}</p>
        </div>
      </div>
        `
    }).join("")

    console.log(htmlContent);
    mainBox.innerHTML = htmlContent

}

getImage()