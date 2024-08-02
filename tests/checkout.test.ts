import { discountRules } from "..";
import Checkout from "../Checkout";

test("Test checkout logic", () => {
  const ck = new Checkout(discountRules);

  ck.scan({ sku: "vga", quantity: 1 });
  ck.scan({ sku: "atv", quantity: 3 });

  expect(ck.total()).toBe(249);
});
