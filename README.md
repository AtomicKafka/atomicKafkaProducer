# AtomicKafkaProducer
## Getting Started: 
AtomicKafkaProducer is a demo-producer-app for people who want to see how [AtomicKafka](https://github.com/oslabs-beta/AtomicKafka) can be integrated into a front-end app as a producer. There is also a [demo-consumer-app](https://github.com/AtomicKafka/atomicKafkaConsumer) to be paired with this demo-producer-app. To download AtomicKafka npm package, click [here](https://github.com/oslabs-beta/AtomicKafka). To download the demo-consumer-app, click [here](https://github.com/oslabs-beta/AtomicKafka). 

### 1. Install your dependencies: 
```
npm install
```

### 2. Connect to Kafka Cluster:

Establish your server connection first. In server.js, set up your port (default port is 3001)
```
const express = require('express');
const app = express();
const path = require("path");
const AtomicKafkaServer = require('atomic-kafka/server')
const fs = require('fs');

const port = 3001;
```
If you decide to use a different port number, be sure to modify Producer.tsx to establish a proper connection with your socket and the Kafka cluster. 
```
const akc = new AtomicKafkaClient('http://localhost:3001')

function socketProducerInvoke() {
console.log("the state of num is now...", qty);
const socket = ioClient('http://localhost:3001');
```

### 3.  ###

- 

### 4.  ###

- Import React, useState, useEffect from "react" 

