import { useState } from "react";
import { AlertComponent } from "../components/Common/AlertComponent";
import AccountValidationForm from "../components/AccountValidationForm";
import { useNavigate } from "react-router-dom";
import { screens } from "../components/SignUp/model";
import NameSearchForm from "../components/NameSearchForm";
import ConfirmationScreen from "../components/SignUp/ConfirmationScreen";
import { Typography } from "@mui/material";
import SignUpForm from "../components/SignUpForm";
import NewAccountRequest from "../components/SignUp/NewAccountRequest";
import { useMediaQuery, useTheme } from "@mui/material";
interface Props {
  activeScreen: string;
  setActiveScreen?: any;
}
const SignUpFlow: React.FC<Props> = ({
  activeScreen = "",
  setActiveScreen,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const [alertModel, setAlertModel] = useState<any>({
    open: false,
    message: "",
  });
  const [customerId, setCustomerId] = useState<string>("");
  const handleAfterValidationSuccess = async (values: {
    accountNumber: string;
    billingZipCode: string;
    customerId?: string;
  }): Promise<void> => {
    void values;
    // open search contacts modal
    setCustomerId(values?.customerId ?? "");
    setActiveScreen(screens?.searchContact);
  };

  const handleNavigateBackToLogin = () => navigate("/login");

  return (
    <>
      <AlertComponent
        severity="error"
        open={alertModel?.open}
        message={alertModel?.message || ""}
        onClose={() => setAlertModel({ open: false, message: "" })}
      />
      {activeScreen === screens?.signUp && (
        <AccountValidationForm
          handleAfterValidationSuccess={handleAfterValidationSuccess}
          onToggleToLogin={handleNavigateBackToLogin}
          isSubmitting={false}
          setAlertModel={setAlertModel}
          setActiveScreen={setActiveScreen}
        />
      )}
      {activeScreen === screens?.searchContact && (
        <NameSearchForm
          setActiveScreen={setActiveScreen}
          customerId={customerId}
          setAlertModel={setAlertModel}
        />
      )}

      {activeScreen === screens?.addNewContact && (
        <SignUpForm
          isMobile={isMobile}
          setActiveScreen={setActiveScreen}
          setAlertModel={setAlertModel}
          customerId={customerId}
        />
      )}
      {activeScreen === screens.newAccountRequest && (
        <NewAccountRequest
          setActiveScreen={setActiveScreen}
          isMobile={isMobile}
          setAlertModel={setAlertModel}
        />
      )}
      {activeScreen === screens?.existingContactConfirmation && (
        <ConfirmationScreen
          infoText={
            <Typography
              sx={{
                mt: isMobile ? 1 : 3,
                fontSize: isMobile ? 12 : 17,
                letterSpacing: "0.5px",
                textAlign: "center",
                color: "#2D5499",
              }}
            >
              We've sent you an with
              <span
                style={{ color: "#2D5499", fontWeight: 600, padding: "4px" }}
              >
                email
              </span>
              with
              <span
                style={{ color: "#2D5499", fontWeight: 600, padding: "4px" }}
              >
                first-time login
              </span>
              details.
            </Typography>
          }
          isMobile={isMobile}
        />
      )}
      {activeScreen === screens?.newContactConfirmation && (
        <ConfirmationScreen
          infoText={
            <Typography
              sx={{
                mt: isMobile ? 1 : 3,
                fontSize: isMobile ? 12 : 17,
                letterSpacing: "0.5px",
                textAlign: "center",
              }}
            >
              Our team will
              <span
                style={{ color: "#2D5499", fontWeight: 600, padding: "4px" }}
              >
                review
              </span>
              your information
              <span
                style={{ color: "#2D5499", fontWeight: 600, padding: "4px" }}
              >
                & reach out
              </span>
              shortly with next steps.
            </Typography>
          }
          isMobile={isMobile}
        />
      )}
      {activeScreen === screens.newAccountConfirmation && (
        <ConfirmationScreen
          titleText="Request Sent Successfully"
          infoText={
            <Typography
              sx={{
                mt: isMobile ? 1 : 3,
                fontSize: isMobile ? 12 : 17,
                letterSpacing: "0.5px",
                textAlign: "center",
              }}
            >
              Our team will
              <span
                style={{ color: "#2D5499", fontWeight: 600, padding: "4px" }}
              >
                review
              </span>
              your information
              <span
                style={{ color: "#2D5499", fontWeight: 600, padding: "4px" }}
              >
                & reach out
              </span>
              shortly with next steps.
            </Typography>
          }
          isMobile={isMobile}
        />
      )}
    </>
  );
};

export default SignUpFlow;
