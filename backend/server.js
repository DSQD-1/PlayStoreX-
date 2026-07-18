import express from "express";
import cors from "cors";

import {
  users,
  products,
  orders,
  withdrawals
} from "./database.js";

import { categories } from "./categories.js";


const app = express();

app.use(cors());
app.use(express.json());



// Проверка сервера

app.get("/", (req, res) => {

  res.json({
    status: "PlayStoreX API работает"
  });

});



// Получить всех пользователей

app.get("/users", (req, res) => {

  res.json(users);

});



// Создать пользователя

app.post("/users", (req, res) => {

  const telegramUser = req.body;


  const existing = users.find(
    user => user.telegramId == telegramUser.telegramId
  );


  if (existing) {

    return res.json(existing);

  }



  const newUser = {

    id: Date.now(),

    telegramId: telegramUser.telegramId,

    username: telegramUser.username || "",

    firstName: telegramUser.firstName || "",

    balance: 0,

    banned: false

  };


  users.push(newUser);


  res.json(newUser);

});




// Баланс пользователя

app.get("/users/:telegramId/balance", (req,res)=>{


  const user = users.find(
    u => u.telegramId == req.params.telegramId
  );


  if(!user){

    return res.status(404).json({
      error:"Пользователь не найден"
    });

  }


  res.json({
    balance:user.balance
  });


});




// Пополнение баланса

app.post("/users/:telegramId/balance",(req,res)=>{


  const user = users.find(
    u => u.telegramId == req.params.telegramId
  );


  if(!user){

    return res.status(404).json({
      error:"Пользователь не найден"
    });

  }



  user.balance += Number(req.body.amount);


  res.json({
    balance:user.balance
  });


});





// Категории

app.get("/categories",(req,res)=>{

  res.json(categories);

});





// Все товары

app.get("/products",(req,res)=>{

  res.json(products);

});





// Товары пользователя

app.get("/products/user/:id",(req,res)=>{


  const result = products.filter(
    product => product.sellerId == req.params.id
  );


  res.json(result);


});





// Создать товар

app.post("/products/create",(req,res)=>{


  const product = {

    id: Date.now(),

    sellerId: req.body.sellerId || null,

    title: req.body.title,

    game: req.body.game || "",

    category: req.body.category || "",

    price: Number(req.body.price),

    image: req.body.image || "",

    description: req.body.description || "",

    promoCode: req.body.promoCode || null,

    status:"active",

    createdAt:new Date()

  };



  products.push(product);


  res.json(product);


});





// Удаление товара

app.delete("/products/:id",(req,res)=>{


  const index = products.findIndex(
    p => p.id == req.params.id
  );


  if(index === -1){

    return res.status(404).json({
      error:"Товар не найден"
    });

  }


  products.splice(index,1);


  res.json({
    success:true
  });


});





// Заказы

app.post("/orders",(req,res)=>{


  const order = {

    id:Date.now(),

    status:"waiting",

    ...req.body

  };


  orders.push(order);


  res.json(order);


});






app.listen(3000,()=>{

  console.log(
    "PlayStoreX API запущен"
  );

});