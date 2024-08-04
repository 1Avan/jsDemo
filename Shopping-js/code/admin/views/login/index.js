loginForm.onsubmit = async function (event) {
    
    event.preventDefault()
    // alert("登录")

    console.log(username.value, password.value)

    //用户
    let user = {};
    //json-server get请求获取
    const data = await fetch(
        `http://localhost:3000/users?username=${username.value}&password=${password.value}`,
        {
            method: 'GET'
            ,
            headers: {
                // 'Content-type': 'application/json'
                'Content-type': 'application/x-www-form-urlencoded'
            }
        }
    )
    //获取promise对象
    const result = await data.json()
    user = result
    console.log(user);
    if(user.length>0){
        localStorage.setItem('token',JSON.stringify({
            ...user[0],
            password:"****"
        }))
        window.location.href = '../home/index.html'
    }else {
        // alert('用户名或密码错误')
       let warning =  document.querySelector(".login-warning");
       warning.style.display = "block";
    }
}