import React from 'react';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';

export interface IconBadgeProps {
  children: React.ReactNode;
  size?: number;
  sx?: SxProps<Theme>;
}

const IconBadge: React.FC<IconBadgeProps> = ({ children, size = 40, sx }) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(45, 84, 153, 0.08)',
        color: '#2d5499',
        ...sx
      }}
    >
      {children}
    </Box>
  );
};

export default IconBadge;


