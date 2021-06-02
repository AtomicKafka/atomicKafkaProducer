# AtomicKafkaProducer
## Getting Started:
**AtomicKafkaProducer** is a demo-producer-app for people who want to see how [AtomicKafka](https://github.com/oslabs-beta/AtomicKafka) can be integrated into a front-end app as a producer. There is also a [demo-consumer-app](https://github.com/AtomicKafka/atomicKafkaConsumer) to be paired with this demo-producer-app. To download AtomicKafka npm package, [click here](https://github.com/oslabs-beta/AtomicKafka). To download the demo-consumer-app, [click here](https://github.com/oslabs-beta/AtomicKafka).


<br>

----

## NEW STEPS ##
1. Set up your Kafka service. If using Docker, run docker-compose up -d in the root directory of this app. If using Confluent Cloud, create an account with this link https://www.confluent.io/confluent-cloud/ and use the API key, API secret, and bootstrap server from Confluent. Note that if you already have a Kafka instance running from a docker image (e.g. from the Consumer demo), you do not need to compose again.
2. Configure your .env file based on your kafka service
3. Npm install to install dependendencies and npm run dev to start the app.
4. to demonstrate


If you are running your consumer app, now the consumer app will listen to the data that you produce from your producer app. This will be done in real time.
