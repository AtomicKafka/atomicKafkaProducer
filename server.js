const express = require('express');
const app = express();
const path = require("path");
const AtomicKafkaServer = require('atomic-kafka/server')
const fs = require('fs');

const port = 3001;


app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, './assets')));
app.get('/', (req, res) => {
  console.log('*** serving root of demo app ( / )');
  res.sendFile(path.resolve(__dirname + '/index.html'))
})

/**
 * 404 handler
 */
app.use('*', (req, res) => {
  return res.status(404).send('********** GLOBAL BAD REQUEST / 404 ERROR **********');
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const atomicKafkaInstance = new AtomicKafkaServer(server);
// console.log(atomicKafkaInstance)
// atomicKafkaInstance.newConsumer('truck-group');
// atomicKafkaInstance.socketConsume('truck-group', 'test_topic', 'newMessage'); //add event here
console.log('instantiating producer on server side')
atomicKafkaInstance.newProducer('test_topic');
atomicKafkaInstance.globalProduce('postMessage', 'test_topic')


const produceMyWay = () => {
  // select * from db
  let data;
  let toSend = [];
  try {
    data = fs.readFileSync('salesData.json', 'UTF-8');
    const lines = data.split(/\r?\n/);
    // lines.pop();
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
        atomicKafkaInstance.localProduce(toSend[i],'test_topic');
				i++;
			}
			catch (err) {
				console.log('Error with producing in produce(): ', err);
			}
		}, 5000)
}

// produceMyWay();
