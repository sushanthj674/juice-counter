const fruits = () => ({
  apple: {
    quantity: 10,
  },
});

class Vendor {
  #availableInventory;
  #orders = [];
  constructor(inventory) {
    this.#availableInventory = { ...inventory };
  }

  availableQuantityOf(juiceName) {
    return this.#availableInventory[juiceName].quantity;
  }

  get inventory() {
    return { ...this.#availableInventory };
  }

  #reduceQuantityOf(itemName, quantity) {
    this.#availableInventory[itemName].quantity -= quantity;
  }

  placeOrder(order) {
    this.#orders.push({ ...order });
    for (const [itemName, quantity] of Object.entries(order.ordered)) {
      this.#reduceQuantityOf(itemName, quantity);
    }
  }

  get ordersPlaced() {
    return this.#orders;
  }
}
