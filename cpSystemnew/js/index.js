$(function () {
    var myChart1 = echarts.init(document.getElementById('myChart1'));
    option = {
        title: {
            text: '风险等级通统计',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['严重风险', '普通风险', '一般风险']
        },
        normal: {
            label: {
                position: 'inner',
                formatter: '{d}%'
            },
            labelLine: { show: false }
        },
        series: [
            {
                name: '风险统计',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 235, name: '严重风险' },
                    { value: 510, name: '普通风险' },
                    { value: 1448, name: '一般风险' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    normal: {
                        label: {
                            show: true,
                            formatter: '{b} : {c} ({d}%)'
                        },
                        labelLine: { show: true }
                    },
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。 
    myChart1.setOption(option);

    var myChart2 = echarts.init(document.getElementById('myChart2'));
    option = {
        title: {
            text: '整改情况统计',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            left: 'center',
            bottom: 0,
            data: ['未整改', '已整改']
        },
        series: [
            {
                name: '整改统计',
                type: 'pie',
                radius: ['40%', '55%'],

                data: [
                    { value: 635, name: '未整改' },
                    { value: 1248, name: '已整改' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    normal: {
                        label: {
                            show: true,
                            formatter: '{b} : {c} ({d}%)'
                        },
                        labelLine: { show: true }
                    },
                }
            }
        ]
    }; 
    // 使用刚指定的配置项和数据显示图表。 
    myChart2.setOption(option);

    var myChart3 = echarts.init(document.getElementById('myChart3'));
    var options = {
        title: {
            text: '安全风险统计',
            left: 'center'
        },
        tooltip: {
            trigger: "axis",
            show: true,
        },
        legend:{
            formatter: function (data) {
                return (data.length > 4 ? (data.slice(0,4)+"...") : data )
            }
        },
        grid: {
            y2: 140
        },
        xAxis: {
            data: ["施工安全资料/总包管理", "现场安全/临时用电", "现场安全/消防管理", "现场安全/安全防护", "现场安全/模型", "施工安全资料/总包管理", "现场安全/临时用电", "现场安全/消防管理", "现场安全/安全防护", "现场安全/模型"],
            axisLabel: {
                interval: 0,
                rotate: -30,
                textStyle: {
                    fontSize: 12//刻度大小
                }
            },
            boundaryGap: true
        },
        yAxis: {},
        series: [{
            name: '不合格数量',
            type: 'bar',
            data: [11,10,8,8,7,6,4,3,2,2,]
        }],
        itemStyle: {
            normal: {
                color: '#63B8FF'
            }
        }        
    }
    myChart3.setOption(formatAxisData(options));

    var prevs = $('.prevs'),
        nexts = $('.nexts');
    var i = 0;
    var j;
    $(".prevs").hide()
    //datass.setAttribute("class", "style2");
    
    prevs.on('click', function (argument) {
        $.ajax({
            url:'../data/echartsData2.json',
            type:'post',
            dataType:'JSON',
            success:function(data){
                options.xAxis.data = data[i].xAxis.data;
                myChart3.setOption(formatAxisData(options));
                j = data.length;
            }
        });
        i--;
        if (i <= 0) {
            $(".prevs").hide()
            return;
        }
        if (j >= i+1) {
            $(".nexts").show()
        }
    })

    nexts.on('click', function (argument) {
        $.ajax({
            url:'../data/echartsData2.json',
            type:'post',
            dataType:'JSON',
            success:function(data){
                //console.log(data)
                options.xAxis.data = data[i].xAxis.data;
                myChart3.setOption(formatAxisData(options));
                j = data.length;
            }
        });
        i++
        if (i > 0) {
            $(".prevs").show()
        }
        if (i >= j-1) {
            $(".nexts").hide()
        }
    })
    //字体出现省略号
    function formatAxisData(target,num) {
        if(!target.xAxis||!target.xAxis.data || target.xAxis.data.length==0) return target;
        num = num || 4;
        target.xAxis.data = target.xAxis.data.map(function (data,index) {
            return data.length > num ? (data.slice(0,num)+"...") : data
        })
        return target;
    }
    
    /* END AREA CHART */


    //字体出现省略号
    function formatAxisData(target,num) {
        if(!target.xAxis||!target.xAxis.data || target.xAxis.data.length==0) return target;
        num = num || 4;
        target.xAxis.data = target.xAxis.data.map(function (data,index) {
            return data.length > num ? (data.slice(0,num)+"...") : data
        })
        return target;
    }
    
    /* END AREA CHART */


    var myChart4 = echarts.init(document.getElementById('myChart4'));
    var option = {
        title: {
            text: '工程安全风险统计',
            left: 'center'
        },
        tooltip: {
            trigger: "axis",
            show: true
        },
        legend:{
            formatter: function (data) {
                return (data.length > 2 ? (data.splice(0,4)+"...") : data )
            }
        },
        grid: {
            y2: 140
        },
        xAxis: {
            data: ["西城区德胜门对景仿古建筑设计项目", "永丰道路市政工程项目", "长白山度假酒店", "太远迎泽桥西", "滕州凤凰湖隧道", "永丰道路市政工程项目", "长白山度假酒店", "太远迎泽桥西", "滕州凤凰湖隧道", "永丰道路市政工程项目", "长白山度假酒店", "太远迎泽桥西", "滕州凤凰湖隧道"],
            axisLabel: {
                interval: 0,
                rotate: -30,
                textStyle: {
                    fontSize: 12//刻度大小
                }
            }
        },
        yAxis: {},
        series: [{
            name: '风险统计',
            type: 'bar',
            data: [28, 27, 25, 20, 18, 18, 14, 13, 11, 10, 9, 6, 3]
        }],
        itemStyle: {
            normal: {
                color: '#63B8FF'
            }
        }
    };
    myChart4.setOption(formatAxisData(option));
     var prev = $('.prev'),
         next = $('.next');
    var i = 0;
    var j;
    $(".prev").hide()
    prev.on('click', function (argument) {
        $.ajax({
            url:'../data/echartsData.json',
            type:'post',
            dataType:'JSON',
            success:function(data){
                option.xAxis.data = data[i].xAxis.data;
                myChart4.setOption(formatAxisData(option));
                j = data.length;
            }
        });
        i--;
        if (i <= 0) {
            $(".prev").hide()
            return;
        }
        if (j >= i + 1) {
            $(".next").show()
        }
    })

    next.on('click', function (argument) {
        $.ajax({
            url:'../data/echartsData.json',
            type:'post',
            dataType:'JSON',
            success:function(data){
                option.xAxis.data = data[i].xAxis.data;
                myChart4.setOption(formatAxisData(option));
                j = data.length;
            }
        });
        i++
        if (i > 0) {
            $(".prev").show()
        }
        if (i >= j - 1) {
            $(".next").hide()
        }
    })
});


//头部导航的tab切换
$(".nav-pills li").on("click", function () {
    var index = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    if (index == 0) {
        $(".first").removeClass("hide").addClass("show").siblings().addClass("hide")
    } else if (index == 1) {
        $(".second").removeClass("hide").addClass("show").siblings().addClass("hide")
    } else if (index == 2) {
        $(".third").removeClass("hide").addClass("show").siblings().addClass("hide")
    } else if (index == 3) {
        $(".forth").removeClass("hide").addClass("show").siblings().addClass("hide")
    }
})

//渲染主页的table表单,和点击分页
var app = new Vue({
    el: "#app",
    data: {
        tabData: [],
        arr: [],
        index: 1,
        num: 5,
        len: "",
        end: "",
        pageSize: null,
        tabList: "",
        name: "",
        branch: "",
        project: "",
        content: "",
        start: ""
    },
    created() {
        this.$http.get("../data/indexdata.json")
            .then(function (data) {
                //console.log(data)
                //console.log(JSON.parse(data))
                this.tabData =data.body.tabData;
                //console.log(this.tabData)
                let len = this.tabData.length;
                this.len = len;
                this.pageSize = Math.ceil(len / this.num);
                for (var i = 0; i < this.pageSize; i++) {
                    this.arr.push(i + 1);
                }
                //init pagination
                this.go(1);
                this.pages();
            });
    },
    updated() {
        //this.tabList.updated();
    },
    methods: {
        pages() {
            this.end = this.index * this.num;
            this.start = (this.index - 1) * this.num + 1;
        },
        prev() {
            if (this.index <= 1) return;
            this.go(--this.index)
            this.pages()
        },
        next() {
            if (this.index >= this.pageSize) return;
            this.go(++this.index)
            this.pages()
        },
        go(ind) {
            if (ind == 1) {
                $(".prevLi").addClass("disabled")
            } else {
                $(".prevLi").removeClass("disabled")
            }
            if (ind == this.pageSize) {
                $(".nextLi").addClass("disabled")
            } else {
                $(".nextLi").removeClass("disabled")
            }
            this.index = ind;
            let times = (ind - 1) * this.num;
            //console.log(times)
            var data = this.tabData.slice(times, this.num * ind);
            this.tabList = data;
            //console.log(this.tabList)
            this.pages()
        }
    }
})

//筛选功能
$(function () {
    //点击让其展示出列表 默认让其都隐藏
    $(".box tr.parent").click(function () {
        $(this)
            .toggleClass("selected")
            .siblings(".child_" + this.id).stop().toggle();
    }).click();//此行代码表示要立即执行
    //设置列表查询
    $("#filterName").keyup(function () {
        $("table tbody tr").stop().hide() //将tbody中的tr都隐藏
            .filter(":contains('" + ($(this).val()) + "')").show(); //，将符合条件的筛选出来
    });
});

//渲染主页"综合排名"中的table表单和分页
var apps = new Vue({
    el: "#apps",
    data: {
        tabData: [],
        arr: [],
        index: 1,
        num: 5,
        pageSize: null,
        tabList: "",
        len: "",
        end: "",
        name: "",
        branch: "",
        project: "",
        content: "",
        start: ""
    },
    created() {
        this.$http.get("../data/indexData2.json")
            .then(function (data) {
                this.tabData = data.body.fenData;
                let len = this.tabData.length;
                this.len = len;
                this.pageSize = Math.ceil(len / this.num);
                for (var i = 0; i < this.pageSize; i++) {
                    this.arr.push(i + 1);
                }
                //init pagination
                this.go(1);
                this.pages();

            });
    },
    updated() {
        //this.tabList.updated();
    },
    methods: {
        pages() {
            this.end = this.index * this.num;
            this.start = (this.index - 1) * this.num + 1;
        },
        mouseover() {
            alert(211);
        },
        prev() {
            if (this.index <= 1) return;
            this.go(--this.index)
            this.pages()
        },
        next() {
            if (this.index >= this.pageSize) return;
            this.go(++this.index)
            this.pages()
        },
        go(ind) {
            if (ind == 1) {
                $(".prevLi").addClass("disabled")
            } else {
                $(".prevLi").removeClass("disabled")
            }
            if (ind == this.pageSize) {
                $(".nextLi").addClass("disabled")
            } else {
                $(".nextLi").removeClass("disabled")
            }
            this.indexs = ind;
            let times = (ind - 1) * this.num;
            var data = this.tabData.slice(times, this.num * ind);
            this.tabList = data;
            this.pages()
        }
    }
})


//loading动画
//获取浏览器页面可见高度和宽度  
//var _PageHeight = document.documentElement.clientHeight,
    //_PageWidth = document.documentElement.clientWidth;
//计算loading框距离顶部和左部的距离（loading框的宽度为215px，高度为61px）  
//var _LoadingTop = _PageHeight > 61 ? (_PageHeight - 61) / 2 : 0,
   // _LoadingLeft = _PageWidth > 215 ? (_PageWidth - 215) / 2 : 0;
//在页面未加载完毕之前显示的loading Html自定义内容  
//var _LoadingHtml = '<div id="loadingDiv" style="position:absolute;left:0;width:100%;height:' + _PageHeight + 'px;top:0;background:#f3f8ff;opacity:1;filter:alpha(opacity=80);z-index:10000;"><div style="position: absolute; cursor1: wait; left: ' + _LoadingLeft + 'px; top:' + _LoadingTop + 'px; width: auto; height: 57px; line-height: 57px; padding-left: 50px; padding-right: 5px; background: #fff url(../../../Scripts/img/loading.jpg) no-repeat scroll 5px 10px; border: 2px solid #95B8E7; color: #696969; font-family:\'Microsoft YaHei\';">页面加载中，请等待...</div></div>';
//呈现loading效果  
//document.write(_LoadingHtml);

//window.onload = function () {  
//    var loadingMask = document.getElementById('loadingDiv');  
//    loadingMask.parentNode.removeChild(loadingMask);  
//};  

//监听加载状态改变  
//document.onreadystatechange = completeLoading;

//加载状态为complete时移除loading效果  
//function completeLoading() {
    //if (document.readyState == "complete") {
        //var loadingMask = document.getElementById('loadingDiv');
        //loadingMask.parentNode.removeChild(loadingMask);
   // }
//} 