export interface CartPayload {
  productId: string;
  size: string;
  quantity?: number;
}

export interface RemovedCartItem {
  productId: string;
  size: string;
}

export interface RemovedCartItemPayload {
  items: RemovedCartItem[];
}
