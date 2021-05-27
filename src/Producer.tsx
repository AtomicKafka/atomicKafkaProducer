import React, { useState, useEffect } from "react";
import { render } from 'react-dom'
import ioClient from 'socket.io-client'

declare function require(name:string)
const AtomicKafkaClient = require('atomic-kafka/client').default

interface SaleOrder {
  SKU: string,
  qty: string,
}


function Producer() {
  // const AKC = require('atomic-kafka/client')
  // console.log(AtomicKafkaClient)
  const [sku, setSku] = useState('')
  const [qty, setQty] = useState('')
  const [id, setId] = useState('') 

  const akc = new AtomicKafkaClient('http://localhost:3001')

  function socketProducerInvoke() {
    console.log("the state of num is now...", qty);
    const socket = ioClient('http://localhost:3001');

    const payload = {
      id: String(id),
      SKU: sku,
      qty: Number(qty),
    };

    akc.producer('postMessage', payload)

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