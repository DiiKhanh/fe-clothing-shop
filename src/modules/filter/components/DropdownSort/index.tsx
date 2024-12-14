import React, { MouseEvent, ReactElement, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type FilterSortProps = {
  onSort: (_key: string) => void;
};

const options = [
  { title: 'Giá - Từ cao đến thấp', key: 'priceDesc' },
  { title: 'Giá - Từ thấp đến cao', key: 'priceAsc' },
  { title: 'Bán chạy nhất', key: 'bestSeller' },
];

function FilterSort({ onSort }: FilterSortProps): ReactElement {
  const [anchorEl, setAnchorEl] = useState<Element | ((_element: Element) => Element) | null | undefined>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);

    onSort(options[index].key);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Typography
        id="lock-button"
        aria-haspopup="listbox"
        aria-controls="lock-menu"
        aria-label="when device is locked"
        sx={{ my: 1, cursor: 'pointer', fontWeight: 500, textTransform: 'uppercase', fontSize: '0.9rem' }}
        onClick={handleClickListItem}
      >
        Sắp xếp theo: {options[selectedIndex].title} <KeyboardArrowDownIcon />
      </Typography>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option.key}
            selected={index === selectedIndex}
            sx={{ paddingX: 3, fontWeight: 400, textTransform: 'uppercase' }}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default FilterSort;
