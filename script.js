const fruits = () => ({
  apple: {
    quantity: 10,
  },
});

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

function main() {
  const fruitVendor = new Vendor(fruits());
  fruitVendor.order();
  fruitVendor.ordersPlaced();
  fruitVendor.inventory();
}

main();
