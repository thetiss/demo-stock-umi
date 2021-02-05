//import mqtt from 'mqtt';
const mqtt = require('mqtt');

const connectOption = {
    clean: true, // true: 清除会话
    connectTimeout: 4000,
    clientId: 'mqttc_via_js',
    username: 'iiotForClient',
    password: 'iiot@client'
};

const mqttBrokerUrl = 'mqtt://192.168.1.178';
const client = mqtt.connect(mqttBrokerUrl, connectOption);
const topicForTest = 'testtopic/mytopicsay';
client.on('connect', () => {
    console.log('Successfully Connect to :', mqttBrokerUrl);
    console.log('You can Subscribe or Publish……');
    client.subscribe(topicForTest, function(err) {        
        if(!err) {
            console.log('Have sub :', topicForTest);
            client.publish(topicForTest, 'hi, mqttx');
        }
    })
});

client.on('error', (error) => {
    console.log('Failed to connect to : ', mqttBrokerUrl);
    console.log(error);
});

client.on('message', (topic, message) => {
    console.log('Received Message', topic, message.toString());
});



