import { Box, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import confirmationImage from "../../assets/confirmation.svg";
import SubtitleText from "../Common/SubtitleText";

interface Props {
  infoText: any;
}
const ConfirmationScreen: React.FC<Props> = ({ infoText }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        py: 2,
      }}
    >
      <img src={confirmationImage} alt="" height={211} width={311} />
      <Typography
        variant="h5"
        sx={{
          fontWeight: 500,
          fontSize: 24,
          textAlign: "center",
          mt: 2,
        }}
      >
        Sign up Complete
      </Typography>
      <SubtitleText
        subtitleText="Thank you for helping kids live happier, healthier lives"
        sx={{ fontSize: 17, mt: 2, letterSpacing: "0.4px" }}
      />
      {infoText}
      <Link
        component="button"
        type="button"
        sx={{
          fontWeight: 400,
          fontSize: 17,
          textDecoration: "underline",
          color: "#0088CB",
        }}
        onClick={() => {}}
      >
        Go to Login
      </Link>
    </Box>
  );
};

export default ConfirmationScreen;
