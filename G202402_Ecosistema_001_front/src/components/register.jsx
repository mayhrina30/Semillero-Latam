import { useContext, useEffect, useState } from "react";
import { googleLogout } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleLogo from "../assets/svgs/google.svg";
import axios from "axios";
import { userGoogle } from "../utils/services/googleLogin";
import hojas from "../assets/images/hojas.png";
import { Box, Modal } from "@mui/material";
import { UserToken } from "../utils/contexts";
import { Alerts } from "./Reusable/alerts";
/* en donde se invoque este componente tiene que tener esto:
<GoogleOAuthProvider clientId="635348494787-h0u5sf8bqtac38es53mdgjjvstnd72ar.apps.googleusercontent.com">
  <Register/>
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
export const Register = ({ active, functionActive }) => {
  const [logged, setlogged] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const { token, setToken } = useContext(UserToken);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const authorizationCode = tokenResponse.access_token;
      const saveUser = await userGoogle({ authorizationCode });
      if (!saveUser) {
        handleError();
      }
      if (saveUser) {
        setToken(saveUser.message);
        localStorage.setItem("token", saveUser.message);
        window.location.href = "/"
      } 
      
    },
  });
  const handleError = () => {
    setError(!error);
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
                <strong>Registrate</strong>
              </h1>
            </div>
            <div
              style={{
                display: "flex",
                color: "#000",
                justifyContent: "center",
              }}
            >
              <h3 style={{ color: "#000", fontSize: "20px" }}>
                Sumate a ECOSistema
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
              <h3 style={{ color: "#000", fontSize:17 }}>
                Registrate con tu cuenta de Google
              </h3>
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
                  padding: "15px",
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
                  Continuá con Google
                </p>
              </button>
            </div>
          </section>
        </Box>
      </Modal>
      <Alerts
        title={"Hubo un error"}
        description={"Puede que usted ya este registrado"}
        isError={true}
        active={error}
        operation={() => googleLogin()}
        actionName={"Intentar de nuevo"}
        functionActive={handleError}
      />
    </>
  );
};
