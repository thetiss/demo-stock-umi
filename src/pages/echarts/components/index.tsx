import React, { useState, useEffect} from 'react';
// 引入 ECharts 主模块：
import echarts from 'echarts/lib/echarts';
// 引入折线：
import 'echarts/lib/chart/bar'; 
// 引入饼状图：
import 'echarts/lib/chart/pie';
// 引入提示框和标题、图例组件：
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
export interface  IOption {
    xAxis: {
        data: string[];
    };
    yAxis: {};
    series: {
        name: string;
        type: string;
        data: number[];
    }[];
}
const optionInstance = {            
    xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
};
const EchartsGraph = () => {
    useEffect(() => {
        console.log("effect here");
        // 基于准备好的dom，初始化echarts实例
        // 加上类型断言，否则ts会报错
        var htmlDom: HTMLElement = document.getElementById('main') as HTMLElement;
        var myChart = echarts.init(htmlDom);
        console.log(htmlDom);
        console.log(myChart);  
        console.log(myChart.getWidth());  
        console.log(echarts.version);
        // 绘制图表
        myChart.setOption(optionInstance);

    })
    return(
        <div id="main" style={{ width: 400, height: 400 }}></div>
    )
}
export default EchartsGraph;