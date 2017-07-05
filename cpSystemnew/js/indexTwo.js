$(function(){
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
    var options = {
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
    myChart4.setOption(options)
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
                myChart4.setOption(options)
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
                myChart4.setOption(options)
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
})