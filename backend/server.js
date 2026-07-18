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
app.get("/users/:telegramId/balance", (req, res) => {

  const user = users.find(
    u => u.telegramId === req.params.telegramId
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


app.post("/users/:telegramId/balance", (req, res) => {

  const user = users.find(
    u => u.telegramId === req.params.telegramId
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