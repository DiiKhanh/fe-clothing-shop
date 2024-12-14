import { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import { CategoryType } from '@/types/category';

type CollapseButtonProps = {
  item: {
    readonly _id: string;
    name: string;
    types: CategoryType[];
  };
};

function CollapseButton({ item }: CollapseButtonProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton>
        <ListItemText
          sx={{ '.css-107jk5d-MuiTypography-root': { fontSize: '1.25rem' } }}
          primary={
            <Link
              href={{ pathname: `/category/${item._id}`, query: { title: item.name } }}
              as={`/category/${item._id}`}
            >
              {item.name}
            </Link>
          }
        />

        {open ? <ExpandLess onClick={handleClick} /> : <ExpandMore onClick={handleClick} />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.types.map((type) => (
            <ListItemButton key={type._id} sx={{ pl: 4 }}>
              <ListItemText
                sx={{ '.css-107jk5d-MuiTypography-root': { fontSize: '1rem' } }}
                primary={
                  <Link
                    href={{ pathname: `/category/${type._id}`, query: { title: type.type } }}
                    as={`/category/${type._id}`}
                  >
                    {type.type}
                  </Link>
                }
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default CollapseButton;
