import { Box, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
import EmptyCart from '../Empty';
import CartTableToolbar from './components/Toolbar';
import CartTableHead from './components/Head';
import { ChangeEvent, useState } from 'react';
import CartTableItem from './components/Item';
import ConfirmModal from '@/common/components/Modal/ConfirmModal';
import { CartItem } from '@/types/customer';

type CartTableViewProps = {
  cartItems: CartItem[];
  selectedItems: CartItem[];
  order: 'asc' | 'desc';
  orderBy: string;
  page: number;
  rowsPerPage: number;
  onSelect: (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>, _row: CartItem) => void;
  onSelectAll: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  onSort: (_event: any, _property: string) => void;
  onChangePage: (_event: React.MouseEvent<HTMLButtonElement> | null, _newPage: number) => void;
  onChangeRowsPerPage: (_event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onDelete: (_onSuccess: Function) => void;
};

function CartTableView({
  cartItems,
  selectedItems,
  order,
  orderBy,
  onSelectAll,
  onSort,
  page,
  rowsPerPage,
  onSelect,
  onChangePage,
  onChangeRowsPerPage,
  onDelete,
}: CartTableViewProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isSelected = (row: CartItem) =>
    selectedItems.findIndex((item) => item._id === row._id && item.size === row.size) !== -1;

  const handleToggleModal = () => {
    setConfirmDelete(!confirmDelete);
  };

  return (
    <>
      <Box sx={{ width: '100%', mt: 6 }}>
        {cartItems.length > 0 && (
          <>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CartTableToolbar numSelected={selectedItems.length} onDelete={handleToggleModal} />
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
                  <CartTableHead
                    numSelected={selectedItems.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAll={onSelectAll}
                    onSort={onSort}
                    rowCount={cartItems.length}
                  />
                  <TableBody>
                    {cartItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                      <CartTableItem key={index} item={row} isItemSelected={isSelected(row)} onClick={onSelect} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={cartItems.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage="Số sản phẩm mỗi trang"
                labelDisplayedRows={({ from, to, count }) => `${from}–${to} trên ${count}`}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
              />
            </Paper>
          </>
        )}
        {cartItems.length === 0 && <EmptyCart />}
      </Box>
      <ConfirmModal
        isOpen={confirmDelete}
        title="Xóa sản phẩm?"
        subTitle="Bạn có chắc muốn xóa sản phẩm chứ?"
        confirmTextBtn="Xóa"
        onClose={handleToggleModal}
        onConfirm={() => onDelete(handleToggleModal)}
      />
    </>
  );
}

export default CartTableView;
