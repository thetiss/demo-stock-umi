import React, { useEffect } from 'react';
// 根据官网issue，解决line报错
import * as echarts from 'echarts/core';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { GridComponent, GridComponentOption } from 'echarts/components';


const ChildEcharts = () => {
    type EChartsOption = echarts.ComposeOption<GridComponentOption | LineSeriesOption>;
    let option: EChartsOption = {
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20]
        }]
    }
    echarts.use([LineChart, CanvasRenderer]);

    return(
        <div id="main" style={{ width: 400, height: 400 }}></div>
    )
}
export default ChildEcharts;