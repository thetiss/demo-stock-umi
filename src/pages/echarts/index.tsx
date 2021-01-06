import React, { useState, useEffect} from 'react';
import ReactEcharts from "echarts-for-react";
import { Row, Col, Card } from 'antd';  // antd的引入

const TimeClock = () => {
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
    const reportOptions = {
        title: {
            text: '本周周报统计',
            x: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} 人({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['提交人数', '未提交人数'],
          },
          series: [
            {
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                { value: 200, name: '已提交' },
                { value: 30, name: '未提交' },
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        };
    return(
        <>
            <ReactEcharts option={reportOptions}  />
        </>
    )
}
export default TimeClock;