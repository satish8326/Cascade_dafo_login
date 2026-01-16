import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface BreadcrumbProps {
  items: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {

  return (
    <Box
      sx={{
        mb: { xs: 1, sm: 1.5 },
        overflowX: 'auto',
        whiteSpace: 'nowrap'
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontSize: { xs: 12, sm: 13, md: 14 },
          '& span:not(:last-child)::after': {
            content: '" / "',
            margin: '0 8px',
            color: 'text.secondary'
          }
        }}
      >
        {items.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </Typography>
    </Box>
  );
};

export default Breadcrumb;

