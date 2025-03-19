class Controller {
  constructor(supplier, customer, view, model) {
    this.supplier = supplier;
    this.customer = customer;
    this.view = view;
    this.model = model;
  }

  handOverOrder(orderData) {
    this.customer.placeOrder(orderData, this.supplier);
    this.view.showAcknowledgment();
  };

  increaseQuantity(element, productName, orderData) {
    if (this.model.isOutOfStock(this.supplier, productName)) {
      return '';
    }

    this.model.addToOrder(this.supplier, productName, orderData, 1);
    this.view.updateCart(element, orderData, 1);
    return element;
  };

  decreaseQuantity(element, productName, orderData) {
    if (+element.innerText === 0) {
      return '';
    }

    this.model.removeFromOrder(this.supplier, productName, orderData, 1);
    this.view.updateCart(element, orderData, -1);

    return element;
  };

  #processCard(fruitsList, orderData) {
    for (const fruit of Object.keys(fruitsList)) {
      const details = this.model.getProductCardData(fruit, fruitsList[fruit].quantity);
      this.view.generateCard({ ...details }, orderData, this.supplier);
    }
  };

  fruitManagement() {
    const orderData = {};
    const fruitsList = this.supplier.inventory;
    const submitOrder = document.querySelector("#submit");
    this.#processCard(fruitsList, orderData);
    submitOrder.onclick = () => this.handOverOrder(orderData);
    document.querySelector("#reload").onclick = () => location.reload();
  };
}
const controller = new Controller(new Vendor(fruits()), new Customer("bro"), new View(), new Model());
globalThis.onload = () => controller.fruitManagement();