//引入模块
import { load } from "/admin/utils/LoadView.js"
import  {curserverUrl} from "/admin/config/config.js"
load("sidemenu-addUser")

addUserForm.onsubmit = async function (e) {
    e.preventDefault()
    //这里onload是异步的发送请求时photoAsBase64还没被赋值
    // let photoAsBase64 = "";
    // let fr = new FileReader();
    // fr.readAsDataURL(photo.files[0]);
    // fr.onload = function () {
    //     // console.log(fr.result);
    //     photoAsBase64 = fr.result;
    // }


    let photoAsBase64 = await new Promise((resolve, reject) => {
        let fr = new FileReader();
        fr.readAsDataURL(photo.files[0]);
        fr.onload = function () {
            resolve(fr.result);
        };
        fr.onerror = function (error) {
            reject(error);
        };
    });
    //json-server post请求添加用户
    const data = await fetch(
        `${curserverUrl}/users`,
        {
            method: 'POST',
            body: JSON.stringify({
                username: username.value,
                password: password.value,
                introduction: introduction.value,
                photo:photoAsBase64,
            }),
            headers: {
                'Content-type': 'application/json'
            }
        }
    )
    console.log(data.status)
    if(data.status == 201){
        location.href = "/admin/views/user-manage/UserList/index.html"
    }
}