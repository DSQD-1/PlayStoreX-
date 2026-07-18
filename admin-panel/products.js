let products = [];

function addProduct(product) {
  products.push(product);
}

function removeProduct(id) {
  products = products.filter(
    product => product.id !== id
  );
}

function getProducts() {
  return products;
}

export {
  addProduct,
  removeProduct,
  getProducts
};