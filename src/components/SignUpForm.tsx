import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormInput from "./FormInput";
import PrimaryButton from "./PrimaryButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { screens } from "./SignUp/model";
import CaptchaComp from "./Common/CaptchaComp";
import { useMutation } from "@tanstack/react-query";
import { NewUserSignUp } from "../api/modules/loginSignup/signup-service";
import CommonLoader from "./Loaders/CommonLoader";

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  mobilePhone: string;
  email: string;
}

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  mobilePhone?: string;
  email?: string;
}

interface SignUpFormProps {
  setActiveScreen: (screenName: string) => void;
  setAlertModel?: any;
  customerId?: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  setActiveScreen,
  setAlertModel,
  customerId,
}) => {
  const [values, setValues] = useState<SignUpFormValues>({
    firstName: "",
    lastName: "",
    mobilePhone: "",
    email: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [captchaError, setCaptchaError] = useState<string>("");
  const [isCaptchaEnabled, setIsCaptchaEnabled] = useState<any>({
    checked: false,
    isValid: false,
  });

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

    if (!values.mobilePhone.trim()) {
      newErrors.mobilePhone = "Phone is required";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (isCaptchaEnabled?.checked === false) {
      setCaptchaError("Please verify you are human");
    } else if (isCaptchaEnabled?.isValid === false) return false;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    void newUserSignUp({ ...values, customerId });
  };

  // ........................API..................//

  const { isPending: signUpLoading, mutate: newUserSignUp } = useMutation({
    mutationFn: NewUserSignUp,
    onSuccess: (response) => {
      if (response) {
        setActiveScreen(screens.newContactConfirmation);
      }
    },
    onError: (error: any) => {
      setAlertModel({
        open: true,
        message:
          error?.response?.data?.error ||
          "Something went wrong! Please try again.",
      });
    },
  });
  // ... end... //
  return (
    <>
      <CommonLoader loading={signUpLoading} />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ px: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            cursor: "pointer",
          }}
          onClick={() => setActiveScreen(screens.searchContact)}
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
            name="mobilePhone"
            label="Phone"
            type="tel"
            autoComplete="tel"
            value={values.mobilePhone}
            onChange={handleChange("mobilePhone")}
            error={Boolean(errors.mobilePhone)}
            helperText={errors.mobilePhone}
            inputProps={{ "aria-label": "Phone", maxLength: 12 }}
          />
        </Box>

        <Box sx={{ position: "relative" }}>
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
          <CaptchaComp
            captchaError={captchaError}
            setIsCaptchaEnabled={setIsCaptchaEnabled}
            setCaptchaError={setCaptchaError}
          />
        </Box>
        <PrimaryButton
          type="submit"
          sx={{
            fontSize: 16,
            fontWeight: 500,
            borderRadius: "8px",
            mt: 1,
            height: 48,
          }}
        >
          {"Next"}
        </PrimaryButton>
      </Box>
    </>
  );
};

export default SignUpForm;
