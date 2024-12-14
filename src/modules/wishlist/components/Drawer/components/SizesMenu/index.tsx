import React, { MouseEvent, ReactElement, useImperativeHandle, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ProductSize } from '@/types/product';

export type WishlistSizesMenuRef = {
  getSelectedSize: () => string;
};

type WishlistSizesMenuProps = {
  sizes: ProductSize[];
  onSizeChange: (_isSoldOut: boolean) => void;
};

export default React.forwardRef<WishlistSizesMenuRef | undefined, WishlistSizesMenuProps>(function WishlistSizesMenu(
  { sizes, onSizeChange },
  ref,
): ReactElement {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);

  useImperativeHandle(ref, () => ({
    getSelectedSize: () => {
      return sizes[selectedIndex].name;
    },
  }));

  const handleClickListItem = (event: MouseEvent<HTMLSpanElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: MouseEvent, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);

    const selectedSize = sizes[index];
    const isSoldOut = selectedSize.quantity - selectedSize.sold === 0;
    onSizeChange(isSoldOut);
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
        sx={{ my: 1, cursor: 'pointer' }}
        onClick={handleClickListItem}
      >
        Size: {sizes[selectedIndex].name} <KeyboardArrowDownIcon />
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
        {sizes.map((size, index) => (
          <MenuItem
            key={size._id}
            selected={index === selectedIndex}
            sx={{ paddingX: 3 }}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {size.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
});
