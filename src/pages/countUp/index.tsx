import  React, { useState, useEffect } from 'react';
import CountUp, { useCountUp } from 'react-countup';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { Button, Divider, message } from 'antd';
import './index.css';

const renderCountUpByHook = `
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
    <div>
        <div className='title-container'><h1>React-countUp demo</h1></div>
        <div className="site-button-ghost-wrapper">
            <div className="site-button-ghost-item">
                <div>{ countUp }</div>
                <Button onClick={ start }>Start</Button>
                <Button onClick={ pauseResume }>pauseResume</Button>
                <Button onClick={ reset }>reset</Button>
                <Button onClick={() => update(50) }>update to 50</Button>
            </div>
            <div className="site-button-ghost-item">
            </div>
        </div>    
    </div>
)`;
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
        <div>
            <div className='title-container'><h1>React-countUp demo</h1></div>
            <div className="site-button-ghost-wrapper">
                <div className="site-button-ghost-item" style={{height: 750}}>
                    <span>{ countUp }</span>
                    <div>
                        <Button onClick={ start }>Start</Button>
                        <Button onClick={ pauseResume }>pauseResume</Button>
                        <Button onClick={ reset }>reset</Button>
                        <Button onClick={() => update(50) }>update to 50</Button>
                    </div>
                </div>
                <div className="site-button-ghost-item">
                    {/* {renderCountUpByHook} */}
                    {/* <LiveProvider code="<strong>Hello World!</strong>"> */}
                    <LiveProvider code={renderCountUpByHook}>
                        <LiveEditor />
                        {/* <LiveError />
                        <LivePreview /> */}
                    </LiveProvider>
                </div>
            </div>    
        </div>
    )
}
export default CountUpTip;