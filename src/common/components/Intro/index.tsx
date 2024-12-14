import { Grid } from '@mui/material';
import { LightgalleryProvider, LightgalleryItem } from 'react-lightgallery';
import { cld } from '@/utils/lib/cloudinary';
import { AdvancedImage, lazyload, responsive, placeholder } from '@cloudinary/react';

type IntroProps = {
  images: {
    public_id: string;
    url: string;
  }[];
};

function Intro({ images }: IntroProps) {
  return (
    <LightgalleryProvider>
      <Grid container spacing={1} sx={{ mt: 6 }}>
        {images.map((image) => (
          <Grid item xs={6} md={3} key={image.public_id}>
            <LightgalleryItem group="intro" src={image.url} thumb={image.url}>
              <AdvancedImage
                cldImg={cld.image(image.public_id)}
                plugins={[lazyload(), responsive(), placeholder()]}
                style={{ cursor: 'pointer' }}
              />
            </LightgalleryItem>
          </Grid>
        ))}
      </Grid>
    </LightgalleryProvider>
  );
}

export default Intro;
