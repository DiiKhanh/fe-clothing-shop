import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

type CountDownTimerProps = {
  onCounterExpired: () => void;
};

function CountDownTimer({ onCounterExpired }: CountDownTimerProps) {
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(interval);
          onCounterExpired();
          return 0;
        }
        return prevCounter - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onCounterExpired]);

  return (
    <Typography sx={{ mt: 5 }}>
      Bạn vui lòng chờ trong {counter} giây để có thể nhận lại mã
    </Typography>
  );
}

export default CountDownTimer;
