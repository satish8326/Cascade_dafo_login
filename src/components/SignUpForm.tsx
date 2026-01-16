import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormInput from "./FormInput";
import PrimaryButton from "./PrimaryButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Turnstile } from "@marsidev/react-turnstile";

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
}

interface SignUpFormProps {
  onSubmit: (values: SignUpFormValues) => Promise<void>;
  onToggleToLogin: () => void;
  isSubmitting: boolean;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  onToggleToLogin,
  isSubmitting,
}) => {
  const [values, setValues] = useState<SignUpFormValues>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [captchaError, setCaptchaError] = useState<string>("");
  const [showCaptcha, setShowCaptcha] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleChange =
    (field: keyof SignUpFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const validate = (): boolean => {
    const newErrors: FieldErrors = {};

    if (!values.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!values.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!values.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!captchaToken) {
      setCaptchaError("Please verify you are human");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    void onSubmit(values);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          cursor: "pointer",
        }}
        onClick={onToggleToLogin}
      >
        <ArrowBackIcon sx={{ mr: 1, fontSize: 20 }} />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
            fontSize: 21,
            textAlign: "left",
          }}
        >
          Sign up
        </Typography>
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: "#000000",
          fontSize: 16,
        }}
      >
        Don’t see your name on the list? <br /> Just enter your details to
        finish signing up.
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
        <Box sx={{ position: "relative", flex: 1 }}>
          {/* <Typography
            variant="caption"
            sx={{
              position: "absolute",
              left: 16,
              top: isLabelFloating("firstName") ? 8 : "24%",
              transform: isLabelFloating("firstName")
                ? "translateY(0)"
                : "translateY(-50%)",
              transition: "all 0.2s ease-in-out",
              backgroundColor: "background.paper",
              px: 0.5,
              color: "text.secondary",
              fontSize: "0.75rem",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            First Name
          </Typography> */}
          <FormInput
            name="firstName"
            label="First Name"
            type="text"
            autoComplete="given-name"
            value={values.firstName}
            onChange={handleChange("firstName")}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
            inputProps={{ "aria-label": "First Name", maxLength: 40 }}
          />
        </Box>

        <Box sx={{ position: "relative", flex: 1 }}>
          {/* <Typography
            variant="caption"
            sx={{
              position: "absolute",
              left: 16,
              top: isLabelFloating("lastName") ? 8 : "24%",
              transform: isLabelFloating("lastName")
                ? "translateY(0)"
                : "translateY(-50%)",
              transition: "all 0.2s ease-in-out",
              backgroundColor: "background.paper",
              px: 0.5,
              color: "text.secondary",
              fontSize: "0.75rem",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            Last Name
          </Typography> */}
          <FormInput
            name="lastName"
            label="Last Name"
            type="text"
            autoComplete="family-name"
            value={values.lastName}
            onChange={handleChange("lastName")}
            // onFocus={handleFocus("lastName")}
            // onBlur={handleBlur}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
            inputProps={{ "aria-label": "Last Name", maxLength: 40 }}
          />
        </Box>
      </Box>

      <Box sx={{ position: "relative" }}>
        {/* <Typography
          variant="caption"
          sx={{
            position: "absolute",
            left: 16,
            top: isLabelFloating("phone") ? 8 : "24%",
            transform: isLabelFloating("phone")
              ? "translateY(0)"
              : "translateY(-50%)",
            transition: "all 0.2s ease-in-out",
            backgroundColor: "background.paper",
            px: 0.5,
            color: "text.secondary",
            fontSize: "0.75rem",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          Phone
        </Typography> */}
        <FormInput
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={handleChange("phone")}
          error={Boolean(errors.phone)}
          helperText={errors.phone}
          inputProps={{ "aria-label": "Phone", maxLength: 12 }}
        />
      </Box>

      <Box sx={{ position: "relative" }}>
        {/* <Typography
          variant="caption"
          sx={{
            position: "absolute",
            left: 16,
            top: isLabelFloating("email") ? 8 : "24%",
            transform: isLabelFloating("email")
              ? "translateY(0)"
              : "translateY(-50%)",
            transition: "all 0.2s ease-in-out",
            backgroundColor: "background.paper",
            px: 0.5,
            color: "text.secondary",
            fontSize: "0.75rem",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          Email
        </Typography> */}
        <FormInput
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange("email")}
          error={Boolean(errors.email)}
          helperText={errors.email}
          inputProps={{ "aria-label": "Email" }}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        {!showCaptcha && (
          <FormControlLabel
            control={
              <Checkbox
                checked={showCaptcha}
                onChange={(e) => {
                  setShowCaptcha(e.target.checked);
                  if (!e.target.checked) {
                    setCaptchaToken(null);
                  }
                }}
                sx={{
                  color: "#2d5499",
                  "&.Mui-checked": {
                    color: "#2d5499",
                  },
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: 13 }}>
                Verify you are human
              </Typography>
            }
          />
        )}
        {showCaptcha && (
          <Box sx={{ mt: 1 }}>
            <Turnstile
              siteKey="0x4AAAAAACLeEQVBdQeog0Gn"
              onSuccess={(token: any) => {
                setCaptchaToken(token);
              }}
              onError={() => {
                setCaptchaToken(null);
              }}
              onExpire={() => {
                setCaptchaToken(null);
              }}
            />
          </Box>
        )}
        {captchaError && !captchaToken && (
          <Typography
            variant="caption"
            sx={{
              color: "error.main",
              fontSize: 12,
              display: "block",
              mt: 0.5,
            }}
          >
            {captchaError}
          </Typography>
        )}
      </Box>
      <PrimaryButton
        type="submit"
        disabled={isSubmitting}
        sx={{
          fontSize: 16,
          fontWeight: 500,
          borderRadius: "8px",
          mt: 2,
          height: 48,
        }}
      >
        {"Next"}
      </PrimaryButton>
    </Box>
  );
};

export default SignUpForm;
