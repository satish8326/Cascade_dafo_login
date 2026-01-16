import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

export type PrimaryButtonProps = ButtonProps;

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, sx, ...rest }) => {
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      {...rest}
      sx={{
        borderRadius: 999,
        paddingY: 1.25,
        lineHeight: 1,
        fontWeight: 600,
        backgroundColor: '#2d5499',
        '&:hover': {
          backgroundColor: '#1c3768'
        },
        ...sx
      }}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
