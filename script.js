const fruits = () => ({
  apple: {
    quantity: 10,
  },
});

function main() {
  const fruitVendor = new Vendor(fruits());
  fruitVendor.order();
  fruitVendor.ordersPlaced();
  fruitVendor.inventory();
}

main();
