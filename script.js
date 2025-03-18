const fruits = () => ({
  apple: {
    quantity: 10,
  },
  banana: {
    quantity: 12,
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

  requestOrder(order) {
    this.#orders.push({ ...order });
    for (const [itemName, quantity] of Object.entries(order.order)) {
      this.#reduceQuantityOf(itemName, quantity);
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

// const main = () => {
//   const vendor = new Vendor(fruits());
//   console.log("available items ", vendor.inventory);

//   const customer1 = new Customer("akash");
//   const customer2 = new Customer("siddha");
//   const customer3 = new Customer("pradeep");

//   customer1.placeOrder({ apple: 2 }, vendor);
//   customer2.placeOrder({ banana: 5 }, vendor);
//   customer3.placeOrder({ banana: 5 }, vendor);
//   console.log("available items ", vendor.inventory);
//   console.log("ordersplaced:", vendor.ordersPlaced);
//   console.log('siddha orders' ,customer2.getOrders);
  
// };

// main();
