"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const Checkout_1 = __importDefault(require("./Checkout"));
const readline = require("readline");
function cmdline() {
    return __awaiter(this, void 0, void 0, function* () {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        let availableProductSkus = ``;
        _1.products.forEach((product) => {
            availableProductSkus += product.sku + ",";
        });
        function askQuestion(query) {
            return new Promise((resolve) => {
                rl.question(query, resolve);
            });
        }
        const orderItems = [];
        const checkout = new Checkout_1.default(_1.discountRules);
        getProductsAndQuantity();
        function getProductsAndQuantity() {
            return __awaiter(this, void 0, void 0, function* () {
                const sku = yield askQuestion(`Enter the SKU:\nAvailable SKUs --- ${availableProductSkus}\n`);
                const orderQuantity = yield askQuestion("Enter the quantity\n");
                orderItems.push({ sku: sku, quantity: Number(orderQuantity) });
                const action = yield askQuestion(`Type BUY to checkout, ADD to add more items\n`);
                if (action == "ADD") {
                    yield getProductsAndQuantity();
                }
                if (action == "BUY") {
                    rl.close();
                    orderItems.forEach((orderItem) => {
                        checkout.scan(orderItem);
                    });
                    console.log("Total is " + checkout.total());
                }
                else {
                    rl.close();
                }
            });
        }
    });
}
cmdline();
