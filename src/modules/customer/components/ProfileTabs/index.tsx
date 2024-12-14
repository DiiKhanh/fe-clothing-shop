import { PropsWithChildren, ReactElement } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container, Divider, Grid, Stack } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountInfoTab from './components/AccountInfoTab';
import PurchaseHistoryTab from './components/PurchaseHistoryTab';
import AddressesTab from './components/AddressesTab';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { logout, selectCurrentUser } from '@/redux/slices/auth';
import { assignProductsToWishlist } from '@/redux/slices/wishlist';
import config from '@/config';
import PromotionsTab from './components/PromotionsTab';

type TabPanelProps = PropsWithChildren & {
  value: number;
  index: number;
};

type ProfileTabsProps = {
  tabIndex: number;
  onTabChange: (_: React.SyntheticEvent<Element, Event>, _newValue: number) => void;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ProfileTabs({ tabIndex, onTabChange }: ProfileTabsProps): ReactElement {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(assignProductsToWishlist({ products: [] }));
    router.replace(config.routes.login);
  };

  return (
    <Container maxWidth={false}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <PersonOutlineOutlinedIcon />
        <Typography variant="h4">Tài khoản của bạn</Typography>
      </Stack>
      <Grid container sx={{ flexGrow: 1, bgcolor: 'background.paper' }}>
        <Grid item xs={12} md={3}>
          <Tabs
            orientation="vertical"
            value={tabIndex}
            onChange={onTabChange}
            sx={{ borderWidth: 1, borderColor: 'divider', py: 2 }}
          >
            <Tab label="Thông tin tài khoản" sx={{ px: 6, alignItems: 'flex-start' }} />
            <Tab label="Lịch sử mua hàng" sx={{ px: 6, alignItems: 'flex-start' }} />
            <Tab label="Địa chỉ giao hàng" sx={{ px: 6, alignItems: 'flex-start' }} />
            <Tab label="Ưu đãi của bạn" sx={{ px: 6, alignItems: 'flex-start' }} />
            <Divider />
            <Typography sx={{ px: 6, pt: 2, fontWeight: 'bold', cursor: 'pointer' }} onClick={handleLogout}>
              <LogoutIcon /> Đăng xuất
            </Typography>
          </Tabs>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box>
            <TabPanel value={tabIndex} index={0}>
              <AccountInfoTab currentUser={currentUser} />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
              <PurchaseHistoryTab orders={currentUser?.orders} />
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
              <AddressesTab addresses={currentUser?.address || []} />
            </TabPanel>
            <TabPanel value={tabIndex} index={3}>
              <PromotionsTab />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
