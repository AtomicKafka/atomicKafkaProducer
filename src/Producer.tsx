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
  ID: string,
  SKU: string,
  QTY: number,
}

// Functional Producer component
function Producer() {
  const [id, setId] = useState('')
  const [user, setUser] = useState('guest')
  // let orderNum = 0;
  const [orderNum, setOrderNum] = useState(0)
  const [sku, setSku] = useState('')
  const [qty, setQty] = useState('')

  // Instantiation of the client class using the server that was also used to instantiate
  // the server class
  const akc = new AtomicKafkaClient('http://localhost:3001');

function prepOrder(e) {
    setId(user+orderNum);
    setSku(e.target.id);
    setQty(e.target.value);
  }

  // onClick function linked to PRODUCE button
  function socketProducerInvoke() {
    // set socket connection to same address
    const socket = ioClient('http://localhost:3001');

    const payload: SaleOrder = {
      ID: String(id),
      SKU: sku,
      QTY: Number(qty),
    };

    // Send the payload as a message to the Kafka cluster
    akc.producer('postMessage', payload);
  }

    return (
      <div className="mainContainer">
        <input id="purchaser-id" type="text" placeholder="Enter purchaser name here" onChange={e => setUser(e.target.value)} />
        <div className="produceData">
          {/* <input type="text" className="idInput" placeholder='Enter Id' onChange={e => setId(e.target.value)} />
          <input type="text" className="skuInput" placeholder='Enter Sku' onChange={e => setSku(e.target.value)} />
          <input type="text" className="qtyInput" placeholder='Enter Qty' onChange={e => setQty(e.target.value)} /> */}
          {/* <button className="produceDataButton" onClick={() => socketProducerInvoke()}>PRODUCE</button> */}
          {/* <ul>
            <li>
              <input type="checkbox" id="prod-apples" name="prod-apples" value="apples" onChange={e => setSku(e.target.value)} />
              <label htmlFor="prod-apples">Apples</label>
              <input type="text" className="qtyInput" placeholder='Enter Qty' onChange={e => setQty(e.target.value)} />
              <button className="produceDataButton" onClick={() => socketProducerInvoke()}>Buy</button>
            </li>
          </ul> */}
          <div className="productCard">
            Apples
            <form>
              <input type="text" className="qtyInput" id="apples" placeholder='Enter Qty' onChange={e => prepOrder(e)} />
              <input className="produceDataButton" type="reset" value="Buy" onClick={() => {setOrderNum(orderNum+1); socketProducerInvoke()}} />
            </form>
            {/* <button className="produceDataButton" onClick={() => socketProducerInvoke()}>Buy</button> */}
          </div>
          <div className="productCard">
            Oranges
            <form>
              <input type="text" className="qtyInput" id="oranges" placeholder='Enter Qty' onChange={e => prepOrder(e)} />
              <input className="produceDataButton" type="reset" value="Buy" onClick={() => {setOrderNum(orderNum+1); socketProducerInvoke()}} />
            </form>
          </div>
          <div className="productCard">
            Truffles
            <form>
              <input type="text" className="qtyInput" id="truffles" placeholder='Enter Qty' onChange={e => prepOrder(e)} />
              <input className="produceDataButton" type="reset" value="Buy" onClick={() => {setOrderNum(orderNum+1); socketProducerInvoke()}} />
            </form>
          </div>
          <div className="productCard">
            Tomatoes
            <form>
              <input type="text" className="qtyInput" id="tomatoes" placeholder='Enter Qty' onChange={e => prepOrder(e)} />
              <input className="produceDataButton" type="reset" value="Buy" onClick={() => {setOrderNum(orderNum+1); socketProducerInvoke()}} />
            </form>
          </div>
          <div className="productCard">
            Ramps
            <form>
              <input type="text" className="qtyInput" id="ramps" placeholder='Enter Qty' onChange={e => prepOrder(e)} />
              <input className="produceDataButton" type="reset" value="Buy" onClick={() => {setOrderNum(orderNum+1); socketProducerInvoke()}} />
            </form>
          </div>
        </div>
      </div>
    )
}

export default Producer;