import { useState } from "react";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  function createProduct() {
    alert(
      `Товар создан: ${title} за ${price}₽`
    );
  }

  return (
    <div className="card">

      <h2>
        ➕ Продать товар
      </h2>

      <input
        placeholder="Название товара"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Цена"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={createProduct}>
        Создать
      </button>

    </div>
  );
}