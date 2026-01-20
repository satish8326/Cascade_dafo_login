import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PrimaryButton from "./PrimaryButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ContactsSearchDropdown } from "./Common/ContactsSearchDropdown";
import CaptchaComp from "./Common/CaptchaComp";
import { screens } from "./SignUp/model";
import { useMutation } from "@tanstack/react-query";
import { ExistingUserSignUp } from "../api/modules/loginSignup/signup-service";
import CommonLoader from "./Loaders/CommonLoader";

interface NameSearchFormProps {
  setActiveScreen: (screenName?: string) => void;
  customerId: string;
  setAlertModel?: any;
}

const NameSearchForm: React.FC<NameSearchFormProps> = ({
  setActiveScreen,
  setAlertModel,
  customerId,
}) => {
  const [error, setError] = useState<string>("");
  const [captchaError, setCaptchaError] = useState<string>("");
  const [selectedContact, setSelectedContact] = useState<any>({});
  const [isCaptchaEnabled, setIsCaptchaEnabled] = useState<any>({
    checked: false,
    isValid: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setError("");
    if (!selectedContact) {
      setError("Please select a name from the list");
      return;
    } else if (isCaptchaEnabled?.checked === false) {
      setCaptchaError("Please verify if you are a human");
      return;
    } else if (isCaptchaEnabled?.isValid === false) return;
    void existingUserSignUp(selectedContact);
  };

  // ........................API..................//

  const { isPending: isSigningLoading, mutate: existingUserSignUp } =
    useMutation({
      mutationFn: ExistingUserSignUp,
      onSuccess: (response) => {
        if (response) {
          setActiveScreen(screens.existingContactConfirmation);
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
  // ...............//

  return (
    <>
      <CommonLoader loading={isSigningLoading} />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ px: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}
        >
          <ArrowBackIcon
            sx={{
              mr: 1,
              fontSize: 21,
              cursor: "pointer",
            }}
            onClick={() => setActiveScreen(screens.signUp)}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 500,
              fontSize: 21,
              textAlign: "left",
              mt: 1,
              mb: 1,
            }}
          >
            Sign up
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            mb: 2,
            color: "text.secondary",
            fontSize: 16,
          }}
        >
          Just pick your name from the list to finish signing up.
        </Typography>

        <Box sx={{ position: "relative", mb: 2 }}>
          <ContactsSearchDropdown
            error={error}
            setError={setError}
            customerId={customerId}
            selectedContact={selectedContact}
            setSelectedContact={setSelectedContact}
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
            mb: 2,
            height: 48,
          }}
        >
          {"Sign up"}
        </PrimaryButton>

        <Box
          sx={{
            textAlign: "center",
            fontSize: 13,
          }}
        >
          <span>Your name&apos;s not on the list? </span>
          <span
            style={{
              fontWeight: 600,
              fontSize: 16,
              color: "#0088CB",
              cursor: "pointer",
              paddingLeft: "6px",
              textDecoration: "underline",
            }}
            onClick={() => setActiveScreen(screens.addNewContact)}
          >
            Register as New
          </span>
        </Box>
      </Box>
    </>
  );
};

export default NameSearchForm;
