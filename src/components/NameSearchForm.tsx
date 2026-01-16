import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PrimaryButton from "./PrimaryButton";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Turnstile } from "@marsidev/react-turnstile";
import { ContactsSearchDropdown } from "./Common/ContactsSearchDropdown";

interface NameSearchFormProps {
  onSubmit: (selectedContact: string) => Promise<void>;
  onToggleToLogin: () => void;
  onRegisterAsNew: () => void;
  isSubmitting: boolean;
}

// Mock names list - in real app, this would come from an API
const mockNames = [
  "John Doe",
  "Jane Smith",
  "Michael Johnson",
  "Emily Davis",
  "Robert Wilson",
  "Sarah Brown",
  "David Miller",
  "Jessica Garcia",
  "Christopher Martinez",
  "Amanda Anderson",
];

const NameSearchForm: React.FC<NameSearchFormProps> = ({
  onSubmit,
  onToggleToLogin,
  onRegisterAsNew,
  isSubmitting,
}) => {
  const [error, setError] = useState<string>("");
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [showCaptcha, setShowCaptcha] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setError("");

    // if (!selectedName) {
    //   setError("Please select a name from the list");
    //   return;
    // }

    if (!captchaToken) {
      setError("Please verify you are human");
      return;
    }

    void onSubmit(selectedContact ?? "");
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
        <ArrowBackIcon sx={{ mr: 1, fontSize: 21 }} />
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
        {/* <Autocomplete<string, false, false, false>
          options={mockNames}
          value={selectedContact}
          onChange={(_, newValue) => {
            setSelectedContact(newValue);
            setError("");
          }}
          onInputChange={(_, newInputValue) =>
            // handleContactSearch(newInputValue)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Enter 3+ letters to search"
              error={Boolean(error && !selectedContact)}
              helperText={error && !selectedContact ? error : ""}
              sx={{
                "& .MuiInputBase-root": {
                  height: 52,
                },
              }}
            />
          )}
        /> */}
        <ContactsSearchDropdown
          setSelectedContact={setSelectedContact}
          setError={setError}
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
                  setError("");
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
                setError("");
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
        {error && !captchaToken && (
          <Typography
            variant="caption"
            sx={{
              color: "error.main",
              fontSize: 12,
              display: "block",
              mt: 0.5,
            }}
          >
            {error}
          </Typography>
        )}
      </Box>

      <PrimaryButton
        type="submit"
        disabled={isSubmitting || !captchaToken}
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
          onClick={onRegisterAsNew}
        >
          Register as New
        </span>
      </Box>
    </Box>
  );
};

export default NameSearchForm;
