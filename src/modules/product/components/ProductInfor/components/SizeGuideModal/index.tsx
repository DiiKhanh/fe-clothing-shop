import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Tab,
  Tabs,
} from '@mui/material';
import Button from '@/common/components/Buttons/Button';
import { TabContext, TabPanel } from '@mui/lab';
import ThinPersonIcon from '@/common/components/Icons/ThinPersonIcon';
import NormalPersonIcon from '@/common/components/Icons/NormalPersonIcon';
import FatPersonIcon from '@/common/components/Icons/FatPersonIcon';
import CloseIcon from '@mui/icons-material/Close';
import TableSizesForShirt from './components/TableSizesForShirt';
import SizeResult from './components/Result';
import { SIZES } from '@/utils/constants';
import { ProductSize } from '@/types/product';

type SizeGuideModalProps = {
  isVisible: boolean;
  productSizes: ProductSize[];
  onClose: () => void;
  onSelectSize: (_size: string) => void;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: { xs: 'translate(-50%, -50%)', md: 'translate(-50%, -42%)' },
  width: { xs: '97%', md: '700px' },
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 3,
};

export default function SizeGuideModal({
  isVisible,
  productSizes,
  onClose,
  onSelectSize,
}: SizeGuideModalProps): React.ReactElement {
  const [value, setValue] = useState('1');
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [body, setBody] = useState('thin');
  const [feeling, setFeeling] = useState('tight');
  const [selectedSize, setSelectedSize] = useState<string | null>();

  const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setValue(newValue);
  };

  const handleHeightChange = (event: Event, newValue: number | number[]) => {
    if (!Array.isArray(newValue)) {
      setHeight(newValue);
    }
  };

  const handleWeightChange = (event: Event, newValue: number | number[]) => {
    if (!Array.isArray(newValue)) {
      setWeight(newValue);
    }
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
    setBody(newValue);
  };

  const handleFeelingChange = (event: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
    setFeeling(newValue);
  };

  const handleChooseSize = () => {
    if (height >= 165 && height <= 168 && weight >= 56 && weight <= 62) {
      if (body === 'fat') {
        setSelectedSize('wrong');
        return;
      }

      if (feeling === 'wide') {
        setSelectedSize(SIZES.M);
        return;
      }

      setSelectedSize(SIZES.S);
      return;
    }

    if (height >= 169 && height <= 172 && weight >= 63 && weight <= 69) {
      if (body === 'fat') {
        setSelectedSize('wrong');
        return;
      }

      if (feeling === 'wide') {
        setSelectedSize(SIZES.L);
        return;
      }

      setSelectedSize(SIZES.M);
      return;
    }

    if (height >= 173 && height <= 176 && weight >= 70 && weight <= 76) {
      if (body === 'thin') {
        setSelectedSize('wrong');
        return;
      }

      if (feeling === 'wide') {
        setSelectedSize(SIZES.XL);
        return;
      }

      setSelectedSize(SIZES.L);
      return;
    }

    if (height >= 177 && height <= 180 && weight >= 77 && weight <= 83) {
      if (body === 'thin') {
        setSelectedSize('wrong');
        return;
      }

      setSelectedSize(SIZES.XL);
      return;
    }

    if (height >= 181 && weight >= 84) {
      setSelectedSize(SIZES.XL);
      return;
    }

    setSelectedSize('wrong');
  };

  const handleChooseAgain = () => {
    setSelectedSize(null);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isVisible}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{ overflowY: 'scroll' }}
      >
        <Fade in={isVisible}>
          <Box sx={style}>
            <IconButton sx={{ position: 'absolute', right: 30, top: 17 }} onClick={onClose}>
              <CloseIcon />
            </IconButton>

            {!selectedSize && (
              <Box>
                <Typography id="transition-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center' }}>
                  Chọn size
                </Typography>
                <TabContext value={value}>
                  <Box sx={{ width: '100%', bgcolor: 'background.paper', mt: 2 }}>
                    <Tabs value={value} onChange={handleChange} centered>
                      <Tab label="Hướng dẫn chọn size" value="1" />
                      <Tab label="Bảng size" value="2" />
                    </Tabs>
                  </Box>
                  <TabPanel value="1">
                    <Typography sx={{ textAlign: 'center', fontWeight: 400 }}>Thông số của bạn</Typography>
                    <Typography>Chiều cao</Typography>
                    <Stack direction="row" spacing={3}>
                      <Slider value={height} size="small" onChange={handleHeightChange} min={1} max={200} />
                      <Typography variant="body1">{height}&nbsp;cm</Typography>
                    </Stack>

                    <Typography sx={{ mt: 4 }}>Cân nặng</Typography>
                    <Stack direction="row" spacing={3}>
                      <Slider value={weight} size="small" onChange={handleWeightChange} min={1} max={150} />
                      <Typography variant="body1">{weight}&nbsp;kg</Typography>
                    </Stack>

                    <Typography sx={{ my: 5, textAlign: 'center', fontWeight: 400 }}>Dáng người của bạn</Typography>
                    <FormControl sx={{ width: '100%' }}>
                      <RadioGroup
                        row
                        aria-labelledby="body-group"
                        name="body-group"
                        value={body}
                        onChange={handleBodyChange}
                      >
                        <Grid container>
                          <Grid item xs={4} sx={{ textAlign: 'center', '& svg': { mx: 'auto' } }}>
                            <ThinPersonIcon />
                            <FormControlLabel value="thin" control={<Radio />} label="Gầy" sx={{ mt: 2 }} />
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: 'center', '& svg': { mx: 'auto' } }}>
                            <NormalPersonIcon />
                            <FormControlLabel value="normal" control={<Radio />} label="Bình thường" sx={{ mt: 2 }} />
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: 'center', '& svg': { mx: 'auto' } }}>
                            <FatPersonIcon />
                            <FormControlLabel value="fat" control={<Radio />} label="Béo" sx={{ mt: 2 }} />
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </FormControl>

                    <Typography sx={{ mt: 5, textAlign: 'center', fontWeight: 400 }}>Bạn muốn mặc thế nào</Typography>
                    <FormControl sx={{ width: '100%' }}>
                      <RadioGroup
                        row
                        aria-labelledby="body-group"
                        name="body-group"
                        value={feeling}
                        onChange={handleFeelingChange}
                      >
                        <Grid container>
                          <Grid item xs={4} sx={{ textAlign: 'center', '& svg': { mx: 'auto' } }}>
                            <FormControlLabel value="tight" control={<Radio />} label="Mặc Ôm" sx={{ mt: 2 }} />
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: 'center', '& svg': { mx: 'auto' } }}>
                            <FormControlLabel value="fit" control={<Radio />} label="Mặc vừa" sx={{ mt: 2 }} />
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: 'center', '& svg': { mx: 'auto' } }}>
                            <FormControlLabel value="wide" control={<Radio />} label="Mặc rộng" sx={{ mt: 2 }} />
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </FormControl>

                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                      <Button className="rounded-none px-10" onClick={handleChooseSize}>
                        Tìm size
                      </Button>
                    </Box>
                  </TabPanel>
                  <TabPanel value="2">
                    <TableSizesForShirt />
                  </TabPanel>
                </TabContext>
              </Box>
            )}
            {selectedSize && (
              <SizeResult
                selectedSize={selectedSize}
                productSizes={productSizes}
                onChooseSize={onSelectSize}
                onChooseAgain={handleChooseAgain}
              />
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
