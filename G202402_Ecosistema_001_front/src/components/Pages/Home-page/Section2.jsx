import React, { useState } from "react";
import { Button, Link } from "@mui/material";
import "../../../assets/styles/Section2.css";
import { Register } from "../../register";
import { GoogleOAuthProvider } from "@react-oauth/google";

function Section2({ navigate }) {
  const [register, setRegister] = useState(false);
  const openRegister = () => {
    setRegister(!register);
  };
  return (
    <section className="content-container" style={{margin:"0 auto"}}>
      <div className="div-section2" style={{marginTop: 75}}>
        <div className="h2-layout">
          <h2 className="h2-section2">¿Qué son las empresas de impacto?</h2>
        </div>
        <div className="psection2-layout">
          <p className="p-section2">
            Son organizaciones con un compromiso fundamental con la generación
            de un impacto positivo en la sociedad y el medio ambiente como parte
            integral de su modelo de negocio.
          </p>
        </div>
      </div>
      <div className="div-section3" style={{marginBottom: 35}}>
        <p className="p-section3">
          ¿Querés formar parte de la Red de impacto ECO como Proveedor?
        </p>

        <GoogleOAuthProvider clientId="635348494787-h0u5sf8bqtac38es53mdgjjvstnd72ar.apps.googleusercontent.com">
          <Register active={register} functionActive={openRegister} />
          <Button
            style={{
              backgroundColor: "#4E169D",
              color: "#FFFFFF",
              textAlign: "center",
              display: "inline-block",
              fontFamily: "Nunito",
              fontSize: "16px",
              fontWeight: "700",
              lineHeight: "20px",
              letterSpacing: "0em",
              width: "152px",
              height: "40px",
              padding: "10px 24px",
              borderRadius: "100px",
              gap: "10px",
              textTransform: "none",
              alignSelf: "center",
            }}
            variant="contained"
            color="primary"
            onClick={openRegister}
          >
            Registrate
          </Button>
        </GoogleOAuthProvider>
      </div>
    </section>
  );
}

export default Section2;
