![AtomicKafka_MastHead](./assets/logo_rect.png)

---

<p align="center">AtomicKafka is a lightweight <a href="https://www.npmjs.com/package/atomic-kafka"> NPM Package</a> developed to simplify the process of establishing bidirectional, real-time data streaming with Apache Kafka in your web-app.
<br>
<a href="http://www.atomickafka.com/">Website</a><span>&nbsp; | &nbsp;</span><a href="https://github.com/oslabs-beta/AtomicKafka">Library</a><span>&nbsp; | &nbsp;</span><a href="https://github.com/AtomicKafka">Demo Apps</a><span>&nbsp; | &nbsp;</span><a href="https://medium.com/@dbehmoaras/2eb79b20eaae?source=friends_link&sk=843b83b81eb79f37f0d2b8a96ce26212">Featured on Medium</a></p>

<p align="center">

  <a href="https://www.npmjs.com/package/atomic-kafka">
    <img alt="npm" src="https://img.shields.io/npm/v/atomic-kafka?color=%2366FCF1&style=for-the-badge">
  </a>
  <a href="https://github.com/oslabs-beta/atomickafka/graphs/contributors">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/oslabs-beta/atomickafka?color=%2366FCF1&style=for-the-badge">
  </a>
  <a href="https://github.com/oslabs-beta/AtomicKafka/stargazers">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/oslabs-beta/AtomicKafka?color=%2366FCF1&style=for-the-badge">
  </a>
  <a href="https://github.com/oslabs-beta/atomickafka/blob/main/LICENSE">
    <img alt="Last Commit" src="https://img.shields.io/github/last-commit/oslabs-beta/AtomicKafka?color=%2366FCF1&style=for-the-badge">
  </a>
  <a href="https://github.com/oslabs-beta/atomickafka/blob/main/LICENSE">
    <img alt="NPM" src="https://img.shields.io/npm/l/atomic-kafka?color=%2366FCF1&style=for-the-badge">
  </a>
</p>

# **AtomicKafkaProducer**

**AtomicKafkaProducer** demonstrates a functioning standalone Producer microservice built into a React Component. This demo app was built to be used alongside [AtomicKafkaConsumer](https://github.com/AtomicKafka/atomicKafkaConsumer).

If you are running the corresponding [Consumer](https://github.com/AtomicKafka/atomicKafkaConsumer), the Consumer will listen to the data that you produce from your producer app in real time. Try it with your colleagues by setting up a free [Confluent Cloud](https://www.confluent.io/confluent-cloud/) and sharing the **_API credentials_** with each to see how AtomicKafka integrates with the cloud!

---

## **Getting Started**

### **1.** Set up your Kafka service

**Docker:**

- If using Docker, use the [.yml](https://github.com/AtomicKafka/atomicKafkaProducer/blob/main/docker-compose.yml) file provided herein and run in the root directory of this app.

    ```sh
    docker-compose up -d
    ```

**Confluent Cloud:**

- Follow the steps on [Confluent Cloud](https://www.confluent.io/confluent-cloud/) to create a free account. Obtain the **_API_ACCESS_KEY_**, **_API_ACCESS_SECRET_**, and **_BOOTSTRAP_SERVER_**.
- Note that if you already have a Kafka instance running from a docker image (e.g. from the Producer demo), you do not need to compose again.

---

### **2.** Configure .env file

- Default ports are configured on the local host for the dev-server **9001** and the Kafka broker **3001**.
- Docker .env config: (**_API_KEY_** and **_API_SECRET_** are intentionally left blank).
  ```js
  API_KEY=
  API_SECRET=
  KAFKA_BOOTSTRAP_SERVER=localhost:9092
  ```
- Confluent Cloud .env config:
  ```js
  API_KEY=<API_ACCESS_KEY>
  API_SECRET=<API_ACCESS_SECRET>
  KAFKA_BOOTSTRAP_SERVER=<BOOTSTRAP_SERVER>
  ```

---

### **3.** Install dependencies and build the package

```
$ npm install
$ npm run build
```

---

### **4.** Run the dev server

```
$ npm run dev
```

---

### **5. OPTIONAL** Toggle file system interval production.

The Producer's default behavior accepts user inputs in the fields provided in the web-app. This Producer can also produce data from the file system - [salesData.json](https://github.com/AtomicKafka/atomicKafkaProducer/blob/main/salesData.json).

To enable this functionality, do the following in [server.js](https://github.com/AtomicKafka/atomicKafkaProducer/blob/main/server.js):
- Comment out the `atomicKafkaInstance`'s `socketProduce` invocation (line 46):
  ```js
  //atomicKafkaInstance.socketProduce('postMessage', 'test_topic');
  ```

- Uncomment the invocation of `produceMyWay` (line 87):
  ```js
  // Uncomment invocation below to test this app with an endless stream of mock data
  produceMyWay();
  ```

