import React, { ChangeEvent, ReactElement, useImperativeHandle, useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export type NumberBoxRef = {
  getQuantity: () => number;
  resetQuantity: () => void;
};

type NumberBoxProps = {
  max: number;
  min: number;
};

export default React.forwardRef<NumberBoxRef, NumberBoxProps>(function NumberBox(props, ref): ReactElement {
  const { max, min } = props;
  const [localValue, setLocalValue] = useState(1);

  useImperativeHandle(ref, () => ({
    getQuantity: () => {
      return localValue;
    },
    resetQuantity: () => {
      setLocalValue(1);
    },
  }));

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      setLocalValue(newValue);
    }
  };

  const handleIncrement = () => {
    const newValue = localValue + 1;
    if (newValue <= max) {
      setLocalValue(newValue);
    }
  };

  const handleDecrement = () => {
    const newValue = localValue - 1;
    if (newValue >= min) {
      setLocalValue(newValue);
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        minWidth: '100px',
        maxWidth: '150px',
        height: '50px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '5px',
      }}
    >
      <IconButton onClick={handleDecrement} disabled={localValue <= min}>
        <RemoveIcon />
      </IconButton>
      <input
        className="outline-none"
        value={localValue}
        onChange={handleInputChange}
        type="number"
        style={{ width: '100%', textAlign: 'center' }}
      />
      <IconButton onClick={handleIncrement} disabled={localValue >= max}>
        <AddIcon />
      </IconButton>
    </Stack>
  );
});
