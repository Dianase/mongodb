import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import express from "express";
import { createShoes, getShoesCollection, createClient } from "./shoeStore.js";
import { getOrderById, createOrders } from "./orders.js";
import { createCustomer, getCustomerCollection } from "./customers.js";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/customers", async (req, res) => {
  let customer = await createCustomer(req.body);
  try {
    res.status(201).send(customer);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post("/shoes", async (req, res) => {
  let shoes = await createShoes(req.body);
  try {
    res.status(201).send(shoes);
  } catch (e) {
    res.status(500).send(e);
  }
});
app.get("/shoes", async (req, res) => {
  let shoes = getShoesCollection(req.body);
  try{
    res.status(200).send(shoes)
  }catch(e){
    res.status(500).send(e)
  }
});

app.post("/orders", async (req, res) => {
  let orders = createOrders(req.body)
  try{
    res.status(201).send(orders)
  }catch(e){
    res.status(500).send(e)
  }

}
  )

app.get("/orders/:id", getOrderById);

app.listen(3000, () => console.log("Listening on port 3000"));
