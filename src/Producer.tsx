/**
 * Producer.tsx renders a functional component that uses Atomic Kafka to produce data to a
 * websocket on the server, which then sends that data to the Kafka cluster.
 */

import React, { useState, useEffect } from "react";
import ioClient from 'socket.io-client';

// TypeScript declaration for the JavaScript require function
declare function require(name:string)
// Require in the client-side class of atomic-kafka
const AtomicKafkaClient = require('atomic-kafka/client').default

// Type annotation for SaleOrder object
interface SaleOrder {
  id: string,
  SKU: string,
  qty: number,
}

// Functional Producer component
function Producer() {
  const [id, setId] = useState('') 
  const [sku, setSku] = useState('')
  const [qty, setQty] = useState('')

  // Instantiation of the client class using the server that was also used to instantiate
  // the server class
  const akc = new AtomicKafkaClient('http://localhost:3001');

  // onClick function linked to PRODUCE button
  function socketProducerInvoke() {
    // set socket connection to same address
    const socket = ioClient('http://localhost:3001');

    const payload: SaleOrder = {
      id: String(id),
      SKU: sku,
      qty: Number(qty),
    };

    // Send the payload as a message to the Kafka cluster
    akc.producer('postMessage', payload);
  }

    return (
      <div className="produceData">
        <input type="text" className="idInput" placeholder='Enter Id' onChange={e => setId(e.target.value)} />
        <input type="text" className="skuInput" placeholder='Enter Sku' onChange={e => setSku(e.target.value)} />
        <input type="text" className="qtyInput" placeholder='Enter Qty' onChange={e => setQty(e.target.value)} />
        <button className="produceDataButton" onClick={() => socketProducerInvoke()}>PRODUCE</button>
      </div>
    )
}

export default Producer;