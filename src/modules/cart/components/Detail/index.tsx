import React from 'react';
import { selectCartProducts } from '@/redux/slices/cart';
import { CartItem } from '@/types/customer';
import { useAppSelector } from '@/hooks/useAppSelector';
import DetailCartView from './view';

function DetailCart() {
  const products = useAppSelector<CartItem[]>(selectCartProducts);
  return <DetailCartView products={products} />;
}

export default DetailCart;
