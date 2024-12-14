import { Alert, Box, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { ProductSize } from '@/types/product';
import { isSoldOutForEverySize } from '@/utils/product';
import Button from '@/common/components/Buttons/Button';

type SizeResultProps<T> = {
  selectedSize: T;
  productSizes: ProductSize[];
  onChooseSize: (_size: T) => void;
  onChooseAgain: () => void;
};

function SizeResult({
  selectedSize,
  productSizes,
  onChooseSize,
  onChooseAgain,
}: SizeResultProps<string>): ReactElement {
  return (
    <>
      {selectedSize && selectedSize !== 'wrong' && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography id="transition-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center' }}>
            Size phù hợp với bạn
          </Typography>
          <Box sx={{ my: 6 }}>
            <Typography sx={{ px: 4, py: 1, border: '1px solid #111111', display: 'inline-block', fontWeight: 500 }}>
              {selectedSize}
            </Typography>
          </Box>
          {isSoldOutForEverySize(productSizes, selectedSize) ? (
            <Box sx={{ width: { xs: '100%', md: '80%' }, marginX: 'auto' }}>
              <Alert variant="outlined" severity="error">
                Hiện tại size này đã hết hàng, chúng tôi thành thật xin lỗi quý khách
              </Alert>
              <Button className="mt-3" onClick={onChooseAgain}>
                Chọn size khác
              </Button>
            </Box>
          ) : (
            <>
              <Box>
                <Button className="rounded-none px-10 font-medium" onClick={() => onChooseSize(selectedSize)}>
                  Chọn size {selectedSize}
                </Button>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Button className={`rounded-none font-medium !bg-transparent text-gray`} onClick={onChooseAgain}>
                  Tôi muốn chọn size khác
                </Button>
              </Box>
            </>
          )}
        </Box>
      )}

      {selectedSize && selectedSize === 'wrong' && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography id="transition-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center' }}>
            Size phù hợp với bạn
          </Typography>
          <Typography sx={{ fontWeight: 400, my: 3, px: 4 }}>
            Dường như những thông tin bạn chọn không khớp với nhau hoặc chúng tôi không tìm thấy size nào phù hợp với
            bạn
          </Typography>
          <Button className="rounded-none px-10 font-medium mt-3" onClick={onChooseAgain}>
            Chọn lại
          </Button>
        </Box>
      )}
    </>
  );
}

export default SizeResult;
