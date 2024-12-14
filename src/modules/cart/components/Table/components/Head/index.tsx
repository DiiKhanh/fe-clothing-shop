import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { HEAD_CELLS } from './constants';

type CartTableHeadProps = {
  order: 'asc' | 'desc';
  orderBy: string;
  numSelected: number;
  rowCount: number;
  onSelectAll?: ((_event: React.ChangeEvent<HTMLInputElement>, _checked: boolean) => void) | undefined;
  onSort?: (_event: any, _property: string) => void;
};

function CartTableHead(props: CartTableHeadProps) {
  const { onSelectAll, order, orderBy, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="secondary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAll}
          />
        </TableCell>
        {HEAD_CELLS.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id && order}
            sx={{ fontWeight: 'bold' }}
          >
            {headCell.label.toUpperCase()}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default CartTableHead;
