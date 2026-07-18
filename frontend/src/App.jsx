export default function App() {
  return (
    <div className="app">
      <h1>🎮 PlayStoreX</h1>

      <p>
        Игровой маркетплейс в Telegram
      </p>

      <div className="cards">
        <div className="card">
          🎁 Roblox
        </div>

        <div className="card">
          🔥 Brawl Stars
        </div>

        <div className="card">
          ⚡ Standoff 2
        </div>
      </div>

      <nav className="menu">
        <button>Главная</button>
        <button>Каталог</button>
        <button>Новости</button>
        <button>Профиль</button>
      </nav>
    </div>
  );
}