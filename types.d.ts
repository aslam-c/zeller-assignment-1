interface Product {
  sku: string;
  name: string;
  price: number;
}

interface DiscountRule {
  sku: string;
  quantity: number;
  discount_type: string;
  meta: any;
}

interface OrderItem {
  sku: string;
  quantity: number;
}
