import { ReactElement, useState } from 'react';
import { Checkbox, Collapse, FormControlLabel, FormGroup, ListItemButton, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { TEXTURES } from '@/utils/data/filter';

type FilterTexturesProps = {
  selectedTextures: string[];
  onChangeTexture: (_texture: string) => void;
};

function FilterTextures({ selectedTextures, onChangeTexture }: FilterTexturesProps): ReactElement {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText
          sx={{ '.css-107jk5d-MuiTypography-root': { fontSize: '1.2rem', fontWeight: 500 } }}
          primary="HOẠ TIẾT"
        />

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit sx={{ mt: 2 }}>
        <FormGroup sx={{ pl: 3 }}>
          {TEXTURES.map((texture) => {
            const isChecked = selectedTextures.findIndex((item) => item === texture) !== -1;

            return (
              <FormControlLabel
                key={texture}
                control={<Checkbox />}
                label={texture}
                checked={isChecked}
                onChange={() => onChangeTexture(texture)}
              />
            );
          })}
        </FormGroup>
      </Collapse>
    </>
  );
}

export default FilterTextures;
