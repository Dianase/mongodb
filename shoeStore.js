import { MongoClient } from "mongodb"
import dotenv from 'dotenv'


dotenv.config()
let _client = new MongoClient(process.env.MONGO_URL)
let isConnected = false
//Top function deals with the CLUSTER. This is created to be reused
//Only ever create one client, if it already exists just return it
export const createClient = async () => {
  if(!isConnected){
    await _client.connect()
    isConnected = true
  }
  return _client
}

export const getShoesCollection = async () =>{
  const client = await createClient()
  const db = client.db('ShoeStoreDB')
  return db.collection('shoes')
}

export const createShoes = async ({type, color, size, price}) => {
  const shoesCollection = await getShoesCollection()
  const ret = await shoesCollection.insertOne({type, color, size, price})
  return ret.insertedId
}


// //separate run function for getOrderbyId
// const run2 = async () =>{
//   const client = await createClient()
//   let order = await getOrderById()
// }
  
// const run = async () => {
//   const client = await createClient()
//   let customerId = await createCustomer({
//     name: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     address: faker.address.streetAddress(),
//     email: faker.internet.email()
//   })

//   let shoeId = await createShoes({
//     type: faker.commerce.productMaterial(),
//     color: faker.commerce.color(),
//     size: faker.datatype.number(12),
//     price: faker.commerce.price()
//   })
 
//   await createOrders({
//     customer: customerId,
//     shoes: shoeId,
//     date: faker.datatype.datetime()
//   })
//   await client.close()
// }
//  run().then()









 /**ignore this
  * 
  * 

dotenv.config();
let _client;
//Top function deals with the CLUSTER. This is created to be reused
//Only ever create one client, if it already exists just return it
const createClient = async () => {
  if (!_client) {
    _client = new MongoClient(process.env.MONGO_URL);
    await _client.connect();
  }
  return _client;
};

const getUserCollection = async () => {
  const client = await createClient();
  const db = client.db("DianaMongoDB");
  return db.collection("user");
};

const createUser = async ({ name, dob, email }) => {
  const userCollection = await getUserCollection();
  await userCollection.insertOne({ name, dob, email });
  return { name, dob, email };
};

const run = async () => {
  const client = await createClient();
  await createUser({
    name: "Diana",
    dob: new Date("10/11/1988"),
    email: "blah@snailmail.com",
  });
  await client.close();
};
run().then();

  */