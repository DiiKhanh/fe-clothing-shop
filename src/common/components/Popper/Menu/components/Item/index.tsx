import { CategoryType } from '@/types/category';
import { Box, Theme } from '@mui/material';
import { useTheme } from '@mui/styles';
import Link from 'next/link';

type MenuItemProps = {
  categoryType: CategoryType;
};

function MenuItem({ categoryType }: MenuItemProps) {
  const theme = useTheme<Theme>();

  return (
    <Box
      sx={{
        py: 1,
        px: '26px',
        color: theme.palette.grey['200'],
        ':hover': {
          backgroundColor: theme.palette.grey['200'],
          color: theme.palette.grey['800'],
        },
      }}
    >
      <Link href={{ pathname: `/category/${categoryType._id}` }} style={{ display: 'block' }}>
        {categoryType.type}
      </Link>
    </Box>
  );
}

export default MenuItem;
