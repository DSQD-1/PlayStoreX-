export default function ProductCard({ product }) {

  return (
    <div className="product-card">

      <div className="product-image">

        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
          />
        ) : (
          <div className="no-image">
            🎮
          </div>
        )}

      </div>


      <div className="product-info">

        <h3>
          {product.title}
        </h3>

        <p className="game">
          {product.game}
        </p>


        <div className="bottom">

          <span className="price">
            {product.price}₽
          </span>

          <button>
            Купить
          </button>

        </div>


      </div>

    </div>
  );
}