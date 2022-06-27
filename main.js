const { Client, Message } = require('node-osc');
// const { Server } = require('node-osc');

const client = new Client('127.0.0.1', 7000);

const sendMessage = (address, value, close=false) => {
    let message = new Message(address);
    switch(typeof value){
      case "string":
        message.append(value);
        break;
      case "object":
        value.forEach(elem => {
          message.append(elem);
        })
        break;
      }
    client.send(message, 200, () => {
      console.log(message);
      if (close) {client.close()};
    });
  }

const INITIAL_DELAY = 3000;
const DELAY_BETWEEN_MESSAGES = 5; //milliseconds

const sendRecursive = () => {

    sendMessage("DummyAddress", ["message1", "message2"]);
    sendMessage("DummyAddress", "message");


  setTimeout(sendRecursive,DELAY_BETWEEN_MESSAGES);
}

setTimeout(sendRecursive, INITIAL_DELAY);