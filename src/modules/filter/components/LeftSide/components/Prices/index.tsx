import { ReactElement, useEffect, useState } from 'react';
import { Collapse, ListItemButton, ListItemText, Slider, Typography } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { printNumberWithCommas } from '@/utils/common';

type FilterPriceProps = {
  priceRange?: number[] | null;
  onChangePriceRange: (_range: number[]) => void;
};

function valuetext(value: number) {
  return `${value}`;
}

const minDistance = 50000;
const initialRange = [100000, 900000];

function FilterPrice({ priceRange, onChangePriceRange }: FilterPriceProps): ReactElement {
  const [range, setRange] = useState(priceRange || initialRange);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (priceRange) {
      setRange(priceRange);
    } else {
      setRange(initialRange);
    }
  }, [priceRange]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleRangeCommitted = () => {
    onChangePriceRange(range);
  };

  const handleRangeChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setRange([Math.min(newValue[0], range[1] - minDistance), range[1]]);
    } else {
      setRange([range[0], Math.max(newValue[1], range[0] + minDistance)]);
    }
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText
          sx={{ '.css-107jk5d-MuiTypography-root': { fontSize: '1.2rem', fontWeight: 500 } }}
          primary="GIÁ TIỀN"
        />

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit sx={{ mt: 2 }}>
        <Slider
          getAriaLabel={() => 'Minimum distance'}
          value={range}
          onChange={handleRangeChange}
          onChangeCommitted={handleRangeCommitted}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
          max={600000}
          min={100000}
          step={minDistance}
        />
        <Typography sx={{ textAlign: 'center', fontWeight: 400 }}>
          {printNumberWithCommas(range[0])} đ - {printNumberWithCommas(range[1])} đ
        </Typography>
      </Collapse>
    </>
  );
}

export default FilterPrice;
