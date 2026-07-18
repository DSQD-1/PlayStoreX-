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

  function createProduct() {
    alert(
      `Товар: ${title}\nЦена: ${price}₽`
    );
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