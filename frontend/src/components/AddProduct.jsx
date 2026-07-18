import { useState } from "react";
import { robloxGames } from "../data/robloxGames.js";

export default function AddProduct() {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [game, setGame] = useState("");
  const [description, setDescription] = useState("");


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

      price: Number(price),

      image,

      game,

      description

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



    alert("✅ Товар добавлен");


    setTitle("");
    setPrice("");
    setImage("");
    setGame("");
    setDescription("");

  }




  return (

    <div className="card">


      <h2>
        ➕ Продать товар
      </h2>



      <select
        value={game}
        onChange={(e)=>setGame(e.target.value)}
      >

        <option>
          Выберите игру
        </option>


        {robloxGames.map((item)=>(

          <option key={item}>
            {item}
          </option>

        ))}


      </select>




      {image && (

        <img
          src={image}
          alt="preview"
          style={{
            width:"100%",
            borderRadius:"20px",
            marginTop:"15px"
          }}
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
        onChange={(e)=>setTitle(e.target.value)}
      />



      <input
        placeholder="Цена ₽"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
      />



      <textarea
        placeholder="Описание"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
      />



      <button onClick={createProduct}>
        Создать товар
      </button>



    </div>

  );

}