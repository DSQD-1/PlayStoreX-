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
              Игровой маркетплейс в Telegram
            </p>
          )}



          <h2>🔥 Игры</h2>

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

            {productsList.length > 0 ? (

              productsList.map(product => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))

            ) : (

              <div className="card">
                <h3>
                  Товаров пока нет
                </h3>
              </div>

            )}

          </div>

        </>

      )}






      {page === "giveaways" && (

        <>

          <h2>🎁 Розыгрыши</h2>


          <div className="card">

            <h3>
              Скоро запуск
            </h3>

            <p>
              Здесь будут бесплатные розыгрыши игр и предметов.
            </p>

          </div>

        </>

      )}






      {page === "news" && (

        <>

          <h2>📰 Новости</h2>


          <div className="card">

            <h3>
              PlayStoreX запущен 🚀
            </h3>

            <p>
              Следите за обновлениями.
            </p>

          </div>

        </>

      )}






      {page === "profile" && (

        <>

          <h2>👤 Профиль</h2>


          <div className="card">

            {user ? (

              <>
                <h3>
                  {user.first_name}
                </h3>

                <p>
                  Telegram ID: {user.id}
                </p>
              </>

            ) : (

              <p>
                Открой приложение через Telegram
              </p>

            )}

          </div>



          <button onClick={() => setSellOpen(!sellOpen)}>
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


        <button onClick={() => setPage("giveaways")}>
          🎁
        </button>


        <button onClick={() => setPage("news")}>
          📰
        </button>


        <button onClick={() => setPage("profile")}>
          👤
        </button>


      </nav>



    </div>

  );

}