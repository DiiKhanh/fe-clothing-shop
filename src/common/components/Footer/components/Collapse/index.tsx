import { useState } from 'react';
import { Box, Typography, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function CollapseFooter() {
  const [isExpanded, setExpanded] = useState<boolean>(false);

  return (
    <Box>
      <Box
        sx={{ color: '#00ffff', cursor: 'pointer', fontSize: '13px', display: 'relative' }}
        onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
      >
        <Typography component="span" sx={{ fontWeight: 'light' }}>
          Xem thêm Thông tin Clothing Shop
        </Typography>
        <ExpandMoreIcon className="ml-2 cursor-pointer" />
      </Box>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <ul className="mt-3">
          <li>Giới thiệu về Clothing Shop</li>
          <li>Tuyển dụng</li>
          <li>.</li>
          <li>Quy chế hoạt động</li>
          <li>Điều khoản mua bán</li>
          <li>.</li>
          <li>Mã Voucher giảm giá</li>
          <br />
          <p>Đặt hàng và thu tiền tận nơi toàn quốc</p>
          <h5 className="text-xl font-medium">(088) 6025 625</h5>
          <br />
          <h4 className="text-2xl font-medium mb-2">FAQ</h4>
          <ul>
            <li>Vận chuyển</li>
            <li>Chính sách đổi trả</li>
            <li>Chính sách bảo hành</li>
            <li>Khách hàng VIP</li>
            <li>Đối tác cung cấp</li>
          </ul>
        </ul>
      </Collapse>
    </Box>
  );
}

export default CollapseFooter;
