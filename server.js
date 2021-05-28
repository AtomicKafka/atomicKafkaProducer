/**
 * This is a typical Node.js server setup, which is used to serve up a demo React app that
 * will be using atomic-kafka to produce data to a Kafka cluster.
 */
const express = require('express');
const app = express();
const path = require("path");
const AtomicKafkaServer = require('atomic-kafka/server')
const fs = require('fs');

const port = 3001;

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, './assets')));

// serve root
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/index.html'))
})

// 404 handler
app.use('*', (req, res) => {
  return res.status(404).send('********** GLOBAL BAD REQUEST / 404 ERROR **********');
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/**
 * Pass in the server that the Atomic Kafka instance will interact with on the backend
 * as well as the frontend. These ports need to match so that the socket on the back and
 * frontend are connected correctly.
 */
const atomicKafkaInstance = new AtomicKafkaServer(server);

// newProducer generates a Kafka producer instance using the topic name passed in by the user
atomicKafkaInstance.newProducer('test_topic');

// socketProduce produces messages to the topic in the cluster via a websocket connection;
// in order for the message to be routed from front to backend, the event string must match
atomicKafkaInstance.socketProduce('postMessage', 'test_topic')

/**
 * OPTIONAL: The user can write and run a custom function that invokes one of Atomic Kafka's
 * produce functions if their use case necessitates a different way to handle the data.
 * For example, produceMyWay reads a stream of JSON data on loop from the user's file system.
 */
const produceMyWay = () => {
  let data;
  let toSend = [];
  try {
    data = fs.readFileSync('salesData.json', 'UTF-8');
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
      toSend.push(line);
    })
  }
  catch (err){
    console.error(err);
  }
  let i = 0;
  const interval = setInterval(async () => {
			console.log('i: ', i)
			if(i > toSend.length - 1) {
				i = 0;
			}
			try {
				console.log('executing send with: ', toSend[i]);
        atomicKafkaInstance.fileProduce(toSend[i],'test_topic');
				i++;
			}
			catch (err) {
				console.log('Error with producing in produce(): ', err);
			}
		}, 5000)
}
// Uncomment invocation below to test this app with an endless stream of toy data
// produceMyWay();
