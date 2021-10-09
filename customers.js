import { createClient } from "./shoeStore.js"

export const getCustomerCollection = async () => {
  const client = await createClient()
  const db = client.db('ShoeStoreDB')
  return db.collection('customers')
}

export const createCustomer = async ({name, lastName, address, email})=>{
  const customerCollection = await getCustomerCollection()
  const ret = await customerCollection.insertOne({name, lastName, address, email})
  return ret.insertedId
}