import { Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrimaryButton from "../PrimaryButton";
import CaptchaComp from "../Common/CaptchaComp";
import { screens } from "./model";
import FormInput from "../FormInput";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { NewRequestSignUp } from "../../api/modules/loginSignup/signup-service";
import CommonLoader from "../Loaders/CommonLoader";

interface Props {
  setActiveScreen: (screenName?: string) => void;
  onRegisterAsNew?: () => void;
  isSubmitting?: boolean;
  isMobile?: boolean;
  setAlertModel?: any;
}
interface formModel {
  businessName?: string;
  firstName?: string;
  lastName?: string;
  mobilePhone?: string;
  email?: string;
}
const NewAccountRequest: React.FC<Props> = ({
  setActiveScreen,
  isMobile,
  setAlertModel,
}) => {
  const [formValues, setFormValues] = useState<formModel>({});
  const [errors, setErrors] = useState<formModel>({});
  const [captchaError, setCaptchaError] = useState<string>("");
  const [isCaptchaEnabled, setIsCaptchaEnabled] = useState<any>({
    checked: false,
    isValid: false,
  });

  const validateFields = () => {
    const newErrors: formModel = {};

    if (!formValues?.businessName?.trim()) {
      newErrors.businessName = "Business Name is required";
    }

    if (!formValues?.firstName?.trim()) {
      newErrors.firstName = "Contact First Name is required";
    }

    if (!formValues?.lastName?.trim()) {
      newErrors.lastName = "Contact Last Name is required";
    }

    if (!formValues?.mobilePhone?.trim()) {
      newErrors.mobilePhone = "Phone is required";
    }

    if (!formValues?.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
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
    if (!validateFields()) {
      return;
    }
    void newAccountRequest(formValues);
  };

  const handleChange =
    (field: keyof formModel) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

  // ........................API..................//

  const { isPending: accountReqLoading, mutate: newAccountRequest } =
    useMutation({
      mutationFn: NewRequestSignUp,
      onSuccess: (response) => {
        if (response) {
          setActiveScreen(screens.newAccountConfirmation);
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
      <CommonLoader loading={accountReqLoading} />
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ px: { lg: 2, sm: 0 } }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            my: isMobile ? 0 : 1,
          }}
          onClick={() => setActiveScreen(screens.addNewContact)}
        >
          <ArrowBackIcon sx={{ mr: 1, fontSize: isMobile ? 16 : 21 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 500,
              fontSize: isMobile ? 16 : 21,
              textAlign: "left",
            }}
          >
            New Account Request
          </Typography>
        </Box>

        <Box
          sx={{ position: "relative" }}
          component="form"
          onSubmit={handleSubmit}
          noValidate
        >
          <Box sx={{ flex: 1 }}>
            <FormInput
              name="businessName"
              label="Business Name"
              type="text"
              autoComplete="given-name"
              value={formValues?.businessName}
              onChange={handleChange("businessName")}
              error={Boolean(errors.businessName)}
              helperText={errors.businessName}
              inputProps={{ "aria-label": "Business Name", maxLength: 128 }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormInput
              name="firstName"
              label="Contact First Name"
              type="text"
              autoComplete="given-name"
              value={formValues?.firstName}
              onChange={handleChange("firstName")}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
              inputProps={{ "aria-label": "Contact First Name", maxLength: 64 }}
            />
            <FormInput
              name="firstName"
              label="Contact Last Name"
              type="text"
              autoComplete="given-name"
              value={formValues?.lastName}
              onChange={handleChange("lastName")}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
              inputProps={{ "aria-label": "Contact Last Name", maxLength: 64 }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <FormInput
              name="mobilePhone"
              label="PHONE"
              type="text"
              autoComplete="given-name"
              value={formValues?.mobilePhone}
              onChange={handleChange("mobilePhone")}
              error={Boolean(errors.mobilePhone)}
              helperText={errors.mobilePhone}
              inputProps={{ "aria-label": "PHONE", maxLength: 12 }}
            />
          </Box>{" "}
          <Box sx={{ flex: 1 }}>
            <FormInput
              name="email"
              label="EMAIL"
              type="text"
              autoComplete="given-name"
              value={formValues?.email}
              onChange={handleChange("email")}
              error={Boolean(errors.email)}
              helperText={errors.email}
              inputProps={{ "aria-label": "EMAIL" }}
            />
          </Box>
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
          disabled={false}
          sx={{
            fontSize: 16,
            fontWeight: 500,
            borderRadius: "8px",
            my: isMobile ? 1 : 2,
            height: 48,
          }}
        >
          Send Request
        </PrimaryButton>
      </Box>
    </>
  );
};

export default NewAccountRequest;
