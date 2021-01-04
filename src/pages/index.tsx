import React, { useState, useEffect } from 'react';
import { GaugeChart } from 'bizcharts';
import { fetchTotalNum } from '../services/homePage'

import styles from './index.less';

interface ISeriesData {
  name: string
  value: number
}

export default () => {
  const [ seriesData, setSeriesData ] = useState< ISeriesData[] | null | undefined >([]);

  useEffect(() => {
    fetchSeriesData();
    console.log("useEffect here");
    console.log(seriesData);
  }, [seriesData?.length]);
  
  const fetchSeriesData = async () => {
    const response = await fetchTotalNum();
    if( response.status === 0 && response.data ) {
      const itemDataArr = response.data;
     
      let listData: ISeriesData[] = [];
      Object.keys(itemDataArr).forEach( (item,index) => {
        const itemData: ISeriesData = { name: '', value: 0 };
        itemData.name = item;
        itemData.value = itemDataArr[item];
        listData[index] = itemData;
      })
      setSeriesData(listData);    
    }
  }
  return (
        <GaugeChart 
            title={{
              visible: false,
              text: 'item.name',
            }}
            //width={index/seriesData.length*1000}
            width={300}
            height={400}
            value={1001}
            min={0}
            max={5000}
            range={[0,1000,2000,3000,4000]}
            color={['#39B8FF', '#52619B', '#43E089', '#C0EDF3']}
            statistic={{
              visible: true,
              text: 'item.name',
              color: '#1E90FF'
            }}
        />
    // <>
    //   { seriesData && seriesData.forEach((item,index) => (
    //       <GaugeChart 
    //         title={{
    //           visible: true,
    //           text: item.name,
    //         }}
    //         //width={index/seriesData.length*1000}
    //         width={300}
    //         height={400}
    //         value={item.value}
    //         min={0}
    //         max={5000}
    //         range={[0,1000,2000,3000,4000]}
    //         color={['#39B8FF', '#52619B', '#43E089', '#C0EDF3']}
    //         statistic={{
    //           visible: true,
    //           text: item.name,
    //           color: '#1E90FF'
    //         }}
    //     />
    //     )     
    //   )}
    // </>
  );
}
