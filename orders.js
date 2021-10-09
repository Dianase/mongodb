import { createClient } from "./shoeStore.js"


const getOrdersCollection = async () =>{
  const client = await createClient()
  const db = client.db('ShoeStoreDB')
  return db.collection('orders')
}

export const createOrders = async ({customer, shoes, date}) =>{
  const orders = await getOrdersCollection()
  const ret = await orders.insertOne({customer, shoes, date})
  return ret.insertedId
}

export const getOrderById = async (id) =>{
  const orderCollection = await orderCollection()
  const ret = await orderCollection.findOne(id)
  return ret
}