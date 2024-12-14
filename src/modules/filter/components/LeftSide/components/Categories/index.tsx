import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import { Checkbox, Collapse, FormControlLabel, FormGroup, ListItemButton, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import { selectCategories } from '@/redux/slices/data';

type FilterProductTypesProps = {
  onFilter: (_type: string) => void;
  selectedFilters: string[];
};

function FilterProductTypes({ onFilter, selectedFilters }: FilterProductTypesProps): ReactElement | null {
  const [open, setOpen] = useState(true);
  const categories = useSelector(selectCategories);
  const router = useRouter();

  const currentCategoryId = router.query.categoryId;
  const currentCategory = categories.find(
    (category) =>
      category._id === currentCategoryId || category.types.findIndex((type) => type._id === currentCategoryId) !== -1,
  );

  const handleClick = () => {
    setOpen(!open);
  };

  if (currentCategory?.types?.length === 0) {
    return null;
  }

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText
          sx={{ '.css-107jk5d-MuiTypography-root': { fontSize: '1.2rem', fontWeight: 500 } }}
          primary="DÒNG SẢN PHẨM"
        />

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <FormGroup sx={{ pl: 3 }}>
          {currentCategory?.types.map((type) => {
            const isChecked = selectedFilters.findIndex((filter) => filter === type.type) !== -1;

            return (
              <FormControlLabel
                key={type._id}
                control={<Checkbox />}
                label={type.type}
                checked={isChecked}
                onChange={() => onFilter(type.type)}
              />
            );
          })}
        </FormGroup>
      </Collapse>
    </>
  );
}

export default FilterProductTypes;
