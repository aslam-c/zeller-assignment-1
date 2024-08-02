"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class Checkout {
    constructor(discountRules) {
        this.totalAmount = 0;
        this.discountRules = discountRules;
    }
    total() {
        return this.totalAmount;
    }
    scan(item) {
        var _a;
        const product = _1.products.find((product) => {
            return product.sku == item.sku;
        });
        const isDiscountExistForItem = this.discountRules.find((discountItem) => discountItem.sku == item.sku);
        if (isDiscountExistForItem) {
            if (isDiscountExistForItem.discount_type == "quantity") {
                const currentQuantity = item.quantity;
                const eligibleDiscountQuantity = Math.floor(currentQuantity / ((_a = isDiscountExistForItem === null || isDiscountExistForItem === void 0 ? void 0 : isDiscountExistForItem.meta) === null || _a === void 0 ? void 0 : _a.quantity_needs_to_met));
                const actualQuantityToBePaid = currentQuantity - eligibleDiscountQuantity;
                this.totalAmount += actualQuantityToBePaid * (product === null || product === void 0 ? void 0 : product.price);
            }
            if (isDiscountExistForItem.discount_type == "quantity_exceeds") {
                const currentQuantity = item.quantity;
                const eligibleDiscountQuantity = isDiscountExistForItem.meta.quantity_needs_to_met;
                if (currentQuantity > eligibleDiscountQuantity) {
                    const discount_price = isDiscountExistForItem.meta.discount_price;
                    this.totalAmount += currentQuantity * discount_price;
                }
                else {
                    this.totalAmount += currentQuantity * (product === null || product === void 0 ? void 0 : product.price);
                }
            }
        }
        else {
            this.totalAmount += product.price * item.quantity;
        }
    }
}
exports.default = Checkout;
