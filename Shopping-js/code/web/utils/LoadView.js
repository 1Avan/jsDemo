async function load(id) {
    let header = document.querySelector('.header')
    let resData = await fetch("/web/components/topbar/index.html").then(res => res.text())
    header.innerHTML = resData;
    //给当前id的菜单添加active样式
    document.querySelector("#"+id).style.color = "#085aca"
    document.querySelector("#"+id).classList.add("active")
}

export { load }