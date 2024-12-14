import { Box } from '@mui/material';
import PageContainer from '@/common/components/Layout/PageContainer';
import ProfileTabs from '@/modules/customer/components/ProfileTabs';
import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PROFILE_TABS } from '@/utils/constants';
import config from '@/config';

function ProfilePage(): ReactElement {
  const [barTitle, setBarTitle] = useState('Thông tin tài khoản');
  const [tabIndex, setTabIndex] = useState(0);
  const router = useRouter();

  const handleTabChange = (_: React.SyntheticEvent<Element, Event>, newValue: number) => {
    let tab;
    switch (newValue) {
      case 0:
        tab = PROFILE_TABS.ACCOUNT;
        break;
      case 1:
        tab = PROFILE_TABS.PURCHASE_HISTORY;
        break;
      case 2:
        tab = PROFILE_TABS.ADDRESSES;
        break;
      case 3:
        tab = PROFILE_TABS.PROMOTIONS;
        break;
      default:
        break;
    }

    router.replace({ pathname: config.routes.profile, query: { tab } });
    setTabIndex(newValue);
  };

  useEffect(() => {
    switch (router.query.tab) {
      case PROFILE_TABS.ACCOUNT:
        setBarTitle('Thông tin tài khoản');
        setTabIndex(0);
        break;
      case PROFILE_TABS.PURCHASE_HISTORY:
        setBarTitle('Lịch sử mua hàng');
        setTabIndex(1);
        break;
      case PROFILE_TABS.ADDRESSES:
        setBarTitle('Địa chỉ giao hàng');
        setTabIndex(2);
        break;
      case PROFILE_TABS.PROMOTIONS:
        setBarTitle('Ưu đãi của bạn');
        setTabIndex(3);
        break;
      default:
        break;
    }
  }, [router.query.tab]);

  return (
    <PageContainer barTitle={barTitle} headTitle="Thông tin tài khoản">
      <Box sx={{ mt: 6, mb: 8 }}>
        <ProfileTabs tabIndex={tabIndex} onTabChange={handleTabChange} />
      </Box>
    </PageContainer>
  );
}

export default ProfilePage;
