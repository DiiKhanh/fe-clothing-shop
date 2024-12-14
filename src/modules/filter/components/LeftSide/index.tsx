import { Box, List, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import FilterProductTypes from './components/Categories';
import FilterPrice from './components/Prices';
import FilterMaterial from './components/Materials';
import FilterTextures from './components/Textures';
import useResponsive from '@/hooks/useResponsive';
import { ReactElement } from 'react';

type FilterProps = {
  selectedFilters: string[];
  selectedMaterials: string[];
  selectedTextures: string[];
  priceRange?: number[] | null;
  onFilter: (_type: string) => void;
  onChangePriceRange: (_range: number[]) => void;
  onChangeMaterial: (_material: string) => void;
  onChangeTexture: (_texture: string) => void;
};

function Filter({
  selectedFilters,
  selectedMaterials,
  selectedTextures,
  priceRange,
  onFilter,
  onChangePriceRange,
  onChangeMaterial,
  onChangeTexture,
}: FilterProps): ReactElement {
  const isDesktop = useResponsive('up', 'lg');

  return (
    <Box>
      {isDesktop && (
        <Typography sx={{ mt: 4, fontSize: 20, fontWeight: 400 }}>
          Bộ lọc <TuneIcon />
        </Typography>
      )}
      <List sx={{ width: '100%', bgcolor: 'background.paper' }} component="nav" aria-labelledby="nested-list-subheader">
        <FilterProductTypes onFilter={onFilter} selectedFilters={selectedFilters} />
        <FilterPrice priceRange={priceRange} onChangePriceRange={onChangePriceRange} />
        <FilterMaterial selectedMaterials={selectedMaterials} onChangeMaterial={onChangeMaterial} />
        <FilterTextures selectedTextures={selectedTextures} onChangeTexture={onChangeTexture} />
      </List>
    </Box>
  );
}

export default Filter;
