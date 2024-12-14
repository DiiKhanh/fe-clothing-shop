import { ReactElement } from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import { appAssets } from '@/common/assets';
import Link from 'next/link';
import config from '@/config';

function HomeCarousel(): ReactElement {
  return (
    <Carousel
      showThumbs={false}
      emulateTouch={true}
      animationHandler="slide"
      autoPlay={true}
      interval={3000}
      infiniteLoop={true}
      showArrows={true}
      showStatus={false}
      stopOnHover={false}
    >
      <Link href={config.routes.promotions}>
        <div className="animate-image flex justify-center xl:h-[600px]">
          <Image alt="Discount" src={appAssets.banner10} width={1400} height={600} priority />
        </div>
      </Link>
      <Link href={config.routes.promotions}>
        <div className="animate-image flex justify-center xl:h-[600px]">
          <Image alt="Discount" src={appAssets.banner11} width={1400} height={600} priority />
        </div>
      </Link>
    </Carousel>
  );
}

export default HomeCarousel;
