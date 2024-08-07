//引入模块在script标签上type=module开启了es6模块
import {curserverUrl} from "/admin/config/config.js"
import { load } from "/admin/utils/LoadView.js"
load("sidemenu-home")//加载topbar，sidemenu

let user = JSON.parse(localStorage.getItem("token"))
document.querySelector(".userinfo").innerHTML =
    `
<img src="${user.photo}" alt="" style="width: 100px;height: 100px;border-radius: 50%;" "/>
<div class="userinfo-text">
    <div class="userinfo-name">${user.username}</div>
    <div class="userinfo-introduction"><pre>${user.introduction || "这个人很懒~"}</pre></div>
</div>

`

let typeList = ["","最新动态","通知公告","沸点"]
function draw(dataList) {
    // 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
    title: {
        text: '发布新闻',
        subtext: '不同类别占比',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
            name: '类别',
            type: 'pie',
            radius: '50%',
            // data: [
            //     { value: 1048, name: '' },
            //     { value: 735, name: '' },
            //     { value: 580, name: 'Email' },
            // ],
            data: dataList,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
}


async function analysis() {
    let res = await fetch(`${curserverUrl}/news?author=${user.username}`).then(res=>res.json())
    console.log(res);
    // 根据分类搞成数组
    let map = {};
    let dataList = []
    for(let i = 0;i<res.length;i++){
        if(map[res[i].type]){
            map[res[i].type]++
        }else{
            map[res[i].type] = 1
        }
    }
    let names = Object.keys(map)
    for(let i = 0;i<names.length;i++){
        dataList.push({
            name:typeList[names[i]],
            value:map[names[i]]
        })
    }
    draw(dataList)
    console.log(dataList);
}

analysis()