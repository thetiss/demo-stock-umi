import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';

export interface IMqttConnectOption {
    clean: boolean;
    connectTimeout: number;
    clientId: string;
    username: string;
    password: string;
}
const MqttClient = () => {
    const [ connectionIsAlived, setConnectionIsAlived ] = useState<boolean>(false);
    const [ messages, setMessages ] = useState<Array<String>>([]);
    useEffect(() => {
        const clientId = 'mqttc_via_react_' + Math.random().toString(16).substr(2, 8);
        const connectionOption:IMqttConnectOption = {
            clean: true, // true: 清除会话
            connectTimeout: 4000, // 很神奇的是，在Dash上看到刚刚好是4个clientID
            clientId: clientId,
            username: 'iiotForClient',
            password: 'iiot@client'
        };
        const mqttBrokerUrl = 'ws://192.168.1.178:8083/mqtt';
        const topicForTest = 'testtopic/mytopicsay';
        const client = mqtt.connect(mqttBrokerUrl, connectionOption);
        console.log('in useEffect');
        client.on('connect', () => {
            setConnectionIsAlived(true);
            console.log('Successfully Connect to :', mqttBrokerUrl);
            console.log('You can Subscribe or Publish……');
            client.subscribe(topicForTest, function(err) {        
                if(!err) {
                    console.log('Have sub :', topicForTest);
                    client.publish(topicForTest, 'hi, mqttx');
                }
            })
        });
        client.on('message', (topic, message, packet ) => {
           const newMessage = message.toString();
            messages.push(newMessage);           
            message && setMessages(messages);
            console.log('Received Message', topic, message.toString());
        });

        client.on('error', (error) => {
            console.log('Failed to connect to : ', mqttBrokerUrl);
            console.log(error);
        });   
    },[connectionIsAlived]);
    return(
        <>
            <h1>--Msg List</h1>        
            <h2> {messages.length} </h2>    
            <h1>Msg List--</h1>
            { messages && messages.map((msg) => (                
                <h1> {msg} </h1>
                ))
            }
        </>
    )
}
export default MqttClient;
