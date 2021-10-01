import { MongoClient } from "mongodb"
import dotenv from 'dotenv'
import faker from 'faker'

dotenv.config()
let _client
//Top function deals with the CLUSTER. This is created to be reused
//Only ever create one client, if it already exists just return it
const createClient = async () => {
  if(!_client){
    _client = new MongoClient(process.env.MONGO_URL)
    await _client.connect()
  }
  return _client
}

const getCustomerCollection = async () => {
  const client = await createClient()
  const db = client.db('ShoeStoreDB')
  return db.collection('customers')
}

const createCustomer = async ({name, lastName, address, email})=>{
  const customerCollection = await getCustomerCollection()
  const ret = await customerCollection.insertOne({name, lastName, address, email})
  return ret.insertedId
}

const getOrdersCollection = async () =>{
  const client = await createClient()
  const db = client.db('ShoeStoreDB')
  return db.collection('orders')
}

const createOrders = async ({customer, shoes, date}) =>{
  const orders = await getOrdersCollection()
  const ret = await orders.insertOne({customer, shoes, date})
  return ret.insertedId
}

const getShoesCollection = async () =>{
  const client = await createClient()
  const db = client.db('ShoeStoreDB')
  return db.collection('shoes')
}

const createShoes = async ({type, color, size, price}) => {
  const shoesCollection = await getShoesCollection()
  const ret = await shoesCollection.insertOne({type, color, size, price})
  return ret.insertedId
}

const getOrderById = async (id) =>{
  const orderCollection = await orderCollection()
  const ret = await orderCollection.findOne(id)
  return ret
}

const run = async () => {
  const client = await createClient()
  let customerId = await createCustomer({
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: faker.address.streetAddress(),
    email: faker.internet.email()
  })

  let shoeId = await createShoes({
    type: faker.commerce.productMaterial(),
    color: faker.commerce.color(),
    size: faker.datatype.number(12),
    price: faker.commerce.price()
  })
 
  await createOrders({
    customer: customerId,
    shoes: shoeId,
    date: faker.datatype.datetime()
  })

  let orders = await getOrderById()
  console.log(orders)

  await client.close()
}
 run().then()

