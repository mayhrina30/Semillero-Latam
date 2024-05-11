import * as React from "react";
import {Box} from "@mui/material";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Success from "../../assets/svgs/success.svg";
import Error from "../../assets/svgs/error.svg";
import { useState } from "react";
import { useEffect } from "react";
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
/* 
  Ejemplo de como utilizar:
  <Alerts title={"Hubo un error"} description={"Datos incorrectos"} isError={true}
        active={activeModal} <--- variable que va a cambiar para que se abra el modal
        operation={changeName}<--- si es un error la funcion que tiene que realizar si el usuario le da a "Intentar de nuevo"
        functionActive={handleModalToggle} <--- funcion que cambia el estado de "activeModal"
        actionName= {"Intentar de nuevo"}(default: "Intentar de nuevo") <---- si hay un error que tiene que decir el boton
        />
  ejemplo del estado y la funcion
  const [activeModal, setActiveModal] = useState(false);
  const handleModalToggle = () => {
    setActiveModal(!activeModal);
  };

   */

export const Alerts = ({
  isError,
  title,
  description,
  operation,
  active,
  functionActive,
  actionName,
}) => {
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    if(operation){
      operation()
    }
    functionActive();
  };

  const [dimension, setdimension] = useState({
    ancho: window.innerWidth,
  });
  useEffect(() => {
    {
      active ? setOpen(true) : setOpen(false);
    }
    setError(isError);
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

  const tryAgain = () => {
    {
      operation ? operation() : setOpen(false);
    }
    functionActive();
  };

  return (
    <div>
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
              width: dimension.ancho,
              maxWidth: "500px",
            },
          ]}
        >
          <header style={{ display: "flex", justifyContent: "center" }}>
            <img src={isError ? Error : Success} height={40} width={40} />
          </header>

          <Typography
            id="keep-mounted-modal-description"
            sx={{ mt: 2 }}
            color={"black"}
            textAlign={"center"}
            fontSize={25}
            component="h1"
            fontFamily={"bold"}
          >
            {title}
          </Typography>
          <Typography
            id="keep-mounted-modal-description"
            sx={{ mt: 2 }}
            color={"black"}
            textAlign={"center"}
            fontSize={18}
            component="h2"
          >
            {description ? description : ""}
          </Typography>

          {isError ? (
            <footer style={{ display: "flex" }}>
              <div style={{ flexGrow: 5 }}>
                <button
                  onClick={handleClose}
                  style={{ backgroundColor: "#fff", color: "#4e169d" }}
                >
                  Cancelar
                </button>
              </div>
              <div style={{ flexGrow: 1 }}>
                {actionName ? (
                  <button
                    onClick={tryAgain}
                    style={{ backgroundColor: "#fff", color: "#4e169d" }}
                  >
                    {actionName}
                  </button>
                ) : (
                  <button
                    onClick={tryAgain}
                    style={{ backgroundColor: "#fff", color: "#4e169d" }}
                  >
                    Intentar de nuevo
                  </button>
                )}
              </div>
            </footer>
          ) : (
            <footer
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                marginTop: 10,
              }}
            >
              <button
                onClick={handleClose}
                style={{ backgroundColor: "#fff", color: "#4e169d" }}
              >
                Aceptar
              </button>
            </footer>
          )}
        </Box>
      </Modal>
    </div>
  );
};
