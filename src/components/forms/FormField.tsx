import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormInput from '../FormInput';
import type { FormInputProps } from '../FormInput';

export interface FormFieldProps extends Omit<FormInputProps, 'label'> {
  label: string;
  showFloatingLabel?: boolean;
}

/**
 * Reusable form field component with floating label pattern
 * Used across all forms for consistent styling and behavior
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  showFloatingLabel = true,
  value,
  onFocus,
  onBlur,
  sx,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur]
  );

  const hasValue = Boolean(value && String(value).length > 0);
  const isLabelFloating = isFocused || hasValue;

  if (!showFloatingLabel) {
    return (
      <FormInput
        label={label}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        sx={sx}
        {...rest}
      />
    );
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          left: 16,
          top: isLabelFloating ? 8 : '24%',
          transform: isLabelFloating ? 'translateY(0)' : 'translateY(-50%)',
          transition: 'all 0.2s ease-in-out',
          backgroundColor: 'background.paper',
          px: 0.5,
          color: 'text.secondary',
          fontSize: '0.75rem',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {label}
      </Typography>
      <FormInput
        label=""
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        sx={{
          '& .MuiInputBase-root': {
            height: 46,
          },
          '& .MuiInputBase-input': {
            padding: '10px 10px',
            fontSize: '14px',
          },
          ...sx,
        }}
        {...rest}
      />
    </Box>
  );
};

export default FormField;

