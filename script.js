class Vendor {
  #avaliableInventory;
  #orders = [];
  constructor(inventory) {
    this.#avaliableInventory = { ...inventory };
  }

  avaliableQuatityOf(juiceName) {
    return this.#avaliableInventory[juiceName].quantity;
  }

  get inventory() {
    return { ...this.#avaliableInventory };
  }

  #reduceQuantityOf(itemOrder) {
    const [itemName, quantity] = itemOrder;
    this.#avaliableInventory[itemName].quantity -= quantity;
  }

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
    Object.entries(order.ordered).forEach(this.#reduceQuantityOf);
  }
}
