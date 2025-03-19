class Controller {
  constructor(inventoryManager, buyer, uiManager, dataHandler) {
    this.inventoryManager = inventoryManager;
    this.buyer = buyer;
    this.uiManager = uiManager;
    this.dataHandler = dataHandler;
  }

  finalizeOrder(cartDetails) {
    this.buyer.placeOrder(cartDetails, this.inventoryManager);
    this.uiManager.showAcknowledgment();
  };

  addItemToCart(element, productName, cartDetails) {
    if (this.dataHandler.isOutOfStock(this.inventoryManager, productName)) {
      return '';
    }

    this.dataHandler.addToOrder(this.inventoryManager, productName, cartDetails, 1);
    this.uiManager.updateCart(element, cartDetails, 1);
    return element;
  };

  removeItemFromCart(element, productName, cartDetails) {
    if (+element.innerText === 0) {
      return '';
    }

    this.dataHandler.removeFromOrder(this.inventoryManager, productName, cartDetails, 1);
    this.uiManager.updateCart(element, cartDetails, -1);

    return element;
  };

  #generateProductCards(productInventory, cartDetails) {
    for (const fruit in productInventory) {
      const details = this.dataHandler.getProductCardData(fruit, productInventory[fruit].quantity);
      this.uiManager.generateCard({ ...details }, cartDetails, this.inventoryManager);
    }
  };

  initializeShop() {
    const cartDetails = {};
    const productInventory = this.inventoryManager.inventory;
    const confirmOrderButton = document.querySelector("#submit");
    this.#generateProductCards(productInventory, cartDetails);
    confirmOrderButton.onclick = () => this.finalizeOrder(cartDetails);
    document.querySelector("#reload").onclick = () => location.reload();
  };
}
const controller = new Controller(new Vendor(fruits()), new Customer("bro"), new View(), new Model());
globalThis.onload = () => controller.initializeShop();