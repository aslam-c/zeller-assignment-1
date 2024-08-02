import Checkout from "./Checkout";
const readline = require("readline");

export const discountRules: DiscountRule[] = [
  {
    sku: "atv",
    quantity: 3,
    discount_type: "quantity",
    meta: { quantity_needs_to_met: 3, discount_price: 1 }
  },
  {
    sku: "ipd",
    quantity: 4,
    discount_type: "quantity_exceeds",
    meta: { quantity_needs_to_met: 4, discount_price: 499.99 }
  }
];

export const products: Product[] = [
  {
    sku: "ipd",
    name: "Super iPad",
    price: 549.99
  },
  {
    sku: "mbp",
    name: "Macbook Pro",
    price: 1399.99
  },

  {
    sku: "atv",
    name: "Apple TV",
    price: 109.5
  },
  {
    sku: "vga",
    name: "VGA adapter",
    price: 30.0
  }
];

const ck = new Checkout(discountRules);

// ck.scan({ sku: "vga", quantity: 1 });
// ck.scan({ sku: "atv", quantity: 3 });

// console.log("Total is ", ck.total());
