import { Box, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { putProviderState } from "../../utils/services/providerService";
import { Alerts } from "../Reusable/alerts";
const FeedbackTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      color: "#222222",
      borderColor: "#222222",
      borderWidth: "1px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#222222",
    },
  },
});
const FeedbackButton = styled(Button)({
  color: "#FAFAFA",
  borderRadius: 50,
  backgroundColor: "#4E169D",
  "&.Mui-disabled": {
    backgroundColor: "#505050",
    color: "#FAFAFA",
  },
  "&:hover": {
    backgroundColor: "#663399",
  },
});
export default function FormFeedback({ getFeedback, info = "", id, state }) {
  const [feedback, setFeedback] = useState(info);
  const [activeModalError, setActiveModalError] = useState(false);
  const [activeModalSuccess, setActiveModalSuccess] = useState(false);
  const handleModalToggleError = () => {
    setActiveModalError(!activeModalError);
  };
  const handleModalToggleSuccess = () => {
    setActiveModalSuccess(!activeModalSuccess);
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    const storage = localStorage.getItem("token");
    if (storage) {
      const response = await putProviderState({
        id,
        state,
        feedback,
        token: storage,
      });
      if (response != false) {
        handleModalToggleSuccess();
      } else {
        handleModalToggleError();
      }
    }
  };
  /* const handleClick = () => {
    getFeedback(feedback.trim());
  }; */
  const handleChange = (e) => {
    setFeedback(e.target.value);
  };
  const success = () =>{
    window.location.href = "/dashboard/proveedores"
  }
  return (
    <Box
      component="form"
      onSubmit={handlerSubmit}
      width={328}
      marginInline={"auto"}
    >
      <FeedbackTextField
        onChange={handleChange}
        id="feedback"
        type="text"
        value={feedback}
        placeholder="Devolución al Proveedor (Obligatorio)."
        variant="filled"
        fullWidth
        multiline
        focused
        helperText="Máximo 300 caracteres"
        minRows={10}
        sx={{ mt: 2 }}
        inputProps={{
          maxLength: 300,
        }}
        FormHelperTextProps={{
          style: { margin: "8px", color: "#222222" },
        }}
      />
      <div
        name={"counter"}
        style={{
          position: "relative",
          left: "120px",
          top: "-30px",
          color: "#222222",
          fontSize: 12,
        }}
      >
        {feedback.trim().length}/300
      </div>
      <FeedbackButton
        type="submit"
        onClick={handlerSubmit}
        disabled={feedback.trim().length == 0}
        fullWidth
      >
        Enviar
      </FeedbackButton>
      <Alerts
        title={"Lo sentimos, la devolución no pudo ser enviada."}
        description={"Por favor, volvé a intentarlo."}
        isError={true}
        active={activeModalError}
        operation={handlerSubmit} 
        functionActive={handleModalToggleError}
        actionName={"Intentar de nuevo"}
      />
      <Alerts
        title={"Devolución enviada con éxito"}
        isError={false}
        active={activeModalSuccess}
        operation={success}
        functionActive={handleModalToggleSuccess}
      />
    </Box>
  );
}
