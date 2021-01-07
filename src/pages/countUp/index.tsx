import  React, { useState, useEffect } from 'react';
import CountUp, { useCountUp } from 'react-countup';
import { Button, Divider, message } from 'antd';
import './index.css';
//import styles from './index.css';

const CountUpTip = () => {
    const {
        countUp,
        start,
        pauseResume,
        reset,
        update
    } = useCountUp({
        start: 0,
        end: 23,
        delay: 2,
        duration: 5,
        onReset: () => message.info('onReset'),      
        onStart: () => message.info('onStart'),      
        onUpdate: () => message.info('onUpdate'),   
        onPauseResume: () => message.info('onPauseResume')
    });
     
    return(
        // <div className={styles.site-button-ghost-wrapper}>
        <div className="site-button-ghost-wrapper" style={{width: 1000}}>
            <div className="site-button-ghost-wrapper">
                <div>{ countUp }</div>
                <Button onClick={ start }>Start</Button>
                <Button onClick={ pauseResume }>pauseResume</Button>
                <Button onClick={ reset }>reset</Button>
                <Button onClick={() => update(50) }>update to 50</Button>
            </div>
            <Divider type="vertical" dashed/>
            <div className="site-button-ghost-wrapper">

            </div>
        </div>    

    )
}
export default CountUpTip