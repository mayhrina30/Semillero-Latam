import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {Box} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import SvgIcon from "@mui/material/SvgIcon";
import DrawerComponent from "../Reusable/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import { Login } from "../login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserToken } from "../../utils/contexts";
import { Popover } from "@mui/material";
import { decodeJWT } from "../../utils/decodeJWT";
import Logo from "../../assets/images/logo.webp"
const useStyles = makeStyles({
  navbar: {
    position: "fixed",
    top: 0,
    width: "360px",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    height: "56px",
    gap: "48px",
  },

  logo: {
    textAlign: "center",
    maxWidth: "100%",
    height: "auto",
    objectFit: "contain",
    objectPosition: "center",
  },
  loginBtn: {
    marginLeft: "8px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    fontFamily: "Nunito",
  },
});

const CustomIcon = () => (
  <SvgIcon
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM7.35 18.5C8.66 17.56 10.26 17 12 17C13.74 17 15.34 17.56 16.65 18.5C15.34 19.44 13.74 20 12 20C10.26 20 8.66 19.44 7.35 18.5ZM18.14 17.12C16.45 15.8 14.32 15 12 15C9.68 15 7.55 15.8 5.86 17.12C4.7 15.73 4 13.95 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 13.95 19.3 15.73 18.14 17.12Z"
      fill="#222222"
    />
    <path
      d="M12 6C10.07 6 8.5 7.57 8.5 9.5C8.5 11.43 10.07 13 12 13C13.93 13 15.5 11.43 15.5 9.5C15.5 7.57 13.93 6 12 6ZM12 11C11.17 11 10.5 10.33 10.5 9.5C10.5 8.67 11.17 8 12 8C12.83 8 13.5 8.67 13.5 9.5C13.5 10.33 12.83 11 12 11Z"
      fill="#222222"
    />
  </SvgIcon>
);
const Navbar = ({ isDrawerOpen, toggleDrawer }) => {
  const [active, setActive] = useState(false);
  const { token, setToken } = useContext(UserToken);
  const [logueado, setLogueado] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(undefined);
  const handleClick = (event) => {
    if (isOpen != undefined) {
      setAnchorEl(event.currentTarget);
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  const open = Boolean(isOpen);
  const id = open ? "simple-popover" : undefined;
  useEffect(() => {
    setAnchorEl(null);
    setIsOpen(false);
  }, [logueado]);
  useEffect(() => {
    if (token) {
      setLogueado(true);
      const info = decodeJWT({ token });
      setUserInfo(info);
    }
  }, [token]);
  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
      setLogueado(true);
      const info = decodeJWT({ token: storage });
      setUserInfo(info);
    }
    setAnchorEl(null);
  }, []);
  const activeLogin = () => {
    setActive(!active);
  };
  const logOut = () => {
    setLogueado(false);
    localStorage.removeItem("token");
    setActive(false);
    window.location.href = '/'
  };
  return (
    <Box
      className={classes.navbar}
      style={{ left: 0, width: "100%", zIndex: 1000, display: "flex" }}
    >
      <AppBar
        position="relative"
        style={{
          backgroundColor: "#FFFFFF",
          height: "46px",
          margin: "auto 0",
          boxShadow: "none",
          gap: "48px",
          flex: 1,
        }}
        elevation={0}
      >
        <Toolbar
          style={{
            justifyContent: "space-between",

            display: "flex",
          }}
        >
          <div>
            <IconButton
              edge="start"
              className={classes.menuBtn}
              style={{ color: "rgba(34, 34, 34, 1)", paddingLeft: "8px" }}
              onClick={() => toggleDrawer(!isDrawerOpen)}
            >
              {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </div>
          <div>
            <img
              src={Logo}
              alt="Logo"
              className={classes.logo}
              style={{ width: "152px", height: "40" }}
            />
          </div>
          <div>
            {logueado ? (
              <div>
                <button
                  onClick={handleClick}
                  aria-describedby={id}
                  variant="contained"
                  style={{
                    padding: 0,
                    margin: 0,
                    backgroundColor: "transparent",
                    height: 50,
                  }}
                >
                  {userInfo.picture != null ? (
                    <img
                      src={userInfo.picture}
                      alt="foto de perfil"
                      height={50}
                      width={50}
                      style={{ borderRadius: "50%" }}
                    />
                  ) : (
                    <div style={{ paddingRight: 10 }}>
                      <CustomIcon className={classes.customIcon} /> 
                      <p
                        style={{
                          padding: 0,
                          margin: 0,
                          color: "#000",
                          fontSize: 15,
                        }}
                      >
                        Mi perfil
                      </p>
                    </div>
                  )}
                </button>

                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <section
                    sx={{ p: 2 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 5,
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ padding: 5 }}>
                        <CustomIcon className={classes.customIcon} />
                      </div>

                      <div>
                        <h4 style={{ padding: 0, margin: 0 }}>
                          {userInfo.name + " " + userInfo.lastName}{" "}
                        </h4>
                        <p style={{ padding: 0, margin: 0 }}>{userInfo.sub}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        window.location.href = "/mi-perfil";
                      }}
                      style={{
                        backgroundColor: "transparent",
                        color: "#4E169D",
                        padding: 0,
                      }}
                    >
                      {userInfo.authorities[0] == "ROLE_ADMIN" ? "" : "Mi Perfil"}
                      
                    </button>
                    <button
                      onClick={() => {
                        logOut();
                      }}
                      style={{
                        backgroundColor: "transparent",
                        color: "#4E169D",
                        textAlign: "start",
                        padding: 0,
                      }}
                    >
                      Cerrar sesión
                    </button>
                  </section>
                </Popover>
              </div>
            ) : (
              <GoogleOAuthProvider clientId="635348494787-h0u5sf8bqtac38es53mdgjjvstnd72ar.apps.googleusercontent.com">
                <Login active={active} functionActive={activeLogin} />

                <Button
                  color="inherit"
                  className={classes.loginBtn}
                  style={{
                    color: "rgba(34, 34, 34, 1)",
                    fontWeight: "400",
                    textDecoration: "none",
                    fontFamily: "Nunito",
                    fontSize: "14px",
                    lineHeight: "19px",
                    letterSpacing: "0em",
                    textAlign: "center",
                    textTransform: "none",
                  }}
                  onClick={() => {
                    activeLogin();
                  }}
                >
                  <CustomIcon className={classes.customIcon} />
                  Ingresá
                </Button>
              </GoogleOAuthProvider>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <DrawerComponent isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </Box>
  );
};

export default Navbar;
