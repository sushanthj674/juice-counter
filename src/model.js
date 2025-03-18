class Model {
  fetchCardDetails(name) {
    const heading = name;
    const imageUrl = `https://www.archanaskitchen.com//images/archanaskitchen/World_Beverages/Mulled_Apple_Juice_Recipe-1.jpg`;
    return { heading, imageUrl };
  };

  updateQuantity(vendor, fruitName, orderElements, quantity) {
    if (!orderElements[fruitName]) {
      orderElements[fruitName] = 0;
    }
    vendor.reduceQuantityOf(fruitName, 1);
    orderElements[fruitName] += quantity;
  };

  incrementQuantity(vendor, fruitName, orderElements, quantity) {
    vendor.increaseQuantityOf(fruitName, 1);

    orderElements[fruitName] -= quantity;
  };

  canAddMore(vendor, fruitName) {
    return vendor.inventory[fruitName].quantity < 1;
  }
}