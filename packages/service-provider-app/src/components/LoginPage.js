import React from "react";
import Link from "@material-ui/core/Link";
import Snackbar from "@material-ui/core/Snackbar";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import MyGoogleLoginButton from "./GoogleLoginButton";
import { GOOGLE_AUTH_URL } from "../constants";

export default function LoginPage() {
  const errorMessage = useSelector((state) => state.profileReducer.error);
  const [open, setOpen] = React.useState(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const loginButton = () => (
    <Box ml={4} mr={4} display="flex" justifyContent="center">
      <Link href={GOOGLE_AUTH_URL}>
        <MyGoogleLoginButton />
      </Link>
    </Box>
  );
  const snackBar = (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={6000}
      handleClose={handleClose}
      message={errorMessage}
    />
  );
  const logo = (
    <Box m={3} mt={5} display="flex" justifyContent="center">
      <img width="80%" src="/assets/images/logo.png" />
    </Box>
  );
  if (errorMessage) {
    return (
      <div>
        {logo}
        {loginButton()}
        {snackBar}
      </div>
    );
  }
  return (
    <div>
      {logo}
      {loginButton()}
    </div>
  );
}
