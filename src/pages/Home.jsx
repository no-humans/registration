import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserDetails from "./userDetails";
import FormGroup from "@mui/material/FormGroup";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from "@mui/material/Switch";

const defaultTheme = createTheme();

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDetailsArray, setUserDetailsArray] = useState([]);
  // console.log(userDetailsArray, "userDetailsArray");
  const [switchStatus, setSwitchStatus] = useState(true);
  // console.log(switchStatus, "switchStatus");


  useEffect(() => {
    const storedUserDetails = JSON.parse(
      localStorage.getItem("userDetailsArray")
    );

    if (storedUserDetails) {
      setUserDetailsArray(storedUserDetails);
    }
  }, []);

  const handleSwitchToggle = () => {
    setSwitchStatus((prevStatus) => !prevStatus);
  };

  const handleAddAccount = () => {
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    const existingUserDetails =
      JSON.parse(localStorage.getItem("userDetailsArray")) || [];

    const emailExists = existingUserDetails.some(
      (user) => user.email === email
    );
    if (emailExists) {
      alert("Email is already registered.");
      return;
    }

    const nameExists = existingUserDetails.some(
      (user) => user.firstName === firstName && user.lastName === lastName
    );
    if (nameExists) {
      alert("A user with the same first name and last name already exists.");
      return;
    }
    // const PasswordExists = existingUserDetails.some(
    //   (user) => user.password === password
    // );
    // if (PasswordExists) {
    //   alert("This password is already exist");
    //   return;
    // }

    const newUserDetails = {
      firstName,
      lastName,
      email,
      password,
      status: switchStatus === true ? "Active" : "InActive",
    };

    const updatedUserDetailsArray = [...existingUserDetails, newUserDetails];

    localStorage.setItem(
      "userDetailsArray",
      JSON.stringify(updatedUserDetailsArray)
    );

    setUserDetailsArray(updatedUserDetailsArray);
    alert('User Successfully Registered')
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const label = { inputProps: { "aria-label": "Color switch demo" } };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ marginLeft: "3rem" }} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            marginBottom: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography component="h1" variant="h5">
                Add Account
              </Typography>
            </div>
            <div>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      {...label}
                      defaultChecked={switchStatus}
                      color="default"
                      onChange={handleSwitchToggle}
                    />
                  }
                  label={switchStatus === true ? "Active" : "InActive"}
                />
              </FormGroup>
            </div>
          </div>
          <Grid item>
            Already have an account?
            <Link href="#" variant="body2" sx={{ textDecoration: "none" }}>
              Login
            </Link>
          </Grid>{" "}
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label={
                    <Typography variant="body2">
                      I agree to DopSass{" "}
                      <Link
                        href="#"
                        color="primary"
                        sx={{ textDecoration: "none" }}
                      >
                        Terms of services
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="#"
                        color="primary"
                        sx={{ textDecoration: "none" }}
                      >
                        Privacy Policy
                      </Link>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleAddAccount}
            >
              Add your Details
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
      </Container>
      <UserDetails userDetailsArray={userDetailsArray} />
    </ThemeProvider>
  );
};
export default Home;