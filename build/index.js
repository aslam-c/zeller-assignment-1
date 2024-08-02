"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = exports.discountRules = void 0;
const Checkout_1 = __importDefault(require("./Checkout"));
const readline = require("readline");
exports.discountRules = [
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
exports.products = [
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
const ck = new Checkout_1.default(exports.discountRules);
// ck.scan({ sku: "vga", quantity: 1 });
// ck.scan({ sku: "atv", quantity: 3 });
// console.log("Total is ", ck.total());
