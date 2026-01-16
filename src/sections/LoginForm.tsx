import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import PrimaryButton from '../components/PrimaryButton';
import SignUpForm from '../components/SignUpForm';
import NameSearchForm from '../components/NameSearchForm';
import AccountValidationForm from '../components/AccountValidationForm';
import OtpVerificationForm from '../components/OtpVerificationForm';
import LoginSuccess from '../components/LoginSuccess';
import CommonLoader from '../components/Loaders/CommonLoader';
import { useAuth } from '../context/AuthContext';
import { Typography } from '@mui/material';
import FormInput from '../components/FormInput';

interface LoginFormValues {
  email: string;
}

interface FieldErrors {
  email?: string;
}

const initialValues: LoginFormValues = {
  email: ''
};
const LoginForm: React.FC = () => {
  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isNameSearch, setIsNameSearch] = useState<boolean>(false);
  const [isAccountValidation, setIsAccountValidation] = useState<boolean>(false);
  const [isOtpVerification, setIsOtpVerification] = useState<boolean>(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { loginRedirect } = useAuth();

  const handleSignUpSubmit = async (values: { firstName: string; lastName: string; phone: string; email: string }): Promise<void> => {
    void values;
    setIsSignUp(false);
    setIsSignUpSuccess(true);
  };

  const toggleForm = () => {
    setIsSignUp(false);
    setIsNameSearch(false);
    setIsAccountValidation(!isAccountValidation);
    setIsOtpVerification(false);
    setIsSignUpSuccess(false);
  };

  const toggleFormToLogin = () => {
    setIsNameSearch(false);
    setIsAccountValidation(false);
    setIsSignUpSuccess(false);
  };

  const handleNameSearchSubmit = async (selectedName: string) : Promise<void> => {
    setIsSubmitting(true);
    try {
      void selectedName;
      setIsOtpVerification(false);
      setIsSignUpSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAccountValidationSubmit = async (values: { accountNumber: string; billingZipCode: string }): Promise<void> => {
    void values;
    setIsAccountValidation(false);
    setIsSignUp(false);
    setIsNameSearch(true);
  };

  const handleOtpSubmit = async (values: { method: 'email' | 'phone'; code: string }): Promise<void> => {
    setIsSubmitting(true);
    try {
      void values;
      setIsOtpVerification(false);
      setIsSignUpSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterAsNew = async () => {
    setIsNameSearch(false);
    setIsSignUp(true);
  };

  if (isSignUpSuccess) {
    return (
      <LoginSuccess
        onGoToLogin={toggleFormToLogin}
      />
    );
  }

  if (isOtpVerification) {
    return (
      <OtpVerificationForm
        onSubmit={handleOtpSubmit}
        onToggleToLogin={toggleForm}
        isSubmitting={isSubmitting}
      />
    );
  }

  if (isAccountValidation) {
    return (
      <AccountValidationForm
        onSubmit={handleAccountValidationSubmit}
        onToggleToLogin={toggleForm}
        isSubmitting={isSubmitting}
      />
    );
  }

  if (isNameSearch) {
    return (
      <NameSearchForm
        onSubmit={handleNameSearchSubmit}
        onToggleToLogin={toggleForm}
        onRegisterAsNew={handleRegisterAsNew}
        isSubmitting={isSubmitting}
      />
    );
  }

  if (isSignUp) {
    return (
      <Box>
        <SignUpForm
          onSubmit={handleSignUpSubmit}
          onToggleToLogin={toggleForm}
          isSubmitting={isSubmitting}
        />

      </Box>
    );
  }
  const handleChange = (field: keyof LoginFormValues) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues(prev => ({ ...prev, [field]: event.target.value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FieldErrors = {};

    if (!values.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'Enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    setIsSubmitting(true);
    // Small delay to ensure loading overlay is visible before redirect
    // This prevents the blank white screen flash
    setTimeout(() => {
      void loginRedirect(values.email).finally(() => {
        setIsSubmitting(false);
      });
    }, 500);
  };

  const isLabelFloating = (field: string) => {
    return focusedField === field || values[field as keyof typeof values].length > 0;
  };
  return (
    <>
      <CommonLoader loading={isSubmitting} />
      <Box component="form" onSubmit={handleLoginSubmit} noValidate>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 500,
          fontSize: 18,
          textAlign: 'left',
          mt: 1,
          mb: 1

        }}
      >
        Login
      </Typography>
      <Box sx={{ position: 'relative' }}>
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            left: 16,
            top: isLabelFloating('email') ? 8 : '24%',
            transform: isLabelFloating('email') ? 'translateY(0)' : 'translateY(-50%)',
            transition: 'all 0.2s ease-in-out',
            backgroundColor: 'background.paper',
            px: 0.5,
            color: 'text.secondary',
            fontSize: isLabelFloating('email') ? '0.75rem' : '0.75rem',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          Email
        </Typography>
        <FormInput
          name="email"
          label=""
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange('email')}
          error={Boolean(errors.email)}
          helperText={errors.email}
          inputProps={{ 'aria-label': 'email' }}
         sx={{
            '& .MuiInputBase-root': {
              height: 46,
            },
            '& .MuiInputBase-input': {
              padding: '10px 10px',
              fontSize: '14px', 
            },
          }}
        />
      </Box>
        <PrimaryButton
        type="submit"
        disabled={isSubmitting}
        sx={{
          fontSize: 16,
          fontWeight: 500,
          borderRadius: '8px',
          marginTop: '10px',
        }}
      >
        {isSubmitting ? 'Loading…' : 'Login'}
      </PrimaryButton>
      <Box
        sx={{
          mt: 2,
          textAlign: 'center',
          fontSize: 13
        }}
      >
        <span>Don&apos;t have an account? </span>
        <Link
          component="button"
          type="button"
          color= "#0088CB"
          underline="hover"
          sx={{ fontWeight: 600, fontSize: 13 }}
          onClick={toggleForm}
        >
          Sign Up
        </Link>
      </Box>
    </Box>
    </>
  );
};

export default LoginForm;
