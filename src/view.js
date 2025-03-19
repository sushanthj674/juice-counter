class View {
  #createOrderSummary(orderData, cartItems) {
    for (const name in orderData) {
      if (orderData[name] > 0) {
        const itemSummary = document.createElement("p");
        itemSummary.innerText = `${name} : ${orderData[name]}`;
        cartItems.appendChild(itemSummary);
      }
    }

    return cartItems;
  };

  #renderCart(cartItems) {
    const existingCart = document.querySelector(".cart-items");
    existingCart.innerHTML = '';
    if (existingCart) {
      existingCart.replaceWith(cartItems);
    } else {
      document.body.appendChild(cartItems);
    }
  };

  #addCartItems(orderData) {
    const cartItems = document.createElement("div");
    cartItems.setAttribute("class", "cart-items");
    this.#createOrderSummary(orderData, cartItems);
    this.#renderCart(cartItems);
  };

  updateCart(element, orderData, quantity) {
    element.innerText = +element.innerText + quantity;
    this.#addCartItems(orderData);
  };

  #createIncrementButton(countElement, heading, orderData) {
    const plusButton = document.createElement("button");
    plusButton.innerText = "+";
    plusButton.onclick = () => controller.addItemToCart(countElement, heading, orderData);

    return plusButton;
  };

  #createDecrementButton(countElement, heading, orderData) {
    const minusButton = document.createElement("button");
    minusButton.onclick = () => controller.removeItemFromCart(countElement, heading, orderData);
    minusButton.innerText = "-";

    return minusButton;
  };

  #createQuantityElement() {
    const quantity = document.createElement("p");
    quantity.innerText = "0";

    return quantity;
  };

  #createQuantityContainer() {
    const quantityDiv = document.createElement("div");
    quantityDiv.setAttribute("class", "quantity-container");

    return quantityDiv;
  };

  #generateQuantityControls(heading, orderData) {
    const countElement = this.#createQuantityElement();
    const quantityDiv = this.#createQuantityContainer();
    quantityDiv.appendChild(this.#createDecrementButton(countElement, heading, orderData));
    quantityDiv.appendChild(countElement);
    quantityDiv.appendChild(this.#createIncrementButton(countElement, heading, orderData));

    return quantityDiv;
  };

  generateCard({ heading, imageUrl }, orderData) {
    const mainContainer = document.querySelector("main");
    const cardElement = document.createElement("div");
    cardElement.setAttribute("class", "card");
    cardElement.appendChild(this.#createHeading(heading));
    cardElement.appendChild(this.#createImage(imageUrl));
    cardElement.appendChild(this.#generateQuantityControls(heading, orderData));

    mainContainer.appendChild(cardElement);
  };

  showAcknowledgment() {
    document.querySelector(".acknowledge").style.display = "flex";
    document.querySelector(".content").style.filter = "blur(3px)";

  };

  hideAcknowledgment() {
    document.querySelector(".acknowledge").style.display = "none";
    document.querySelector(".content").style.filter = "blur(0px)";
  };
  #createHeading(heading) {
    const header = document.createElement("h2");
    header.innerText = heading;

    return header;
  };

  #createImage(imageUrl) {
    const image = document.createElement("img");
    image.src = imageUrl;

    return image;
  };
}