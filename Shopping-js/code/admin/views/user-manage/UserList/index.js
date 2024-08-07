//引入模块
import { load } from "/admin/utils/LoadView.js"
import  {curserverUrl} from "/admin/config/config.js"
load("sidemenu-userList")
//将列表渲染出来

async function ListItemRender() {
    let userList = document.querySelector("#userList")
    userList.innerHTML = ""//移除所有子元素
    const users = await fetch(curserverUrl+"/users").then(res => res.json())
    console.log(users);
    users.forEach((item, index) => {
        let tr = document.createElement("tr")
        tr.style.height = "50px"
        tr.style.lineHeight = "50px"
        tr.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td colspan="">${item.username}</td>
        <td>${item.introduction}</td>
        <td>
            <img src="${item.photo}" style="width: 20px;border-radius:50%;">
        </td>
        <td>
            <button class="btn btn-primary btn-edit"  ${item.default ? "disabled" : ""} data-myid="${item.id}" >编辑</button>
            <button class="btn btn-danger btn-del" ${item.default ? "disabled" : ""} data-myid="${item.id}"" >删除</button>
        </td>
        `
        userList.append(tr)
    });
}


userList.onclick = async (event) => {
    //获取标签中data-开头的自定义属性
    // console.log(event.target.dataset.myid);
    let currentId = event.target.dataset.myid;
    if (event.target.className.includes("btn-edit")) {
        //头像
        // 处理文件选择
        photo.onchange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                avatarPto.src = e.target.result;
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        };

        //展示modal
        const myModal = new bootstrap.Modal(document.getElementById('editForm'))
        myModal.toggle()//改变modal的显示状态，相当于开关可以开可以关
        //将当前点击用户的用户信息回显
        const res = await fetch(`${curserverUrl}/users/${currentId}`).then(
            res => res.json()
        )
        username.value = res.username;
        password.value = res.password;
        introduction.value = res.introduction;
        avatarPto.src = res.photo
        avatarPto.onclick = () => {
            photo.click();
        }
        savabtn.onclick = async () => {
            let params = {
                username: username.value,
                password: password.value,
                introduction: introduction.value,
                photo: avatarPto.src,
                id: currentId
            };
            console.log(params)
            const res = await fetch(
                `${curserverUrl}/users/${currentId}`, {
                method: "PUT",
                body: JSON.stringify(params),
                headers: {
                    'Content-type': 'application/json'
                }
            }
            )
            // console.log(res);
            if (res.ok) {
                ListItemRender()
            }
            myModal.toggle()//改变modal的显示状态，相当于开关可以开可以关
        }

    } else if (event.target.className.includes("btn-del")) {
        // console.log("del");
        //删除用户
        const res = await fetch(`${curserverUrl}/users/${currentId}`, {
            method: "DELETE"
        })
        if (res.ok) {
            ListItemRender()
        }
    }
}



ListItemRender()