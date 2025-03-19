const fruits = () => ({
  "apple juice": {
    quantity: 3,
  },
  "banana juice": {
    quantity: 12,
  },
  "pineapple juice": {
    quantity: 12,
  },
  "watermelon juice": {
    quantity: 15
  }
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
  reduceQuantityOf(itemName, quantity) {
    this.#availableInventory[itemName].quantity -= quantity;
  }
  increaseQuantityOf(itemName, quantity) {
    this.#availableInventory[itemName].quantity += quantity;
  }
  requestOrder(order) {
    this.#orders.push({ ...order });
    for (const [itemName, quantity] of Object.entries(order.order)) {
      this.reduceQuantityOf(itemName, quantity);
    }
    return true;
  }
  get ordersPlaced() {
    return this.#orders;
  }
}

class Customer {
  #name;
  #myOrders = [];
  constructor(name) {
    this.#name = name;
  }
  get getOrders() {
    return this.#myOrders;
  }
  placeOrder(order, vendor) {
    const response = vendor.requestOrder({ order, orderedBy: this.#name });
    if (!response) return false;
    this.#myOrders.push({ ...order });
    return true;
  }
}