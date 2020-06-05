var restart=document.getElementById("restart");
var sendflag=0;//防止重复发送数据
var ajaxflag=0;
restart.onclick=function(){
    restartfunc();
};

$("#previous").unbind("click").click(function () {
   repentfunc();
});

$("#mention").click(function () {
   mention();
});

//重新开始封装方法
function restartfunc() {
    $.ajax({
        type:"POST",
        url:"/restart?sendflag="+sendflag,
        data:{},
        cache:"false",
        timeout:600000,
        success: function (result) {
            resetPlayer();
            window.location.href="/guide";
            flag=result;
            console.log("flag为"+sendflag);
        }
    });
}
function repentfunc() {
    $.ajax({
        type: "POST",
        contentType: "text",
        url: "/previous?sendflag="+sendflag,
        data: {},
        cache:"false",
        timeout: 600000,
        success: function (result) {
           sendflag=result;
        }
    });
    //清空画布
    context.clearRect(0,0,chess.width,chess.height);
    //棋盘初始化
    ChessBoardInitilize();
    //画布初始化
    CanvasInitialize();
    //flag初始化
    flag=true;
}


function mention() {
    $.ajax({
        type: "POST",
        url: "/mention?sendflag="+sendflag,
        data: {},
        cache:"false",
        timeout: 600000,
        success:function (result) {
            sendflag=result;
            console.log(sendflag);
        }
    });
    alert("提示完毕！","您得到了开发者的指引，请继续战斗吧！",function () {

    },{type:'success',confimButtonText:'OK'});
}

//光标显示后
function aftermention() {
    //mentionflag置零
    mentionflag=0;
    //flag初始化
    flag=true;
    //清空画布
    context.clearRect(0,0,chess.width,chess.height);
    //棋盘初始化
    ChessBoardInitilize();
    //画布初始化
    CanvasInitialize();

        if (ajaxflag==1) {
            $.ajax({
                type: "POST",
                url: "/cursor",
                data: {},
                cache: "false",
                timeout: 600000
            });
        }


}
//测试用
var test=document.getElementById("test");
test.onclick=function (ev) {
    i=1;
    j=1;
    context.beginPath();
    context.strokeStyle="red";
    context.strokeRect(15+30*i-12,15+30*j-12,25,25);
    context.closePath();
};