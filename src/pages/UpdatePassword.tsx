import SubtitleText from "../components/Common/SubtitleText";
import MainLayout from "../layouts/MainLayout";
import { Box, Card, Typography } from "@mui/material";
import FormInput from "../components/FormInput";
import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";

interface Password {
  newPass?: string;
  confirmPass?: string;
}

const UpdatePassword = () => {
  const initialGridItems = [
    {
      title: "8+",
      isPassed: false,
      subTitle: "Character",
    },
    {
      title: "AA",
      isPassed: false,
      subTitle: "Uppercase",
    },
    {
      title: "aa",
      isPassed: false,
      subTitle: "Lowercase",
    },
    {
      title: "123",
      isPassed: false,
      subTitle: "Number",
    },
    {
      title: "@$#",
      isPassed: false,
      subTitle: "Symbol",
    },
  ];
  const [errors, setErrors] = useState<Password>({});
  const [passValidationRules, setPassValidationRules] =
    useState<any[]>(initialGridItems);
  const [passwordValues, setPasswordValues] = useState<Password>({
    newPass: "",
    confirmPass: "",
  });

  const handleResetPassword = () => {};

  const handlePasswordChange = (
    field: keyof typeof passwordValues,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const updatedValues = { ...passwordValues, [field]: value };

    if (field === "newPass") {
      const updatedRules = initialGridItems?.map((rule) => {
        let isPassed = false;

        switch (rule.subTitle) {
          case "Character":
            isPassed = value.length >= 8;
            break;
          case "Uppercase":
            isPassed = /[A-Z]/.test(value);
            break;
          case "Lowercase":
            isPassed = /[a-z]/.test(value);
            break;
          case "Number":
            isPassed = /[0-9]/.test(value);
            break;
          case "Symbol":
            // Checks for at least one special character
            isPassed = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            break;
          default:
            isPassed = false;
        }

        return { ...rule, isPassed };
      });

      setPassValidationRules(updatedRules);
    }
    if (
      updatedValues?.confirmPass &&
      updatedValues?.newPass !== updatedValues?.confirmPass
    ) {
      setErrors((prev) => ({ ...prev, confirmPass: "Passwords do not match" }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPass: "" }));
    }
    setPasswordValues(updatedValues);
  };

  return (
    <MainLayout hideMenuNavigations={true}>
      <Box
        sx={{
          paddingTop: 4,
          paddingBottom: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 200px)",
          width: "100%",
        }}
      >
        <Card
          sx={{
            borderRadius: "20px",
            backgroundColor: "#ffffff !important",
            color: "inherit",
            boxShadow: "0 8px 16px rgba(15, 23, 42, 0.08)",
            border: "1px solid #E4E6EF",
            width: {
              lg: 655,
              xs: "100%",
              md: "100%",
              sm: "100%",
            },
            height: "auto",
            my: 1,
            px: 1,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              my: 4,
              textAlign: "center",
            }}
          >
            Update Your Password
          </Typography>
          {/* <SubtitleText
            subtitleText=" You need to update your password because this is the first time you
            are signing in."
            sx={{ mb: 2, textAlign: "center" }}
          /> */}
          <SubtitleText
            subtitleText="The password must contain :"
            sx={{ mt: 4, px: 3, textAlign: "left" }}
          />

          <Box
            sx={{
              mt: 4,
              px: 3,
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr 1fr", // 1 column on mobile
                sm: "1fr 1fr", // 2 columns on small screens
                md: "repeat(5, 1fr)", // Exactly 5 columns on desktop
              },
              gap: 2,
            }}
          >
            {passValidationRules?.map((item: any) => (
              <Card
                key={item.id}
                sx={{
                  borderRadius: "4px",
                  border: "1px solid #E4E6EF",
                  height: 80,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SubtitleText
                  subtitleText={item?.title}
                  sx={{
                    color: item?.isPassed ? "#76c445ff" : "",
                    fontSize: "18px !important",
                    fontWeight: "600",
                  }}
                />
                <SubtitleText
                  subtitleText={item?.subTitle}
                  sx={{
                    color: "#79747E",
                    fontWeight: "500",
                  }}
                />
              </Card>
            ))}
          </Box>

          <Box
            component="form"
            onSubmit={handleResetPassword}
            noValidate
            sx={{ px: 3, my: 3 }}
          >
            <FormInput
              name="password"
              label="New Password"
              type="password"
              value={passwordValues.newPass}
              onChange={(e) => {
                handlePasswordChange("newPass", e);
              }}
              error={Boolean(errors.newPass)}
              helperText={errors.newPass}
              sx={{
                "& .MuiInputBase-root": {
                  height: 56,
                  borderRadius: "12px",
                },
              }}
            />
            <FormInput
              name="password"
              label="Confirm Password"
              type="password"
              value={passwordValues.confirmPass}
              onChange={(e) => {
                handlePasswordChange("confirmPass", e);
              }}
              error={Boolean(errors.confirmPass)}
              helperText={errors.confirmPass}
              sx={{
                "& .MuiInputBase-root": {
                  height: 56,
                  borderRadius: "12px",
                },
              }}
            />
            <PrimaryButton
              type="submit"
              disabled={false} // tbchanged
              sx={{
                fontSize: 16,
                fontWeight: 500,
                borderRadius: "12px",
                mt: 3,
                mb: 4,
                height: 48,
              }}
            >
              Update Password
            </PrimaryButton>
          </Box>
        </Card>
      </Box>
    </MainLayout>
  );
};

export default UpdatePassword;
