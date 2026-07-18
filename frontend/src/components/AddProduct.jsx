import { robloxGames } from "../data/robloxGames.js";
import { useState } from "react";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
const [game, setGame] = useState("");
  function uploadImage(e) {
    const file = e.target.files[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  }
async function createProduct() {

  const product = {
    title,
    price,
    game,
    image,
    description: "",
    promoCode: ""
  };

await fetch(
  "https://playstorex-3qb3.onrender.com/products/create",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  }
);

alert("Товар добавлен!");
  await fetch(
    "http://localhost:3000/products/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    }
  );


  alert("Товар добавлен!");
}

  return (
    <div className="card">

      <h2>
        ➕ Продать товар
      </h2>
<select
  value={game}
  onChange={(e) => setGame(e.target.value)}
>
  <option value="">
    Выберите игру
  </option>

  {robloxGames.map((game) => (
    <option key={game} value={game}>
      {game}
    </option>
  ))}
</select>
      {image && (
        <img
          src={image}
          alt="preview"
          width="150"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
      />
<input
  placeholder="Цена"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
/>

<textarea
  placeholder="Описание товара"
/>

<input
  placeholder="Промокод (необязательно)"
/>
      <button onClick={createProduct}>
        Создать товар
      </button>

    </div>
  );
}