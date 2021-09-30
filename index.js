import { MongoClient } from "mongodb"
import dotenv from 'dotenv'

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

const getUserCollection = async () => {
  const client = await createClient()
  const db = client.db('DianaMongoDB')
  return db.collection('user')
}

const createUser = async ({name, dob, email})=>{
  const userCollection = await getUserCollection()
  await userCollection.insertOne({name, dob, email})
  return {name, dob, email}
}

const run = async () =>{
  const client = await createClient()
  await createUser({
    name: 'Diana',
    dob: new Date('10/11/1988'),
    email: 'blah@snailmail.com'
  })
  await client.close()
}
 run().then()

