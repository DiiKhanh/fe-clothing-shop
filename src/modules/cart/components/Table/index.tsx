import { ChangeEvent, useEffect, useState } from 'react';
import { selectCartProducts } from '@/redux/slices/cart';
import { useAppSelector } from '@/hooks/useAppSelector';
import { CartItem } from '@/types/customer';
import { Product } from '@/types/product';
import useCart from '@/hooks/useCart';
import { SORT_ORDER } from '@/utils/constants';
import CartTableView from './view';

function CartTable() {
  const [order, setOrder] = useState<'asc' | 'desc'>(SORT_ORDER.ASC);
  const [orderBy, setOrderBy] = useState('price');
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [page, setPage] = useState(0);
  const cartProducts = useAppSelector(selectCartProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>(cartProducts);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { handleRemoveAllFromCart } = useCart();

  useEffect(() => {
    setCartItems(cartProducts);
  }, [cartProducts]);

  const handleDelete = (onSuccess: Function) => {
    const restRows = cartItems.filter(
      (row) =>
        selectedItems.findIndex(
          (item) => (item.productId as Product)._id === (row.productId as Product)._id && item.size === row.size,
        ) === -1,
    );

    setCartItems(restRows);
    setSelectedItems([]);

    handleRemoveAllFromCart(restRows, selectedItems, onSuccess);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedItems(cartItems);
      return;
    }
    setSelectedItems([]);
  };

  const handleSelectItem = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: CartItem) => {
    const selectedIndex = selectedItems.findIndex((item) => item._id === row._id && item.size === row.size);
    let newSelected: CartItem[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedItems, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedItems.slice(1));
    } else if (selectedIndex === selectedItems.length - 1) {
      newSelected = newSelected.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selectedItems.slice(0, selectedIndex), selectedItems.slice(selectedIndex + 1));
    }

    setSelectedItems(newSelected);
  };

  const handleSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === SORT_ORDER.ASC;
    setOrder(isAsc ? SORT_ORDER.DESC : SORT_ORDER.ASC);
    setOrderBy(property);
  };

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <CartTableView
      cartItems={cartItems}
      selectedItems={selectedItems}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      onDelete={handleDelete}
      onSelect={handleSelectItem}
      onSelectAll={handleSelectAll}
      onSort={handleSort}
      order={order}
      orderBy={orderBy}
      page={page}
      rowsPerPage={rowsPerPage}
    />
  );
}

export default CartTable;
