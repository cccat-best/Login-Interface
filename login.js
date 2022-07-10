//实现翻转
let Change = document.querySelector("#change");
let over = document.querySelector(".over");
let Switch = document.querySelector(".switch");
let H2 = Switch.querySelector("h2");
Change.addEventListener("click", () => {
    if (over.style.transform === "") {
        over.style.transform = 'rotateY(180deg)';
        H2.innerText = "登 录";
    }
    else {
        over.style.transform = '';
        H2.innerText = "注 册";
    }
})


//获取input内容
let Username = document.querySelector("#User1");
let Password = document.querySelector("#Pas1");
let Username2 = document.querySelector("#User2");
let Password2 = document.querySelector("#Pas2");

// 正则检测input框
let first = /^\w{3,8}$/;
let second = /^\d+$/;
let third = /^([a-zA-Z]|\d){6,10}$/;

Username.addEventListener("blur", () => {
    if (second.test(Username.value) || (Username.value != "" && !first.test(Username.value))) {
        alert("请输入正确的用户名格式:3~8位字母或数字或下划线,但不能为纯数字");
    }
})

Password.addEventListener("blur", () => {
    if (Password.value != "" && !third.test(Password.value)) {
        alert("请输入正确的密码格式:6~10位字母或数字");
    }
})


// // 注册界面原生的ajax发送post请求
// window.onload = () => {
//     let join = document.querySelector("#join")
//     join.addEventListener('click', () => {
//         let sentDate = JSON.stringify({
//             username: Username.value,
//             password: Password.value,
//         });
//         if (Username.value != "" && Password.value != "") {
//             if (!first.test(Username.value) || second.test(Username.value) || !third.test(Password.value)) {
//                 alert("用户名或密码格式错误!");
//             }
//             else {
//                 const xhr = new XMLHttpRequest();
//                 xhr.open("POST", "http://47.94.90.140:8888/api/register", true);
//                 xhr.setRequestHeader("Content-type", "application/json");
//                 xhr.send(sentDate);
//                 xhr.onreadystatechange = () => {
//                     if (xhr.readyState === 4 && xhr.status === 200) {
//                         alert(JSON.parse(xhr.response).msg);
//                     }
//                 }
//             }
//         }
//     })
// }


// 使用axios发送post请求
//    注册
let join = document.querySelector("#join")
join.addEventListener('click', () => {
    let sentDate = JSON.stringify({
        username: Username.value,
        password: Password.value,
    });
    if (Username.value != "" && Password.value != "") {
        if (!first.test(Username.value) || second.test(Username.value) || !third.test(Password.value)) {
            alert("用户名或密码格式错误!");
        }
        else {
            axios({
                method: "post",
                baseURL: "http://47.94.90.140:8888/api",
                url: "/register",
                data: sentDate,
                headers: {
                    "content-type": "application/json"
                },
            })
                .then((val) => {
                    alert(val.data.msg);
                })
        }
    }
})


//    登录
let enter = document.querySelector("#enter")
enter.addEventListener('click', () => {
    let sentDate2 = JSON.stringify({
        username: Username2.value,
        password: Password2.value,
    });
    if (Username2.value != "" && Password2.value != "") {
        axios({
            method: "post",
            baseURL: "http://47.94.90.140:8888/api",
            url: "/login",
            data: sentDate2,
            headers: {
                "content-type": "application/json"
            },
        })
            .then((val) => {
                let {
                    data: {
                        data: { token },
                    },
                } = val;
                sessionStorage.setItem("token", token);
                console.log(val);

                location.href = "./updateId.html";

            })
            .catch((err) => {
                console.log(err);
                alert("用户名或密码错误");
            });
    }
})