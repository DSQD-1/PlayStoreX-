import express from "express";
import cors from "cors";
import {
  users,
  products,
  orders,
  withdrawals
} from "./database.js"; 
const app = express();

app.use(cors());
app.use(express.json());


let users = [];
let products = [];
let orders = [];


app.get("/", (req, res) => {
  res.json({
    status: "PlayStoreX API работает"
  });
});


app.get("/users", (req, res) => {
  res.json(users);
});


app.get("/products", (req, res) => {
  res.json(products);
});


app.post("/products", (req, res) => {

  const product = {
    id: Date.now(),
    ...req.body
  };

  products.push(product);

  res.json(product);

});


app.post("/orders", (req, res) => {

  const order = {
    id: Date.now(),
    status: "waiting",
    ...req.body
  };

  orders.push(order);

  res.json(order);

});


app.listen(3000, () => {
  console.log(
    "PlayStoreX API запущен"
  );
});