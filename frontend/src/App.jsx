import AddProduct from "./components/AddProduct.jsx";
import ProductCard from "./components/ProductCard.jsx";
import { games } from "./data/games.js";
import { useEffect, useState } from "react";
import { initTelegram } from "./telegram.js";

export default function App() {
  const [user, setUser] = useState(null);
  const [productsList, setProductsList] = useState([]);
const [sellOpen, setSellOpen] = useState(false);
useEffect(() => {
  const telegram = initTelegram();
  setUser(telegram.user);

  fetch("http://localhost:3000/products")
    .then(res => res.json())
    .then(data => {
      setProductsList(data);
    });

}, []);
  return (
    <div className="app">
      <h1>🎮 PlayStoreX</h1>
<button onClick={() => setSellOpen(true)}>
  🛒 Продать товар
</button>
      {user ? (
        <p>Привет, {user.first_name} 👋</p>
      ) : (
        <p>Игровой маркетплейс в Telegram</p>
      )}

     <div className="cards">
  {games.map((game) => (
    <div className="card" key={game.id}>
      <h2>
        {game.icon} {game.name}
      </h2>

      <p>
        Категории:
      </p>

      {game.categories.map((category) => (
        <span key={category}>
          {category} 
        </span>
      ))}
    </div>
  ))}
</div>
<h2>🔥 Товары</h2>

<div className="cards">
  {productsList.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
    />
  ))}
</div>
<AddProduct />
<nav className="menu">
  <button>🏠 Главная</button>
  <button>🛒 Каталог</button>
  <button>🎁 Розыгрыши</button>
  <button>📰 Новости</button>
  <button>👤 Профиль</button>
</nav>