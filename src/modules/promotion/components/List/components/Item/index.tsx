import { useRouter } from 'next/router';
import { appAssets } from '@/common/assets';
import { Box, Card, CardHeader, IconButton, Stack, Typography, Button } from '@mui/material';
import Image from 'next/image';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { fetchRemovePromotion, fetchSavePromotion, selectPromotions } from '@/redux/slices/promotions';
import { toast } from 'react-toastify';
import { selectCurrentUser } from '@/redux/slices/auth';
import { ReactElement, useState } from 'react';
import ConfirmModal from '@/common/components/Modal/ConfirmModal';
import config from '@/config';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Promotion } from '@/types/promotion';

type PromotionItemProps = {
  item: Promotion;
  isValid?: boolean;
  isUsedInProfile?: boolean;
  isUsedInPayment?: boolean;
};

function PromotionItem({
  item,
  isValid = true,
  isUsedInProfile = false,
  isUsedInPayment = false,
}: PromotionItemProps): ReactElement {
  const [loginModalIsVisible, setLoginModalIsVisible] = useState(false);
  const [confirmModalIsVisible, setConfirmModalIsVisible] = useState(false);
  const customerPromotions = useSelector(selectPromotions);

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isExist = customerPromotions.findIndex((promotion) => promotion._id.toString() === item._id.toString()) !== -1;

  const handleSavePromotion = async () => {
    if (!currentUser) {
      setLoginModalIsVisible(true);
      return;
    }

    if (!isExist) {
      const { success } = await dispatch(
        fetchSavePromotion({ promotionId: item._id, customerId: currentUser._id }),
      ).unwrap();
      if (success) {
        toast.success('Lưu mã thành công');
      }
    }
  };

  const handleRemovePromotion = async () => {
    const { success, message } = await dispatch(fetchRemovePromotion(item._id)).unwrap();
    if (success) {
      toast.success(message);
    }

    setConfirmModalIsVisible(false);
  };

  const confirmRemovePromotion = () => {
    setConfirmModalIsVisible(true);
  };

  const renderActionButton = () => {
    if (isUsedInProfile) {
      return (
        <IconButton color="error" onClick={confirmRemovePromotion}>
          <DeleteIcon />
        </IconButton>
      );
    }

    return (
      <Button
        variant="text"
        onClick={!isExist ? handleSavePromotion : () => {}}
        disabled={isExist || item.amount === 0}
      >
        {!isExist ? 'Lưu' : 'Đã lưu'}
      </Button>
    );
  };

  return (
    <>
      <Card raised sx={!isValid ? { opacity: 0.6, backgroundColor: 'rgba(0, 0, 0, 0.2)' } : {}}>
        <CardHeader
          avatar={<Image src={appAssets.couponIcon} width={50} height={50} alt="img-couponIcon" />}
          action={!isUsedInPayment && renderActionButton()}
          title={<Typography variant="h4">{item.name}</Typography>}
          subheader={
            <Stack>
              <Typography>{item.description}</Typography>
              <Box sx={{ mt: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AccessTimeIcon />{' '}
                  <Typography>
                    Thời gian: {new Date(item.startDate).toLocaleDateString()} -{' '}
                    {new Date(item.endDate).toLocaleDateString()}
                  </Typography>
                </Stack>
                <Typography sx={{ color: '#FF4842' }}>Còn lại: {item.amount} mã</Typography>
              </Box>
            </Stack>
          }
        />
      </Card>

      <ConfirmModal
        isOpen={loginModalIsVisible}
        title="Bạn muốn lưu ưu đãi này?"
        subTitle="Đăng nhập ngay để lấy mã khuyến mãi"
        confirmTextBtn="Đăng nhập"
        onClose={() => setLoginModalIsVisible(false)}
        onConfirm={() => router.push(config.routes.login)}
      />

      <ConfirmModal
        isOpen={confirmModalIsVisible}
        title="Xóa ưu đãi?"
        subTitle="Bạn thực sự muốn xóa ưu đãi?"
        confirmTextBtn="Xóa"
        onClose={() => setConfirmModalIsVisible(false)}
        onConfirm={handleRemovePromotion}
      />
    </>
  );
}

export default PromotionItem;
