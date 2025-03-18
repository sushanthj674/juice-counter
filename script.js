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

const inventory = new Vendor({ "apple": { quantity: 3 } });


const fetchCardDetails = (name, quantity) => {
  console.log(name, quantity);
  const heading = name;
  const imageUrl = `https://www.archanaskitchen.com//images/archanaskitchen/World_Beverages/Mulled_Apple_Juice_Recipe-1.jpg`;
  return { heading, imageUrl };
};

const increaseQuantity = (element, inventory, fruitName) => {
  console.log(inventory.inventory()[fruitName].quantity);
  if (inventory.inventory()[fruitName].quantity < +element.innerText + 1) {
    alert("out of stock");
    return '';
  }
  element.innerText = ++element.innerText;
  return element;
};

const decreaseQuantity = (element) => {
  element.innerText = +element.innerText === 0 ? 0 : --element.innerText;
  return element;
};

const fetchHeader = (heading) => {
  const header = document.createElement("h2");
  header.innerText = heading;
  return header;
};

const fetchimage = (imageUrl) => {
  const image = document.createElement("img");
  image.src = imageUrl;
  return image;
};

const fetchQuantity = (heading) => {
  const quantity = document.createElement("p");
  quantity.innerText = "0";
  const quantityDiv = document.createElement("div");
  quantityDiv.setAttribute("class", "quantityBlock");
  const plusButton = document.createElement("button");
  plusButton.innerText = "+";
  plusButton.onclick = () => increaseQuantity(quantity, inventory, heading);
  const minusButton = document.createElement("button");
  minusButton.onclick = () => decreaseQuantity(quantity, inventory, heading);
  minusButton.innerText = "-";
  quantityDiv.appendChild(minusButton);
  quantityDiv.appendChild(quantity);
  quantityDiv.appendChild(plusButton);

  return quantityDiv;
};

const generateCard = ({ heading, imageUrl }) => {
  const main = document.querySelector("main");
  const div = document.createElement("div");
  div.setAttribute("id", "card");
  div.appendChild(fetchHeader(heading));
  div.appendChild(fetchimage(imageUrl));
  div.appendChild(fetchQuantity(heading));

  main.appendChild(div);
};

const fruitManagement = () => {
  const fruitsList = inventory.inventory();
  console.log(fruitsList);
  Object.keys(fruitsList).map((fruit) => {
    console.log(fruit);
    const details = fetchCardDetails(fruit, fruitsList[fruit].quantity);
    generateCard({ ...details });
  });

};

window.onload = fruitManagement;



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
