import { Customer } from './customer';
import { Product } from './product';

export interface Order {
  readonly _id: string;
  customer?: string | Customer;
  toName: string;
  toPhone: string;
  toEmail: string;
  toAddress: string;
  toNote?: string;
  products: OrderProduct[];
  totalProductsPrice: number;
  shippingMethod: string;
  shippingStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  companyName?: string;
  companyAddress?: string;
  companyTaxNumber?: string;
  createdAt: Date;
}

export interface OrderProduct {
  readonly _id: string;
  product: string | Product;
  name: string;
  price: number;
  amount: number;
  size: string;
  image: string;
}
