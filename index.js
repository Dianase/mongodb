import { MongoClient } from "mongodb"
import dotenv from 'dotenv'

dotenv.config()

const createClient = async () => {
  const client = new MongoClient(process.env.MONGO_URL)
  await client.connect()
  const db = client.db('DianaMongoDB')
  const col = db.collection('users')
  return col
}

createClient().then()