"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const Checkout = require("./Checkout");
test("Test checkout logic", () => {
    const ck = new Checkout(_1.discountRules);
    ck.scan({ sku: "vga", quantity: 1 });
    ck.scan({ sku: "atv", quantity: 3 });
    expect(ck.total()).toBe(249);
});
