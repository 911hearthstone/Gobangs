var str;
var websocket = null;
var istrigger=0;//没有跳转到下一个界面
//判断当前浏览器是否支持WebSocket
if ('WebSocket' in window) {
    //建立连接，这里的/websocket ，是Servlet中注解中的那个值
    websocket = new WebSocket("ws://localhost:9090/websocket");
}
else {
    alert('当前浏览器 Not support websocket');
}

//连接发生错误的回调方法
websocket.onerror = function () {
    console.log("WebSocket连接发生错误");
};

//连接成功建立的回调方法
websocket.onopen = function () {
    console.log("WebSocket连接成功");
};

//接收到消息的回调方法
websocket.onmessage = function (event) {
    str=event.data;
    console.log(event.data);
    judge=StringToInt(str);
    MoveTo(judge);
};

//连接关闭的回调方法
websocket.onclose = function () {
    console.log("WebSocket连接关闭");
};

//监听窗口关闭事件，当窗口关闭时，主动去关闭WebSocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
    closeWebSocket();
};

//关闭WebSocket连接
function closeWebSocket() {
    websocket.close();
}

//提取接收字符串，转化为Int数组作为判断数据
function StringToInt(str) {
    var m = str.length/ 2;
    if (m * 2 < str.length) {
        m++;
    }
    var cache=new Array(m);
    var j = 0;
    //字符串切割存入int类型数组
    for (var  i = 0; i < str.length; i++) {
        if (i % 2 == 0) {
            cache[j] = parseInt(str.substring(i, i + 2));
            j++;
        }
    }
    return cache;
}

//进入游戏界面
var MoveTo=function (judge) {
    if (judge[0]==10){//开始游戏
        sendflag=1;//数据来源下位机不可以返回
        start();//进入游戏界面并触发ajax
    }
    else if(judge[0]==1){
        if (judge[1]==2){//人机对战白子先行
            if (istrigger==0) {//第一次发送01010000$
                $("#btnext").trigger("click");//trigger模拟鼠标点击事件

                colour = 0;//黑白子标记位用于发送不同的数据到下位机
                sendflag = 1;//数据来源标记位
                istrigger=1;//禁止再次发送
            }
            initialLi();//默认白子高亮恢复
          console.log(count);
        } else if (judge[1]==1){
            $('.gamer').children("ul:first").children("li:last").removeClass('active');//白色方去掉高亮
            $('.gamer').children("ul:first").children("li:first").addClass('active');//黑色方得到高亮
            sendflag=1;
            //改变棋子颜色
            console.log(count);

        }
    }else if (judge[0]==4){
        istrigger=0;
        $("#btnext").trigger("click");
           sendflag=1;
          //向右翻页
           console.log(count);

    }else if (judge[0]==5){
        $("#btnext").trigger("click");
            sendflag=1;
            console.log(count);

    }
};

