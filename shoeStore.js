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
  const userCollection = await getCustomerCollection()
  const ret = await userCollection.insertOne({name, lastName, address, email})
  return ret.insertedId
}

const getShoesCollection = async () =>{
  const client = await createClient()
  const db = client.db('ShoeStoreDB')
  return db.collection('shoes')
}

const createShoes = ({type, color, size, price}) =>{
  const shoeCollection = await getShoesCollection()
  const ret = await shoeCollection.insertOne({type, color, size, price})
  return ret.insertedId
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
    type: faker.shoes.type(),
    color: faker.commerce.color(),
    size: faker.datatype.number(12),
    price: faker.commerce.price()
  })
  console.log(customerId)
  await client.close()
}
 run().then()

