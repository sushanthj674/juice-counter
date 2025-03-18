class View {
  #generateOrderSummary(orderElements, cartIteams) {
    for (const name of Object.keys(orderElements)) {
      if (orderElements[name] > 0) {
        const para = document.createElement("p");
        para.innerText = `${name} : ${orderElements[name]}`;
        cartIteams.appendChild(para);
      }
    }

    return cartIteams;
  };

  #displayIteams(cartIteams) {
    const existingCart = document.querySelector(".cart-iteams");
    if (existingCart) {
      existingCart.replaceWith(cartIteams);
    } else {
      document.body.appendChild(cartIteams);
    }
  };

  #addCartItems(orderElements) {
    const cartIteams = document.createElement("div");
    cartIteams.setAttribute("class", "cart-iteams");
    this.#generateOrderSummary(orderElements, cartIteams);
    this.#displayIteams(cartIteams);
  };

  updateCart(element, orderElements, quantity) {
    element.innerText = +element.innerText + quantity;
    this.#addCartItems(orderElements);
  };

  #constructPlusButton(count, heading, orderElements) {
    const plusButton = document.createElement("button");
    plusButton.innerText = "+";
    plusButton.onclick = () => controller.increaseQuantity(count, heading, orderElements);

    return plusButton;
  };

  #constructMinusButton(count, heading, orderElements) {
    const minusButton = document.createElement("button");
    minusButton.onclick = () => controller.decreaseQuantity(count, heading, orderElements);
    minusButton.innerText = "-";

    return minusButton;
  };

  #quantityCount() {
    const quantity = document.createElement("p");
    quantity.innerText = "0";

    return quantity;
  };

  #constructDiv() {
    const quantityDiv = document.createElement("div");
    quantityDiv.setAttribute("class", "quantityBlock");

    return quantityDiv;
  };

  #fetchQuantity(heading, orderElements) {
    const count = this.#quantityCount();
    const quantityDiv = this.#constructDiv();
    quantityDiv.appendChild(this.#constructMinusButton(count, heading, orderElements));
    quantityDiv.appendChild(count);
    quantityDiv.appendChild(this.#constructPlusButton(count, heading, orderElements));

    return quantityDiv;
  };

  generateCard({ heading, imageUrl }, orderElements, vendor) {
    const main = document.querySelector("main");
    const div = document.createElement("div");
    div.setAttribute("class", "card");
    div.appendChild(this.#fetchHeader(heading));
    div.appendChild(this.#fetchimage(imageUrl));
    div.appendChild(this.#fetchQuantity(heading, orderElements, vendor));

    main.appendChild(div);
  };

  printResponse() {
    document.querySelector(".acknowledge").style.display = "flex";
    document.querySelector(".content").style.filter = "blur(3px)";

  };

  #fetchHeader(heading) {
    const header = document.createElement("h2");
    header.innerText = heading;

    return header;
  };

  #fetchimage(imageUrl) {
    const image = document.createElement("img");
    image.src = imageUrl;

    return image;
  };
}