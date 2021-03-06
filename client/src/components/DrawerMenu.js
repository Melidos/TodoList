import React, { Component } from "react";

import {
  Button,
  Drawer,
  Container,
  TextField,
  ButtonGroup,
  Fade,
  Switch,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Axios from "axios";

export default class DrawerMenu extends Component {
  state = {
    drawer: false,
    mail: "",
    password: "",
    action: "login",
    registration: false,
    registrationState: null,
    userLogged: null,
    passwordVerification: false,
    mailVerification: false,
    registrationError: "",
  };

  componentDidMount() {
    setTimeout(
      (_) => this.setState({ userLogged: this.props.userLogged }),
      1000
    );
  }

  renderLogged() {
    return (
      <React.Fragment>
        <Button onClick={() => this.setState({ drawer: true })}>
          <svg style={{ width: "24px", height: "24px" }} viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z'
            />
          </svg>
        </Button>
        <Drawer
          anchor='left'
          open={this.state.drawer}
          onClose={() => this.setState({ drawer: false })}
        >
          <Container
            style={{
              width: "300px",
              maxWidth: "80vw",
              paddingTop: "10px",
              paddingBottom: "10px",
              textAlign: "center",
            }}
          >
            Logged in as {this.state.userLogged}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                document.cookie = "authToken=;expires=01/01/1970";
                Axios.get("/api/login/disconnect").then((_) =>
                  this.setState({ userLogged: null })
                );
                window.location.reload();
              }}
            >
              <Button
                color='primary'
                style={{ display: "block", margin: "10px auto 0" }}
                type='submit'
                variant={
                  this.props.darkMode === false ? "outlined" : "contained"
                }
              >
                Log Out
              </Button>
            </form>
            <ButtonGroup
              color='primary'
              fullWidth={true}
              style={{ marginTop: "10px" }}
            >
              <Button
                variant={
                  this.props.darkMode === true ? "contained" : "outlined"
                }
                onClick={this.props.exportToCSV}
              >
                Export
              </Button>
              <Button
                variant={
                  this.props.darkMode === true ? "contained" : "outlined"
                }
                onClick={this.props.importCSV}
              >
                Import
              </Button>
            </ButtonGroup>
            <span>Dark Mode</span>
            <Switch
              onChange={() => this.props.setDarkMode()}
              checked={this.props.darkMode}
            />
          </Container>
        </Drawer>
      </React.Fragment>
    );
  }

  renderNotLogged() {
    return (
      <React.Fragment>
        <Button onClick={() => this.setState({ drawer: true })}>
          <svg style={{ width: "24px", height: "24px" }} viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z'
            />
          </svg>
        </Button>
        <Drawer
          anchor='left'
          open={this.state.drawer}
          onClose={() => this.setState({ drawer: false })}
        >
          <form
            onSubmit={(e) => {
              if (this.state.action === "register") {
                e.preventDefault();
                if (
                  this.state.passwordVerification === true ||
                  this.state.mailVerification === true
                ) {
                  this.setState({
                    registration: true,
                    registrationState: "error",
                    registrationError: "Password or mail is invalide",
                  });
                  setTimeout(
                    (_) => this.setState({ registration: false }),
                    3000
                  );
                } else {
                  Axios.post("/api/login/register", {
                    mail: this.state.mail,
                    password: this.state.password,
                  })
                    .then((_) => {
                      this.setState({
                        registration: true,
                        registrationState: "success",
                      });
                      setTimeout(
                        (_) => this.setState({ registration: false }),
                        3000
                      );
                    })
                    .catch((err) => {
                      this.setState({
                        registration: true,
                        registrationState: "error",
                        registrationError: "Mail already in use",
                      });
                      setTimeout(
                        (_) => this.setState({ registration: false }),
                        3000
                      );
                    });
                }
              } else if (this.state.action === "login") {
                e.preventDefault();
                Axios.post("/api/login/login", {
                  mail: this.state.mail,
                  password: this.state.password,
                })
                  .then((_) => {
                    window.location.reload();
                  })
                  .catch((err) => {
                    this.setState({
                      registration: true,
                      registrationState: "login",
                      registrationError: "Mail or password incorrect",
                    });
                    setTimeout(
                      (_) => this.setState({ registration: false }),
                      3000
                    );
                  });
              }
            }}
          >
            <Container
              style={{
                width: "300px",
                maxWidth: "80vw",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              <TextField
                label='Mail'
                type='text'
                fullWidth={true}
                name='mail'
                error={this.state.mailVerification}
                helperText={
                  this.state.mailVerification === true
                    ? "Enter a valid mail"
                    : ""
                }
                onChange={(e) => {
                  if (/.+@.+\..+/.test(e.target.value) === true)
                    this.setState({ mailVerification: false });
                  else this.setState({ mailVerification: true });
                  this.setState({ mail: e.target.value });
                }}
              />
              <TextField
                label='Password'
                type='password'
                fullWidth={true}
                name='password'
                error={this.state.passwordVerification}
                helperText={
                  this.state.passwordVerification === true
                    ? "Need at least 8 characters"
                    : ""
                }
                onChange={(e) => {
                  e.target.value.length < 8
                    ? this.setState({ passwordVerification: true })
                    : this.setState({ passwordVerification: false });
                  this.setState({ password: e.target.value });
                }}
              />
              <ButtonGroup
                color='primary'
                fullWidth={true}
                style={{ marginTop: "10px" }}
              >
                <Button
                  variant={
                    this.props.darkMode === true ? "contained" : "outlined"
                  }
                  onClick={(_) => this.setState({ action: "login" })}
                  type='submit'
                >
                  Login
                </Button>
                <Button
                  variant={
                    this.props.darkMode === true ? "contained" : "outlined"
                  }
                  onClick={(_) => this.setState({ action: "register" })}
                  type='submit'
                >
                  Register
                </Button>
              </ButtonGroup>
              <Fade in={this.state.registration}>
                <Alert
                  severity={
                    this.state.registrationState === null ||
                    this.state.registrationState === "login"
                      ? "error"
                      : this.state.registrationState
                  }
                >
                  {this.state.registrationState === "success"
                    ? "Registration complete"
                    : this.state.registrationState === "error"
                    ? "Registration failed: " + this.state.registrationError
                    : "Login failed: " + this.state.registrationError}
                </Alert>
              </Fade>
            </Container>
          </form>
        </Drawer>
      </React.Fragment>
    );
  }

  render() {
    return this.state.userLogged ? this.renderLogged() : this.renderNotLogged();
  }
}

//TODO: Adress doesn't exist
//TODO: Wrong password
