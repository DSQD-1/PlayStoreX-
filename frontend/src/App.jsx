import { useEffect, useState } from "react";
import { initTelegram } from "./telegram.js";
import ProductCard from "./components/ProductCard.jsx";
import AddProduct from "./components/AddProduct.jsx";
import { games } from "./data/games.js";


export default function App() {

  const [user, setUser] = useState(null);

  const [page, setPage] = useState("home");

  const [productsList, setProductsList] = useState([]);

  const [myProducts, setMyProducts] = useState([]);

  const [balance, setBalance] = useState(0);

  const [sellOpen, setSellOpen] = useState(false);



  useEffect(() => {


    const telegram = initTelegram();


    setUser(telegram.user);



    // Создание пользователя Telegram

    if (telegram.user) {


      fetch(
        "https://playstorex-3qb3.onrender.com/users",
        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },


          body: JSON.stringify({

            telegramId: telegram.user.id,

            username: telegram.user.username || "",

            firstName: telegram.user.first_name || ""

          })


        }
      );

    }




    // Получаем товары

    fetch(
      "https://playstorex-3qb3.onrender.com/products"
    )

    .then(res => res.json())

    .then(data => {

      setProductsList(data);

    });





    if (telegram.user) {



      // Баланс


      fetch(
        `https://playstorex-3qb3.onrender.com/users/${telegram.user.id}/balance`
      )

      .then(res => res.json())

      .then(data => {

        if(data.balance !== undefined){

          setBalance(data.balance);

        }

      });





      // Мои товары


      fetch(
        `https://playstorex-3qb3.onrender.com/products/user/${telegram.user.id}`
      )

      .then(res => res.json())

      .then(data => {

        setMyProducts(data);

      });


    }



  }, []);






  return (

    <div className="app">



      <h1>
        🎮 PlayStoreX
      </h1>





      {page === "home" && (

        <>

        <h2>
          Главная
        </h2>


        <p>
          Игровой маркетплейс
        </p>



        <h2>
          🎮 Игры
        </h2>


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


        <h2>
          🛒 Каталог
        </h2>



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


        <h2>
          👤 Профиль
        </h2>



        <div className="card">


        {user ? (

          <>


          <h3>
            👋 {user.first_name}
          </h3>


          <p>
            Telegram ID: {user.id}
          </p>


          <h2>
            💰 {balance} ₽
          </h2>



          <button>
            Пополнить
          </button>


          </>


        ) : (

          <p>
            Пользователь не найден
          </p>

        )}



        </div>






        <h2>
          📦 Мои товары
        </h2>



        {myProducts.map(product => (


          <div className="card" key={product.id}>


            <img

              src={product.image}

              style={{
                width:"100%",
                borderRadius:"20px"
              }}

            />


            <h3>
              {product.title}
            </h3>


            <p>
              {product.price} ₽
            </p>


            <button>
              ✏️ Изменить
            </button>


            <button>
              🗑 Удалить
            </button>


          </div>


        ))}





        <button
          onClick={() => setSellOpen(!sellOpen)}
        >

          ➕ Добавить товар

        </button>



        {sellOpen && (

          <AddProduct />

        )}



        </>

      )}







      {page === "giveaways" && (

        <>

        <h2>
          🎁 Розыгрыши
        </h2>


        <div className="card">

          Скоро будут розыгрыши

        </div>


        </>

      )}







      {page === "news" && (

        <>

        <h2>
          📰 Новости
        </h2>


        <div className="card">

          Новости PlayStoreX

        </div>


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