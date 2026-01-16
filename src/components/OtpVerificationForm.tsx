import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import PrimaryButton from './PrimaryButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface OtpVerificationFormProps {
  onSubmit: (values: { method: 'email' | 'phone'; code: string }) => Promise<void>;
  onToggleToLogin: () => void;
  isSubmitting: boolean;
}

const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({
  onSubmit,
  onToggleToLogin,
  isSubmitting
}) => {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleMethodChange = (
    _: React.MouseEvent<HTMLElement>,
    newMethod: 'email' | 'phone' | null
  ) => {
    if (newMethod) {
      setMethod(newMethod);
    }
  };

  const handleCodeChange = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.replace(/[^0-9]/g, '').slice(0, 1);
    const codeArray = code.split('').concat(Array(6 - code.length).fill(''));
    codeArray[index] = value;
    const newCode = codeArray.join('').slice(0, 6);
    setCode(newCode);
    setError('');

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number) => (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (pastedData.length > 0) {
      setCode(pastedData);
      setError('');
      // Focus the next empty field or the last field
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (code.length !== 6) {
      setError('Please enter the 6-digit code');
      return;
    }
    void onSubmit({ method, code });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          cursor: 'pointer'
        }}
        onClick={onToggleToLogin}
      >
        <ArrowBackIcon sx={{ mr: 1, fontSize: 20 }} />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
            fontSize: 18,
            textAlign: 'left'
          }}
        >
          Sign up
        </Typography>
      </Box>

      <Typography
        variant="body2"
        sx={{
          mb: 2,
          color: 'text.secondary',
          fontSize: 14
        }}
      >
        Choose how you&apos;d like to receive the one-time passcode.
      </Typography>

      <ToggleButtonGroup
        value={method}
        exclusive
        onChange={handleMethodChange}
        sx={{
          mb: 3,
          width: '100%'
        }}
      >
        <ToggleButton value="email" sx={{ flex: 1, textTransform: 'none', fontSize: 13 }}>
          Send via Email
        </ToggleButton>
        <ToggleButton value="phone" sx={{ flex: 1, textTransform: 'none', fontSize: 13 }}>
          Send via Phone
        </ToggleButton>
      </ToggleButtonGroup>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <TextField
            key={index}
            inputRef={(el) => {
              inputRefs.current[index] = el;
            }}
            value={code[index] || ''}
            onChange={handleCodeChange(index)}
            onKeyDown={handleKeyDown(index)}
            onPaste={index === 0 ? handlePaste : undefined}
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: 'center',
                fontSize: 18,
                padding: 0
              }
            }}
            sx={{
              width: 40,
              '& .MuiInputBase-root': {
                height: 48
              }
            }}
          />
        ))}
      </Box>

      {error && (
        <Typography
          variant="caption"
          sx={{
            color: 'error.main',
            fontSize: 12,
            display: 'block',
            mb: 1
          }}
        >
          {error}
        </Typography>
      )}

      <PrimaryButton
        type="submit"
        disabled={isSubmitting || code.length !== 6}
        sx={{
          fontSize: 16,
          fontWeight: 500,
          borderRadius: '8px',
          mt: 1,
          mb: 2
        }}
      >
        {isSubmitting ? 'Signing up…' : 'Sign Up'}
      </PrimaryButton>

      <Box
        sx={{
          textAlign: 'center',
          fontSize: 13
        }}
      >
        <span>Didn&apos;t receive the code? </span>
        <Link
          component="button"
          type="button"
          underline="hover"
          sx={{ fontWeight: 600, fontSize: 13 }}
          onClick={() => {
            // placeholder for resend
          }}
        >
          Resend again
        </Link>
      </Box>
    </Box>
  );
};

export default OtpVerificationForm;
