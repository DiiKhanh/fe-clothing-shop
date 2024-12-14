import { ReactElement, useState } from 'react';
import { Checkbox, Collapse, FormControlLabel, FormGroup, ListItemButton, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { MATERIALS } from '@/utils/data/filter';

type FilterMaterialProps = {
  selectedMaterials: string[];
  onChangeMaterial: (_material: string) => void;
};

function FilterMaterial({ selectedMaterials, onChangeMaterial }: FilterMaterialProps): ReactElement {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText
          sx={{ '.css-107jk5d-MuiTypography-root': { fontSize: '1.2rem', fontWeight: 500 } }}
          primary="CHẤT LIỆU"
        />

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit sx={{ mt: 2 }}>
        <FormGroup sx={{ pl: 3 }}>
          {MATERIALS.map((material) => {
            const isChecked = selectedMaterials.findIndex((item) => item === material) !== -1;

            return (
              <FormControlLabel
                key={material}
                control={<Checkbox />}
                label={material}
                checked={isChecked}
                onChange={() => onChangeMaterial(material)}
              />
            );
          })}
        </FormGroup>
      </Collapse>
    </>
  );
}

export default FilterMaterial;
