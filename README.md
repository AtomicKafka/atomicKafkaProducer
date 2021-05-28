# AtomicKafkaProducer
## Getting Started: 
**AtomicKafkaProducer** is a demo-producer-app for people who want to see how [AtomicKafka](https://github.com/oslabs-beta/AtomicKafka) can be integrated into a front-end app as a producer. There is also a [demo-consumer-app](https://github.com/AtomicKafka/atomicKafkaConsumer) to be paired with this demo-producer-app. To download AtomicKafka npm package, [click here](https://github.com/oslabs-beta/AtomicKafka). To download the demo-consumer-app, [click here](https://github.com/oslabs-beta/AtomicKafka). 


<br>

----

### 1. Install your **dependencies**: 
<br>

```
npm install
```

<br>

---
### 2. Connect to Kafka Cluster:

<br>

Establish your server connection first. In server.js, set up your **port**. This port will be used for express and socket.io connection (**default port is 3001**).

<br>

```
const express = require('express');
const app = express();
const path = require("path");
const AtomicKafkaServer = require('atomic-kafka/server')
const fs = require('fs');

const port = 3001;
```

<br>

If you decide to use a different **port number**, be sure to modify Producer.tsx to establish a proper connection with your socket and the Kafka cluster (**default port is 3001**). 

<br>

```
const akc = new AtomicKafkaClient('http://localhost:3001')

function socketProducerInvoke() {
console.log("the state of num is now...", qty);
const socket = ioClient('http://localhost:3001');
```

<br>

---
### 3. Data format ###

<br>

The app is set up to handle data in the following format: 
- id (unique id of the products)
- SKU (name of the products)
- qty (quantity of the products)

<br>

---
### 4. Run your app  ###

<br>

```
npm run dev
```

If you are running your consumer app, now the consumer app will listen to the data that you produce from your producer app. This will be done in real time. 
