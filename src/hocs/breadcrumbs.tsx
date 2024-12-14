import { PageContainerProps } from '@/common/components/Layout/PageContainer';
import { Breadcrumbs, Typography } from '@mui/material';
import { ComponentType } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';
import config from '@/config';

const withBreadcrumbs = (Component: ComponentType<PageContainerProps>) => {
  const BreadcrumbsComponent = (props: PageContainerProps) => {
    const { breadcrumbs, barTitle } = props;

    const handleRenderBreadcrumbs = () => {
      return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link href={config.routes.home} className="hover:underline">
            Trang chủ
          </Link>
          {breadcrumbs ? (
            breadcrumbs.map((breadcrumb, index) => {
              if (index !== breadcrumbs!.length - 1) {
                return (
                  <Link href={breadcrumb.url} key={breadcrumb.id} className="hover:underline">
                    {breadcrumb.name}
                  </Link>
                );
              }
              return (
                <Typography key={breadcrumb.id} className="font-medium">
                  {breadcrumb.name}
                </Typography>
              );
            })
          ) : (
            <Typography className="font-medium">{barTitle}</Typography>
          )}
        </Breadcrumbs>
      );
    };

    return <Component {...props} renderBreadcrumbs={handleRenderBreadcrumbs} />;
  };

  BreadcrumbsComponent.displayName = `withBreadcrumbs(${Component.displayName || Component.name})`;
  BreadcrumbsComponent.WrappedComponent = Component;
  return BreadcrumbsComponent;
};

export default withBreadcrumbs;
