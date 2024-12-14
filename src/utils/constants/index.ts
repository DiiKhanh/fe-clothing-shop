export const TRANSPORTATION_COST = 25000;

export const ITEMS_PER_PAGE = 12;

export const MOST_SEARCHED = ['áo', 'áo khoác', 'quần', 'quần jean', 'thể thao', 'tối giản'];

export const paymentMethods = {
  COD: 'Thanh toán khi nhận hàng',
  VNPAY: 'Thanh toán qua VNPay',
};

export const GENDER = {
  male: 'Nam',
  female: 'Nữ',
  other: 'Khác',
};

export interface AppSizes {
  [key: string]: string;
}

export const SIZES = Object.freeze({
  S: 'S',
  M: 'M',
  L: 'L',
  XL: 'XL',
});

export const PROFILE_TABS = Object.freeze({
  ACCOUNT: 'account',
  PURCHASE_HISTORY: 'purchaseHistory',
  ADDRESSES: 'addresses',
  PROMOTIONS: 'promotions',
});

export const SORT_ORDER = Object.freeze({
  DESC: 'desc',
  ASC: 'asc',
});
