import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export interface FormFooterProps {
  primaryText: string;
  linkText: string;
  onLinkClick: () => void;
  linkColor?: string;
}

/**
 * Reusable form footer component for navigation links
 * Used for "Don't have an account? Sign Up" and similar patterns
 */
export const FormFooter: React.FC<FormFooterProps> = ({
  primaryText,
  linkText,
  onLinkClick,
  linkColor = '#0088CB',
}) => {
  return (
    <Box
      sx={{
        mt: 2,
        textAlign: 'center',
        fontSize: 13,
      }}
    >
      <span>{primaryText} </span>
      <Link
        component="button"
        type="button"
        underline="hover"
        sx={{
          fontWeight: 600,
          fontSize: 13,
          color: linkColor,
        }}
        onClick={onLinkClick}
      >
        {linkText}
      </Link>
    </Box>
  );
};

export default FormFooter;

