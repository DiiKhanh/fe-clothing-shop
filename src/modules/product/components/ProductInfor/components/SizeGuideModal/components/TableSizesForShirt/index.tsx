import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 12,
    border: `1px solid ${theme.palette.common.black}`,
    textAlign: 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 400,
    border: `1px solid ${theme.palette.grey['600']}`,
    minWidth: '126px',
    textAlign: 'center',
  },
}));

function createData(
  name: string,
  height: string,
  weight: string,
  shoulder: number,
  chest: number,
  waist: number,
  longSleeve: number,
  shortSleeve: number,
  longShirt: number,
) {
  return { name, height, weight, shoulder, chest, waist, longSleeve, shortSleeve, longShirt };
}

const rows = [
  createData('S', '165 - 168', '56 - 62', 43.5, 100, 98, 60.5, 23.5, 70.5),
  createData('M', '169 - 172', '63 - 69', 45, 104, 102, 62, 24, 72),
  createData('L', '173 - 176', '70 - 76', 46.5, 108, 106, 63.5, 24.5, 73.5),
  createData('XL', '177 - 180', '77 - 83', 48, 112, 110, 65, 25, 75),
];

export default function TableSizesForShirt(): React.ReactElement {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption style={{ fontWeight: 400 }}>
          Hầu hết khách hàng của chúng tôi đã chọn đúng size với bảng size này
        </caption>
        <TableHead>
          <TableRow>
            <StyledTableCell>SIZE</StyledTableCell>
            <StyledTableCell>CHIỀU CAO&nbsp;(CM)</StyledTableCell>
            <StyledTableCell>CÂN NẶNG&nbsp;(KG)</StyledTableCell>
            <StyledTableCell>NGANG VAI</StyledTableCell>
            <StyledTableCell>VÒNG NGỰC</StyledTableCell>
            <StyledTableCell>VÒNG EO</StyledTableCell>
            <StyledTableCell>DÀI TAY</StyledTableCell>
            <StyledTableCell>DÀI TAY NGẮN</StyledTableCell>
            <StyledTableCell>DÀI ÁO</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell>{row.height}</StyledTableCell>
              <StyledTableCell>{row.weight}</StyledTableCell>
              <StyledTableCell>{row.shoulder}</StyledTableCell>
              <StyledTableCell>{row.chest}</StyledTableCell>
              <StyledTableCell>{row.waist}</StyledTableCell>
              <StyledTableCell>{row.longSleeve}</StyledTableCell>
              <StyledTableCell>{row.shortSleeve}</StyledTableCell>
              <StyledTableCell>{row.longShirt}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
