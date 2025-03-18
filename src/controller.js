class Controller {
  constructor(vendor, customer, view, model) {
    this.vendor = vendor;
    this.customer = customer;
    this.view = view;
    this.model = model;
  }

  handOverOrder(orderElements) {
    this.customer.placeOrder(orderElements, this.vendor);
    this.view.printResponse();
  };

  increaseQuantity(element, fruitName, orderElements) {
    if (this.model.canAddMore(this.vendor, fruitName)) {
      return '';
    }

    this.model.updateQuantity(this.vendor, fruitName, orderElements, 1);
    this.view.updateCart(element, orderElements, 1);
    return element;
  };

  decreaseQuantity(element, fruitName, orderElements) {
    if (+element.innerText === 0) {
      return '';
    }

    this.model.incrementQuantity(this.vendor, fruitName, orderElements, 1);
    this.view.updateCart(element, orderElements, -1);

    return element;
  };

  #processCard(fruitsList, orderElements) {
    for (const fruit of Object.keys(fruitsList)) {
      const details = this.model.fetchCardDetails(fruit, fruitsList[fruit].quantity);
      this.view.generateCard({ ...details }, orderElements, this.vendor);
    }
  };

  fruitManagement() {
    const orderElements = {};
    const fruitsList = this.vendor.inventory;
    const submitOrder = document.querySelector("#submit");
    this.#processCard(fruitsList, orderElements);
    submitOrder.onclick = () => this.handOverOrder(orderElements);
    document.querySelector("#reload").onclick = () => location.reload();
  };
}
const controller = new Controller(new Vendor(fruits()), new Customer("bro"), new View(), new Model());
window.onload = () => controller.fruitManagement();