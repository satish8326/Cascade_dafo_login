import React, { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormInput from "./FormInput";
import PrimaryButton from "./PrimaryButton";
import CommonLoader from "./Loaders/CommonLoader";
import { SignUpUser } from "../api/modules/loginSignup/signup-service";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { AlertComponent } from "./Common/AlertComponent";
import { Button } from "@mui/material";

interface AccountValidationFormProps {
  onSubmit: (values: {
    accountNumber: string;
    billingZipCode: string;
    customerId?: string;
  }) => Promise<void>;
  onToggleToLogin: () => void;
  isSubmitting: boolean;
}

interface FieldErrors {
  accountNumber?: string;
  billingZipCode?: string;
}

const AccountValidationForm: React.FC<AccountValidationFormProps> = ({
  onSubmit,
  onToggleToLogin,
  isSubmitting,
}) => {
  const [values, setValues] = useState({
    accountNumber: "",
    billingZipCode: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [alertModel, setAlertModel] = useState<any>({
    open: false,
    message: "",
  });
  const [validatAccountCount, setValidAccountCount] = useState<number>(0);

  // const [focusedField, setFocusedField] = useState<string | null>(null);

  const VALIDATION_RULES = {
    accountNumber: (val: string) => {
      if (!val?.trim()) return "Account Number is required";
      if (!/^\d+$/.test(val) || val.length !== 7)
        return "Invalid Account Number.";
      return "";
    },
    billingZipCode: (val: string) => {
      if (!val.trim()) return "Billing Zip Code is required";
      if (!/^[a-zA-Z0-9]+$/.test(val) || val.length < 4 || val.length > 12)
        return "Invalid Billing Zip Code";
      return "";
    },
  };

  const handleChange = (
    field: keyof typeof values,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Inside the component
  const validateValuesOnChange = useCallback(
    (name: string, event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const rule = VALIDATION_RULES[name as keyof typeof VALIDATION_RULES];
      const error = rule ? rule(value) : "";

      setErrors((prev: any) =>
        prev[name] === error ? prev : { ...prev, [name]: error }
      );
    },
    []
  );

  const validate = (): boolean => {
    const newErrors: FieldErrors = {};

    if (!values.accountNumber.trim()) {
      newErrors.accountNumber = "Account Number is required";
    }

    if (!values.billingZipCode.trim()) {
      newErrors.billingZipCode = "Billing Zip Code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    // else signUpUser(values);
    void onSubmit(values);
  };

  // ........................API..................//

  const { isPending: isSigningLoading, mutate: signUpUser } = useMutation({
    mutationFn: SignUpUser,
    onSuccess: (response) => {
      // const mockRes = {
      //   customerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      //   isValid: true,
      //   isValidAccountId: true,
      //   enableNewRequest: false,
      //   isActive: true,
      //   responseMessage: "string",
      // };
      if (response?.data?.isValid) {
        onSubmit({ ...values, customerId: response?.data?.customerId });
      } else {
        setAlertModel({
          open: true,
          message: "Invalid Account Number or Billing Zip Code.",
        });
        if (response?.data?.enableNewRequest) {
          //
        }
        // is invalid account
        if (response?.data?.isValidAccountId === false) {
          setErrors({
            accountNumber: "Invalid Account Number.",
            billingZipCode: "",
          });
          setValidAccountCount(validatAccountCount + 1);
        } else if (response?.data?.isActive === false) {
          setAlertModel({
            open: true,
            message:
              "Account Number is not an active account. Contact Customer Support.",
          });
        }
      }
    },
    onError: (error: AxiosError) => {
      console.log(error.response?.data);
    },
  });

  //-------------------------END-------------------------//
  return (
    <>
      <AlertComponent
        severity="error"
        open={alertModel?.open}
        message={alertModel?.message || ""}
        onClose={() => setAlertModel({ open: false, message: "" })}
      />
      <CommonLoader loading={isSubmitting || isSigningLoading} />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ px: 2 }}>
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

        <Box sx={{ position: "relative" }}>
          {/* <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            left: 16,
            top: isLabelFloating('accountNumber') ? 8 : '24%',
            transform: isLabelFloating('accountNumber') ? 'translateY(0)' : 'translateY(-50%)',
            transition: 'all 0.2s ease-in-out',
            backgroundColor: 'background.paper',
            px: 0.5,
            color: 'text.secondary',
            fontSize: '0.75rem',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          Account Number
        </Typography> */}
          <FormInput
            name="accountNumber"
            label="Account Number"
            type="text"
            autoComplete="off"
            value={values.accountNumber}
            onChange={(e: any) => {
              handleChange("accountNumber", e);
              validateValuesOnChange("accountNumber", e);
            }}
            error={Boolean(errors.accountNumber)}
            helperText={errors.accountNumber}
            inputProps={{ "aria-label": "Account Number" }}
          />
        </Box>

        <Box sx={{ position: "relative", mt: 0 }}>
          {/* <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            left: 16,
            top: isLabelFloating('billingZipCode') ? 8 : '24%',
            transform: isLabelFloating('billingZipCode') ? 'translateY(0)' : 'translateY(-50%)',
            transition: 'all 0.2s ease-in-out',
            backgroundColor: 'background.paper',
            px: 0.5,
            color: 'text.secondary',
            fontSize: '0.75rem',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          Billing Zip Code
        </Typography> */}
          <FormInput
            name="billingZipCode"
            label="Billing Zip Code"
            type="text"
            autoComplete="postal-code"
            value={values.billingZipCode}
            onChange={(e: any) => {
              handleChange("billingZipCode", e);
              validateValuesOnChange("billingZipCode", e);
            }}
            error={Boolean(errors.billingZipCode)}
            helperText={errors.billingZipCode}
            inputProps={{ "aria-label": "Billing Zip Code", maxLength: 12 }}
          />
        </Box>

        <PrimaryButton
          type="submit"
          disabled={isSubmitting}
          sx={{
            fontSize: 16,
            fontWeight: 500,
            borderRadius: "8px",
            mt: 6,
            mb: 2,
            height: 48,
          }}
        >
          Next
        </PrimaryButton>
        {validatAccountCount >= 3 && (
          <Button
            fullWidth
            disabled={false}
            variant="outlined"
            sx={{
              fontSize: 16,
              fontWeight: 500,
              borderRadius: "8px",
              mb: 2,
              height: 48,
            }}
          >
            Request New Account
          </Button>
        )}

        <Box
          sx={{
            textAlign: "center",
            fontSize: 16,
          }}
        >
          <span>Already have an account? </span>
          <span
            style={{
              fontWeight: 600,
              fontSize: 16,
              color: "#0088CB",
              cursor: "pointer",
              paddingLeft: "6px",
            }}
            onClick={onToggleToLogin}
          >
            Log in
          </span>
        </Box>
      </Box>
    </>
  );
};

export default AccountValidationForm;
