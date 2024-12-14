import { useState } from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import Button from '@/common/components/Buttons/Button';
import CountDownTimer from '../CountDownTimer';

type FormOTPViewProps = {
  inputRefs: React.MutableRefObject<HTMLInputElement[]>;
  onKeyUp: (_i: number) => void;
  onCheckEnteredOTP: () => void;
};

function FormOTPView({ inputRefs, onKeyUp, onCheckEnteredOTP }: FormOTPViewProps) {
  const [counterExpired, setCounterExpired] = useState(false);

  return (
    <Box>
      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 3, px: { xs: 0, md: 3 } }}>
        {[...Array(6)].map((_, index) => (
          <TextField
            key={index}
            variant="standard"
            inputProps={{
              maxLength: 1,
              min: 0,
              style: { textAlign: 'center', fontSize: 20 },
              onKeyUp: () => onKeyUp(index),
            }}
            inputRef={(ref: HTMLInputElement) => (inputRefs.current[index] = ref)}
            type="tel"
          />
        ))}
      </Stack>

      {counterExpired ? (
        <Typography sx={{ mt: 6 }}>
          Bạn vẫn chưa nhận được? <strong>Vui lòng thử lại</strong>
        </Typography>
      ) : (
        <CountDownTimer onCounterExpired={() => setCounterExpired(true)} />
      )}

      <Button fullWidth className="mt-8" onClick={onCheckEnteredOTP}>
        Xác nhận
      </Button>
    </Box>
  );
}

export default FormOTPView;
