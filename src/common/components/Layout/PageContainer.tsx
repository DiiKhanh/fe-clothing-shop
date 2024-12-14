import { PropsWithChildren, ReactNode } from 'react';
import Head from 'next/head';
import withBreadcrumbs from '@/hocs/breadcrumbs';

interface BreadcrumbItem {
  id: string;
  url: string;
  name: string;
}

export type PageContainerProps = PropsWithChildren & {
  barTitle?: string;
  headTitle: string;
  breadcrumbs?: BreadcrumbItem[];
  renderBreadcrumbs?: () => ReactNode;
};

function PageContainer({ children, headTitle, renderBreadcrumbs }: PageContainerProps) {
  return (
    <>
      <Head>
        <title>{headTitle} | Clothing Shop</title>
      </Head>
      <div className="xl:px-[5%]">
        {renderBreadcrumbs && (
          <div className="flex items-center py-1 px-4 mb-2 bg-[#e9ecef]">{renderBreadcrumbs()}</div>
        )}
        {children}
      </div>
    </>
  );
}

export default withBreadcrumbs(PageContainer);
