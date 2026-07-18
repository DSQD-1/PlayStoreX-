import { useState } from "react";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

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
        Создать товар
      </button>

    </div>
  );
}