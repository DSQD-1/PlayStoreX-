export default function ProductCard({ product }) {
  return (
    <div className="card">

      {product.image ? (
        <img 
          src={product.image}
          alt={product.title}
        />
      ) : (
        <div>
          🎮
        </div>
      )}

      <h3>
        {product.title}
      </h3>

      <p>
        {product.game} • {product.category}
      </p>

      <strong>
        {product.price} ₽
      </strong>

      <button>
        Купить
      </button>

    </div>
  );
}