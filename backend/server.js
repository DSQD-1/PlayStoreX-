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



// Категории

app.get("/categories", (req, res) => {

  res.json(categories);

});





// Создание пользователя Telegram

app.post("/users", (req, res) => {


  const telegramUser = req.body;


  const existing = users.find(
    user => user.telegramId === telegramUser.telegramId
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






// Получить баланс

app.get("/users/:telegramId/balance", (req, res) => {


  const user = users.find(
    u => u.telegramId == req.params.telegramId
  );



  if (!user) {

    return res.status(404).json({

      error: "Пользователь не найден"

    });

  }



  res.json({

    balance: user.balance

  });


});







// Пополнить баланс

app.post("/users/:telegramId/balance", (req, res) => {


  const user = users.find(
    u => u.telegramId == req.params.telegramId
  );



  if (!user) {

    return res.status(404).json({

      error: "Пользователь не найден"

    });

  }




  user.balance += Number(req.body.amount);



  res.json({

    balance: user.balance

  });



});









// Создать товар

app.post("/products/create", (req, res) => {


  const product = {


    id: Date.now(),


    sellerId: req.body.sellerId || null,


    title: req.body.title,


    category: req.body.category || "",


    game: req.body.game || "",


    price: Number(req.body.price),


    description: req.body.description || "",


    image: req.body.image || "",


    promoCode: req.body.promoCode || null,


    status: "active",


    createdAt: new Date()



  };



  products.push(product);



  res.json(product);



});








// Все товары

app.get("/products", (req, res) => {


  res.json(products);


});








// Товары конкретного пользователя

app.get("/products/user/:id", (req, res) => {


  const userProducts = products.filter(

    product => product.sellerId == req.params.id

  );



  res.json(userProducts);


});








// Старое создание товара

app.post("/products", (req, res) => {


  const product = {


    id: Date.now(),


    ...req.body


  };



  products.push(product);



  res.json(product);



});








// Заказы

app.post("/orders", (req, res) => {


  const order = {


    id: Date.now(),


    status: "waiting",


    ...req.body


  };



  orders.push(order);



  res.json(order);



});








// Проверка сервера

app.get("/", (req, res) => {


  res.json({

    status: "PlayStoreX API работает"

  });


});








app.listen(3000, () => {


  console.log(
    "PlayStoreX API запущен на порту 3000"
  );


});