import { useContext, useEffect, useState } from "react";
import { GoogleOAuthProvider, googleLogout } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleLogo from "../assets/svgs/google.svg";
import axios from "axios";
import { LoginBack, userGoogle } from "../utils/services/googleLogin";
import hojas from "../assets/images/hojas.png";
import { Box, Modal } from "@mui/material";
import { UserToken } from "../utils/contexts";
import { decodeJWT } from "../utils/decodeJWT";
import { Alerts } from "./Reusable/alerts";
import { Register } from "./register";
/* en donde se invoque este componente tiene que tener esto:
<GoogleOAuthProvider clientId="635348494787-h0u5sf8bqtac38es53mdgjjvstnd72ar.apps.googleusercontent.com">
  <Login/>
</GoogleOAuthProvider> 
*/
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export const Login = ({ active, functionActive }) => {
  const [logged, setlogged] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [register, setRegister] = useState(false);
  const { token, setToken } = useContext(UserToken);
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const authorizationCode = tokenResponse.access_token;

      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then(async (res) => {
          const final = res.data;
          const response = await LoginBack({ userInfo: final });
          if (response == false) {
            handleError();
          }
          if (response) {
            setToken(response.message);
            localStorage.setItem("token", response.message);
            setOpen(false)
            window.location.href = "/"
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  const handleError = () => {
    setError(!error);
  };
  const openRegister = () => {
    setOpen(!open)
    setError(!error);
    setRegister(!register);
  };
  const handleClose = () => {
    functionActive();
  };
  const [dimension, setdimension] = useState({
    ancho: window.innerWidth,
  });
  useEffect(() => {
    {
      active ? setOpen(true) : setOpen(false);
    }
    function dimensionFunction() {
      setdimension({
        ancho: window.innerWidth - 100,
      });
    }

    window.addEventListener("resize", dimensionFunction);

    return () => {
      window.removeEventListener("resize", dimensionFunction);
    };
  }, [active]);
  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={[
            modalStyle,
            {
              borderRadius: "28px",
              padding: "16px",
              width: dimension.ancho - 80,
              maxWidth: "500px",
            },
          ]}
        >
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              flex: 1,
              padding:15
            }}
          >
            <div
              style={{
                display: "flex",
                color: "#000",
                justifyContent: "center",
              }}
            >
              <h1 style={{ fontSize: "35px", padding: 0, margin: 0 }}>
                <strong>Inicia sesión</strong>
              </h1>
            </div>
            <div
              style={{
                display: "flex",
                color: "#000",
                justifyContent: "center",
              }}
            >
              <h3 style={{ color: "#000", fontSize: "18px" }}>
                Seguí disfrutando de ECOSistema
              </h3>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={hojas} alt="" height={75} width={80} />
            </div>
            <div
              style={{
                display: "flex",
                color: "#000",
                justifyContent: "center",
              }}
            >
              <h3 style={{ color: "#000" }}>Ingresá con tu cuenta de Google</h3>
            </div>
            <div
              style={{
                display: "flex",
                color: "#000",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => googleLogin()}
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyItems: "center",
                  borderRadius: "25px",
                  backgroundColor: "#4e169d",
                  padding: "18px",
                  maxHeight: "50px",
                  fontSize: "18px",
                }}
              >
                <img
                  src={GoogleLogo}
                  alt="Logo de google"
                  style={{
                    backgroundColor: "#fff",
                    padding: "5px",
                    borderRadius: "50%",
                  }}
                />
                <p style={{ paddingLeft: "6px", fontFamily: "Nunito" }}>
                  Continuá con google
                </p>
              </button>
            </div>
          </section>
        </Box>
      </Modal>
      <Alerts
        title={"Hubo un error"}
        description={"No se encuentra registrado"}
        isError={true}
        active={error}
        operation={openRegister}
        actionName={"ir al registro"}
        functionActive={handleError}
      />
      <GoogleOAuthProvider clientId="635348494787-h0u5sf8bqtac38es53mdgjjvstnd72ar.apps.googleusercontent.com">
        <Register active={register} functionActive={openRegister} />
      </GoogleOAuthProvider>
    </>
  );
};
