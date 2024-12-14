export interface CreateOrderPayload {
  companyAddress?: string;
  companyName?: string;
  companyTaxNumber?: string;
  customerId: string;
  paymentMethod: string;
  products: OrderProductItem[];
  shippingPrice: number;
  toAddress: string;
  toEmail: string;
  toName: string;
  toNote?: string;
  toPhone: string;
  totalPrice: number;
  totalProductsPrice: number;
}

export interface OrderProductItem {
  amount: number;
  image: string;
  name: string;
  price: number;
  product: string;
  size: string;
}

export interface CheckoutOrderPayload {
  orderId: string;
}
