import React, { useState, useEffect } from 'react';
import { GaugeChart } from 'bizcharts';
import Loading from '../components/PageLoading';
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
    <>
    { seriesData && seriesData.map((item,index) => (     
      (
        <div key={index}>
          <Loading />
          {/* <GaugeChart 
            width={300}
            height={400}
            value={item.value}
            min={0}
            max={5000}
            range={[0,1000,2000,3000,4000]}
            color={['#39B8FF', '#52619B', '#43E089', '#C0EDF3']}
            statistic={{
              visible: true,
              text: item.name+'\n'+item.value,
              color: '#1E90FF'
            }}
          /> */}
        </div>
      )     )
    )}
  </>
  );
}
