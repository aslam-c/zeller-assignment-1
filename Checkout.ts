import { products } from ".";

export default class Checkout {
  private totalAmount: number = 0;
  private discountRules;

  constructor(discountRules: DiscountRule[]) {
    this.discountRules = discountRules;
  }

  public total(): number {
    return this.totalAmount;
  }

  public scan(item: OrderItem) {
    const product: any = products.find((product) => {
      return product.sku == item.sku;
    });

    const isDiscountExistForItem = this.discountRules.find(
      (discountItem) => discountItem.sku == item.sku
    );
    if (isDiscountExistForItem) {
      if (isDiscountExistForItem.discount_type == "quantity") {
        const currentQuantity = item.quantity;

        const eligibleDiscountQuantity = Math.floor(
          currentQuantity / isDiscountExistForItem?.meta?.quantity_needs_to_met
        );
        const actualQuantityToBePaid =
          currentQuantity - eligibleDiscountQuantity;

        this.totalAmount += actualQuantityToBePaid * product?.price;
      }

      if (isDiscountExistForItem.discount_type == "quantity_exceeds") {
        const currentQuantity = item.quantity;
        const eligibleDiscountQuantity =
          isDiscountExistForItem.meta.quantity_needs_to_met;
        if (currentQuantity > eligibleDiscountQuantity) {
          const discount_price = isDiscountExistForItem.meta.discount_price;
          this.totalAmount += currentQuantity * discount_price;
        } else {
          this.totalAmount += currentQuantity * product?.price;
        }
      }
    } else {
      this.totalAmount += product.price * item.quantity;
    }
  }
}
