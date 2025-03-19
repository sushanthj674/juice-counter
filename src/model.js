class Model {
  getProductCardData(name) {
    const heading = name;
    const imageUrl = `https://www.archanaskitchen.com//images/archanaskitchen/World_Beverages/Mulled_Apple_Juice_Recipe-1.jpg`;
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