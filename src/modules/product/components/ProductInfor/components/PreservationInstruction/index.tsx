import { MouseEvent } from 'react';
import Image from 'next/image';
import { Box, Typography, Button } from '@mui/material';
import { appAssets } from '@/common/assets';

type PreservationInstructionProps = {
  onCollapse: (_event: MouseEvent<HTMLButtonElement>) => void;
};

const styles = {
  title: {
    fontWeight: 400,
    position: 'relative',
    paddingLeft: '20px',
    ':before': {
      content: '""',
      width: '12px',
      height: '12px',
      borderRadius: '12px',
      display: 'block',
      position: 'absolute',
      left: 0,
      bottom: '6px',
      background: '#d40f0f',
    },
  },
};

function PreservationInstruction({ onCollapse }: PreservationInstructionProps) {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography sx={styles.title}>HƯỚNG DẪN BẢO QUẢN</Typography>
      <Image
        src={appAssets.storageInstructions}
        width={1000}
        height={1000}
        style={{ width: '100%', marginTop: '16px' }}
        alt="Hướng dẫn bảo quản"
      />

      <Typography sx={{ mt: 3 }}>
        Để đảm bảo chất lượng sản phẩm và giữ cho các sản phẩm của shop quần áo online của bạn luôn mới và đẹp, dưới đây
        là một số hướng dẫn bảo quản mà bạn nên áp dụng:
      </Typography>

      <ol style={{ listStyleType: 'number', marginLeft: '30px', marginTop: '20px' }}>
        <li>
          <strong>Theo dõi hướng dẫn giặt ủi</strong>: Đảm bảo rằng bạn đọc và tuân thủ hướng dẫn giặt và ủi trên nhãn
          của quần áo. Nếu không chắc chắn, hãy liên hệ với nhà sản xuất để biết thêm thông tin.
        </li>

        <li>
          <strong>Giặt tay hoặc giặt bằng máy</strong>: Đối với quần áo có chất liệu dễ bị co rút hoặc bị dính, bạn nên
          giặt tay để tránh gây hư hỏng. Nếu bạn phải giặt bằng máy, hãy đặt chế độ giặt nhẹ và chọn một loại bột giặt
          phù hợp.
        </li>

        <li>
          <strong>Tránh sử dụng hóa chất</strong>: Nếu có thể, tránh sử dụng các chất tẩy rửa mạnh hoặc hóa chất khác để
          giặt quần áo. Thay vào đó, hãy sử dụng các loại bột giặt tự nhiên hoặc chất tẩy rửa lành mạnh.
        </li>

        <li>
          <strong>Bảo quản đúng cách</strong>: Khi không sử dụng, hãy để quần áo được treo hoặc gấp gọn đúng cách để
          tránh tình trạng nhăn và bị vón cục.
        </li>
      </ol>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="outlined"
          sx={{ borderRadius: 0, textTransform: 'uppercase', px: 4, py: 1 }}
          onClick={onCollapse}
        >
          Thu gọn
        </Button>
      </Box>
    </Box>
  );
}

export default PreservationInstruction;
