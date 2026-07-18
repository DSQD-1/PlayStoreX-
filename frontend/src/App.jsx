import { useEffect, useState } from "react";
import { initTelegram } from "./telegram.js";
import ProductCard from "./components/ProductCard.jsx";
import AddProduct from "./components/AddProduct.jsx";
import { games } from "./data/games.js";

export default function App() {

  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [productsList, setProductsList] = useState([]);
  const [sellOpen, setSellOpen] = useState(false);


  useEffect(() => {

    const telegram = initTelegram();
    setUser(telegram.user);


    fetch("https://playstorex-3qb3.onrender.com/products")
      .then(res => res.json())
      .then(data => {
        setProductsList(data);
      })
      .catch(() => {
        setProductsList([]);
      });

  }, []);


  return (

    <div className="app">

      <h1>🎮 PlayStoreX</h1>


      {page === "home" && (
        <>
          <h2>Добро пожаловать 👋</h2>

          {user ? (
            <p>
              Привет, {user.first_name}
            </p>
          ) : (
            <p>
              Игровой маркетплейс
            </p>
          )}


          <h2>🔥 Популярные игры</h2>

          <div className="cards">

          {games.map(game => (

            <div className="card" key={game.id}>

              <h3>
                {game.icon} {game.name}
              </h3>

              <p>
                {game.categories.join(", ")}
              </p>

            </div>

          ))}

          </div>
        </>
      )}



      {page === "catalog" && (

        <>

        <h2>🛒 Каталог</h2>

        <div className="cards">

        {productsList.map(product => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

        </div>

        </>

      )}



      {page === "profile" && (

        <>

        <h2>👤 Профиль</h2>

        {user ? (
          <p>
            {user.first_name}
          </p>
        ) : (
          <p>
            Открой через Telegram
          </p>
        )}

        <button onClick={() => setSellOpen(true)}>
          ➕ Продать товар
        </button>


        {sellOpen && (
          <AddProduct />
        )}

        </>

      )}



      <nav className="menu">

        <button onClick={() => setPage("home")}>
          🏠
        </button>


        <button onClick={() => setPage("catalog")}>
          🛒
        </button>


        <button>
          🎁
        </button>


        <button>
          📰
        </button>


        <button onClick={() => setPage("profile")}>
          👤
        </button>

      </nav>


    </div>

  );

}