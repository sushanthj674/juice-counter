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
  reduceQuantityOf(itemName, quantity) { }
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