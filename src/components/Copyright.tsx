import { Typography, Link } from "@mui/material";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{flex: 1, alignContent: "end"}}{...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.keatdev.com/">
        www.KeatDev.com
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default Copyright