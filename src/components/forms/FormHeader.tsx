import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export interface FormHeaderProps {
  title: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

/**
 * Reusable form header component with back button and title
 * Used across all authentication forms for consistent UI
 */
export const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  onBack,
  showBackButton = true,
}) => {
  if (!showBackButton || !onBack) {
    return (
      <Typography
        variant="h5"
        sx={{
          fontWeight: 500,
          fontSize: 18,
          textAlign: 'left',
          mb: 2,
        }}
      >
        {title}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 2,
        cursor: 'pointer',
      }}
      onClick={onBack}
    >
      <ArrowBackIcon sx={{ mr: 1, fontSize: 20 }} />
      <Typography
        variant="h5"
        sx={{
          fontWeight: 500,
          fontSize: 18,
          textAlign: 'left',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default FormHeader;

