class Vendor {
  #avaliableInventory;
  #orders = [];
  constructor(inventory) {
    this.#avaliableInventory = { ...inventory };
  }

  avaliableQuatityOf(juiceName) {
    return this.#avaliableInventory[juiceName].quantity;
  }

  inventory() {
    return { ...this.#avaliableInventory };
  }
  reduceQuantityOf(itemName, quantity) {}
  placeOrder(order) {
    /* {
      ordered:{
        fruit:quantity,
        fruit:quantity,
        fruit:quantity,
      },
      orderedBy :'name'
    }*/
    this.#orders.push({ ...order });
    // [frt, qnty]
    Object.entries(order.ordered).forEach(reduceQuantityOf);
  }
}
