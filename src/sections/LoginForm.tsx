import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { get } from "../api/apiService";
import { cascadeDafoNowURLs } from "../api/url/config";

interface LoginFormValues {
  email: string;
}

interface FieldErrors {
  email?: string;
}

const initialValues: LoginFormValues = {
  email: ''
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginForm: React.FC = () => {
  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();
  const { loginRedirect } = useAuth();

  const handleChange = (field: keyof LoginFormValues) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues(prev => ({ ...prev, [field]: event.target.value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

   const validate = async (): Promise<boolean> => {
    const trimmedEmail = values.email.trim();
    const newErrors: FieldErrors = {};
    if (!trimmedEmail) {
      newErrors.email = "Username is required";
      setErrors(newErrors);
      return false;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      newErrors.email = "Enter a valid email";
      setErrors(newErrors);
      return false;
    }
    try {
      const isExistingCustomer = await get<boolean>(
        cascadeDafoNowURLs().login.validateLoginEmail,
        { email: trimmedEmail }
      );

      if (!isExistingCustomer) {
        newErrors.email = "Username does not exist, please sign up.";
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.error("Validate login email request failed:", error);
      }
      // Show a generic error to the user
      newErrors.email =
        "We were unable to validate this username. Please try again.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
   const handleLoginSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setIsSubmitting(true);
    if (!await validate()) {
      setIsSubmitting(false);
      return;
    }
    // Small delay to ensure loading overlay is visible before redirect
    // This prevents the blank white screen flash
    setTimeout(() => {
      void loginRedirect(values.email).finally(() => {
        setIsSubmitting(false);
      });
    }, 500);
  };

  const toggleForm = () => {
    navigate("/sign-up");
  };

  return (
    <Box
      component="form"
      onSubmit={handleLoginSubmit}
      noValidate
      sx={{ px: 2 }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 500,
          fontSize: 18,
          textAlign: "left",
          mt: 1,
          mb: 1,
        }}
      >
        Login
      </Typography>
      <Box sx={{ position: "relative" }}>
        <FormInput
          name="username"
          label="Username"
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          error={Boolean(errors.email)}
          helperText={errors.email}
          inputProps={{ "aria-label": "Email" }}
        />
      </Box>

      <PrimaryButton
        type="submit"
        disabled={isSubmitting}
        sx={{
          fontSize: 16,
          fontWeight: 500,
          borderRadius: "8px",
          height: 48,
          marginTop: '20px'
        }}
      >
        {isSubmitting ? "Logging in…" : "Login"}
      </PrimaryButton>

      <Box
        sx={{
          mt: 1,
          textAlign: "center",
          fontSize: 16,
        }}
      >
        <span>Don&apos;t have an account? </span>
        <span
          style={{
            fontWeight: 600,
            fontSize: 16,
            color: "#0088CB",
            cursor: "pointer",
            paddingLeft: "6px",
          }}
          onClick={() => toggleForm()}
        >
          Sign Up
        </span>
      </Box>
    </Box>
  );
};

export default LoginForm;
