import { Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrimaryButton from "../PrimaryButton";
import CaptchaComp from "../Common/CaptchaComp";
import { screens } from "./model";
import FormInput from "../FormInput";
import { useState } from "react";

interface Props {
  onSubmit?: (selectedContact: string) => Promise<void>;
  setActiveScreen: (screenName?: string) => void;
  onRegisterAsNew?: () => void;
  isSubmitting?: boolean;
}
interface formModel {
  bussinessName?: string;
  contactFirstName?: string;
  contactLastName?: string;
  phone?: string;
  email?: string;
}
const NewAccountRequest: React.FC<Props> = ({ setActiveScreen }) => {
  const [formValues, setFormValues] = useState<formModel>({});
  const [errors, setErrors] = useState<formModel>({});
  const [captchaError, setCaptchaError] = useState<string>("");
  const [isCaptchaEnabled, setIsCaptchaEnabled] = useState<any>({
    checked: false,
    isValid: false,
  });

  const validateFields = () => {
    const newErrors: formModel = {};

    if (!formValues?.bussinessName?.trim()) {
      newErrors.bussinessName = "Business Name is required";
    }

    if (!formValues?.contactFirstName?.trim()) {
      newErrors.contactFirstName = "Contact First Name is required";
    }

    if (!formValues?.contactLastName?.trim()) {
      newErrors.contactLastName = "Contact Last Name is required";
    }

    if (!formValues?.phone?.trim()) {
      newErrors.phone = "Contact Last Name is required";
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
    // else call the api
  };

  const handleChange =
    (field: keyof formModel) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ px: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => setActiveScreen(screens.addNewContact)}
      >
        <ArrowBackIcon sx={{ mr: 1, fontSize: 21 }} />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
            fontSize: 21,
            textAlign: "left",
            mt: 1,
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
            name="bussinessName"
            label="Business Name"
            type="text"
            autoComplete="given-name"
            value={formValues?.bussinessName}
            onChange={handleChange("bussinessName")}
            error={Boolean(errors.bussinessName)}
            helperText={errors.bussinessName}
            inputProps={{ "aria-label": "Business Name", maxLength: 128 }}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormInput
            name="contactFirstName"
            label="Contact First Name"
            type="text"
            autoComplete="given-name"
            value={formValues?.contactFirstName}
            onChange={handleChange("contactFirstName")}
            error={Boolean(errors.contactFirstName)}
            helperText={errors.contactFirstName}
            inputProps={{ "aria-label": "Contact First Name", maxLength: 64 }}
          />
          <FormInput
            name="contactFirstName"
            label="Contact Last Name"
            type="text"
            autoComplete="given-name"
            value={formValues?.bussinessName}
            onChange={handleChange("bussinessName")}
            error={Boolean(errors.bussinessName)}
            helperText={errors.bussinessName}
            inputProps={{ "aria-label": "Contact Last Name", maxLength: 64 }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <FormInput
            name="phone"
            label="PHONE"
            type="text"
            autoComplete="given-name"
            value={formValues?.phone}
            onChange={handleChange("phone")}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
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
          mb: 2,
          height: 48,
        }}
      >
        Send Request
      </PrimaryButton>
    </Box>
  );
};

export default NewAccountRequest;
