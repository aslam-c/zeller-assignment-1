"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Checkout_1 = __importDefault(require("../Checkout"));
test("Test checkout logic", () => {
    const ck = new Checkout_1.default(__1.discountRules);
    ck.scan({ sku: "vga", quantity: 1 });
    ck.scan({ sku: "atv", quantity: 3 });
    expect(ck.total()).toBe(249);
});
