import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import loginSuccessImg from '../assets/login-sucess.jpg';

interface LoginSuccessProps {
  onGoToLogin: () => void;
}

const LoginSuccess: React.FC<LoginSuccessProps> = ({ onGoToLogin }) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 4,
        px: 3
      }}
    >
      <Box
        component="img"
        src={loginSuccessImg}
        alt="Sign up complete"
        sx={{
          objectFit: 'cover',
          mb: 3,
          mx: 'auto',
          display: 'block'
        }}
      />

      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 1
        }}
      >
        Sign up Complete
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          mb: 3,
          fontSize: 14,
          width: '100%',
          maxWidth: '100%',
          textAlign: 'left',
          display: 'block'
        }}
      >
        Thanks for joining our mission to help kids move better.
        We&apos;ve sent you an email with next steps.
      </Typography>

      <Link
        component="button"
        type="button"
        underline="hover"
        sx={{ fontWeight: 600, fontSize: 13 }}
        onClick={onGoToLogin}
      >
        Go to Login
      </Link>
    </Box>
  );
};

export default LoginSuccess;


