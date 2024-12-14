import { Button, IconButton, SxProps, Theme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type FilterTagProps = {
  title: string;
  onClick: (_title: string) => void;
  sx?: SxProps<Theme> | undefined;
};

function FilterTag({ title, onClick, sx }: FilterTagProps) {
  return (
    <Button
      sx={{
        backgroundColor: '#f4f4f4 !important',
        border: '1px solid #e1e2e3',
        textTransform: 'uppercase',
        py: '4px',
        px: 3,
        borderRadius: '20px',
        ...sx,
      }}
    >
      {title}
      <IconButton sx={{ ml: 1, backgroundColor: 'white' }} onClick={() => onClick(title)}>
        <CloseIcon sx={{ fontSize: 14 }} />
      </IconButton>
    </Button>
  );
}

export default FilterTag;
