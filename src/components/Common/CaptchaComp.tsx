import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";
interface Props {
  captchaError?: any;
  setIsCaptchaEnabled?: any;
  setCaptchaError?: any;
}
const CaptchaComp: React.FC<Props> = ({
  setIsCaptchaEnabled,
  setCaptchaError,
  captchaError,
}) => {
  const [showCaptcha, setShowCaptcha] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  return (
    <Box sx={{ height: 58 }}>
      {showCaptcha ? (
        <Box
          sx={{
            mt: 1,
            width: "100%",
          }}
        >
          <Turnstile
            siteKey="0x4AAAAAACLeEQVBdQeog0Gn"
            style={{ width: "100%" }}
            onSuccess={(token: any) => {
              setCaptchaToken(token);
              setCaptchaError("");
              setIsCaptchaEnabled({
                checked: true,
                isValid: true,
              });
            }}
            onError={() => {
              setIsCaptchaEnabled({
                checked: true,
                isValid: false,
              });
              setCaptchaToken(null);
            }}
            onExpire={() => {
              setIsCaptchaEnabled({
                checked: true,
                isValid: false,
              });
              setCaptchaToken(null);
            }}
          />
        </Box>
      ) : (
        <FormControlLabel
          control={
            <Checkbox
              checked={showCaptcha}
              onChange={(e) => {
                setShowCaptcha(e.target.checked);
                setIsCaptchaEnabled({
                  checked: e?.target?.checked,
                  isValid: false,
                });
                if (!e.target.checked) {
                  setCaptchaToken(null);
                }
                setCaptchaError("");
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
            <Typography sx={{ fontSize: 13 }}>Verify you are human</Typography>
          }
        />
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
  );
};

export default CaptchaComp;
