import { Typography } from "@mui/material";

export interface Props {
  subtitleText: string;
  variant?: string;
  sx?: any;
}
const SubtitleText: React.FC<Props> = ({
  subtitleText = "",
  variant = "subtitle1",
  sx = "",
}) => {
  return (
    <Typography
      variant={(variant as any) ?? "subtitle1"}
      sx={{ fontSize: 13, fontWeight: 400, ...sx }}
    >
      {subtitleText}
    </Typography>
  );
};

export default SubtitleText;
