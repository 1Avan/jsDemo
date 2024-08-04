function renderTapbar(user) {
    console.log(userName);
    userName.textContent = user.username
    avatar.src = user.photo
    let exit = document.querySelector('#exit')
    exit.addEventListener('click', () => {
        localStorage.removeItem("token")
        window.location.href = "/admin/views/login/index.html"
    })
}

function renderSidemenu(id,user) {
    //在那个页面对应的导航就显示高亮
    document.querySelector(`#${id}`).style.color = "#0A58CA"
    //渲染成功后判断用户是不是管理员不是管理员就移除用户管理模块
    if (user.role !== "admin") {
        document.querySelector("#sidemenu-user-manage").remove()
    }
}
async function load(id) {
    let user = JSON.parse(localStorage.getItem("token"))
    if (user?.username) {
        let header = document.querySelector('.header')
        let resData = await fetch("/admin/components/topbar/index.html").then(res => res.text())
        header.innerHTML = resData;
        //获取到topbar组件后开始动态渲染topbar
        renderTapbar(user)

        let sidemenu = document.querySelector('.sidemenu')
        let sidemenuHtml = await fetch("/admin/components/sidemenu/index.html").then(res => res.text())
        sidemenu.innerHTML = sidemenuHtml;
        //获取到topbar组件后开始动态渲染topbar

        renderSidemenu(id,user)
        

    } else {
        window.location.href = '/admin/views/login/index.html'
    }
}

export { load }