import { discountRules, products } from ".";
import Checkout from "./Checkout";

const readline = require("readline");

async function cmdline() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let availableProductSkus: string = ``;
  products.forEach((product) => {
    availableProductSkus += product.sku + ",";
  });

  function askQuestion(query: string) {
    return new Promise((resolve) => {
      rl.question(query, resolve);
    });
  }

  const orderItems: OrderItem[] = [];
  const checkout = new Checkout(discountRules);

  getProductsAndQuantity();

  async function getProductsAndQuantity() {
    const sku: any = await askQuestion(
      `Enter the SKU:\nAvailable SKUs --- ${availableProductSkus}\n`
    );
    const orderQuantity = await askQuestion("Enter the quantity\n");

    orderItems.push({ sku: sku, quantity: Number(orderQuantity) });
    const action = await askQuestion(
      `Type BUY to checkout, ADD to add more items\n`
    );
    if (action == "ADD") {
      await getProductsAndQuantity();
    }
    if (action == "BUY") {
      rl.close();

      orderItems.forEach((orderItem) => {
        checkout.scan(orderItem);
      });

      console.log("Total is " + checkout.total());
    } else {
      rl.close();
    }
  }
}

cmdline();
