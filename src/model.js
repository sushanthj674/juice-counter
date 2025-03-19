class Model {
  getProductCardData(name) {
    const heading = name;
    const imageUrl = `..\\images\\${name.replaceAll(" ", "_")}.jpeg`;
    return { heading, imageUrl };
  };

  addToOrder(supplier, productName, cartItems, amount) {
    if (!cartItems[productName]) {
      cartItems[productName] = 0;
    }
    supplier.reduceQuantityOf(productName, 1);
    cartItems[productName] += amount;
  };

  removeFromOrder(supplier, productName, cartItems, amount) {
    supplier.increaseQuantityOf(productName, 1);

    cartItems[productName] -= amount;
  };

  isOutOfStock(supplier, productName) {
    return supplier.inventory[productName].quantity < 1;
  }
}