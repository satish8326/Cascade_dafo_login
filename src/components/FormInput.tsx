import React from 'react';
import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';

export interface FormInputProps extends Omit<TextFieldProps, 'variant'> {
  name: string;
  label: string;
}

/**
 * Reusable form input component with consistent styling
 * Extends MUI TextField with default props and custom styles
 */
export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  ...rest
}) => {
  const shouldShrink = Boolean(rest?.value ?? rest?.defaultValue);

  return (
    <TextField
      fullWidth
      margin="normal"
      name={name}
      label={label}
      variant="outlined"
      {...rest}
      InputLabelProps={{
        shrink: shouldShrink,
        ...rest.InputLabelProps,
      }}
      sx={{
        borderRadius: '5px',
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#ffffff',
        },
        '& .MuiInputLabel-root': {
          fontSize: '16px',
          color: '#727E98',
        },
        '& input:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 1000px #ffffff inset !important',
          WebkitTextFillColor: '#000000 !important',
          transition: 'background-color 5000s ease-in-out 0s',
        },
        '& input:-webkit-autofill:hover': {
          WebkitBoxShadow: '0 0 0 1000px #ffffff inset !important',
        },
        '& input:-webkit-autofill:focus': {
          WebkitBoxShadow: '0 0 0 1000px #ffffff inset !important',
        },
        '& input:-webkit-autofill:active': {
          WebkitBoxShadow: '0 0 0 1000px #ffffff inset !important',
        },
        ...rest.sx,
      }}
    />
  );
};

export default FormInput;
