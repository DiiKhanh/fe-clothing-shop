import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { selectCategories } from '@/redux/slices/data';
import CollapseButton from './components/CollapseButton';
import { Stack, Theme, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/styles';
import Link from 'next/link';
import { Category } from '@/types/category';
import { useAppSelector } from '@/hooks/useAppSelector';

type NavigationSidebarProps = {
  isVisible: boolean;
  onClose?: React.MouseEventHandler<SVGSVGElement>;
};

export default function NavigationSidebar({ isVisible, onClose }: NavigationSidebarProps) {
  const categories = useAppSelector<Category[]>(selectCategories);
  const theme = useTheme<Theme>();

  const renderCategories = () => {
    return categories.map((category) => {
      if (category.types.length > 0) {
        return <CollapseButton key={category._id} item={category} />;
      }

      return (
        <Link
          key={category._id}
          href={{ pathname: `/category/${category._id}`, query: { title: category.name } }}
          as={`/category/${category._id}`}
        >
          <ListItemButton>
            <ListItemText sx={{ '.css-107jk5d-MuiTypography-root': { fontSize: '1.25rem' } }} primary={category.name} />
          </ListItemButton>
        </Link>
      );
    });
  };

  return (
    <Drawer anchor="right" open={isVisible} onClose={onClose}>
      <Box sx={{ width: '18rem' }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: 3, height: '62px', backgroundColor: theme.palette.grey['900'] }}
        >
          <Typography variant="h4" sx={{ color: theme.palette.grey['200'], fontWeight: '300' }}>
            Danh mục
          </Typography>
          <CloseIcon
            onClick={onClose}
            sx={{
              color: theme.palette.grey['200'],
              ':hover': { opacity: 0.6 },
              transition: 'all linear 300ms',
              cursor: 'pointer',
            }}
          />
        </Stack>

        <Box sx={{ p: 2 }}>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {renderCategories()}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}
