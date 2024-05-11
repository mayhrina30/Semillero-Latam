import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ExpandImage } from "../Reusable/ExpandImage";
import RightArrow from "../../assets/svgs/rightArrow.svg";
import FormFeedback from "./FormFeedback";
import { useEffect } from "react";
import { InfoProvider } from "../Dashboard/provider/InfoProvider";
export const FormStateProvider = ({ operation, token, provider }) => {
  /* deberia recibir el objeto del provedor y  setearlo en el form*/
  const [state, setState] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [feedback, setFeedback] = React.useState("")
  const [isEditing, setEditing] = React.useState(true)

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const HandleOnClick = () => {
    operation();
  };
  const handleChange = (event) => {
    setState(event.target.value);
    setEditing(true)
  };
  const handleFeedback = (data) => {
    setFeedback(data)
  }
  const handleEditing = () =>{
    setEditing(false)
  }
  useEffect(()=>{
    if(provider.state === "DENIED" || provider.state === "REQUIRES_CHANGES" || provider.state === "ACCEPTED" ){
      setState(provider.state)
      setFeedback(provider.feedback)
      setEditing(false)
    }
  },[])
  return (
    <>
      <section
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          marginTop: 25,
          marginInline: 'auto'
        }}
      >
        <div style={{ flex: 1 }}>
          <button
            style={{ backgroundColor: "#4E169D" }}
            onClick={() => HandleOnClick()}
          >
            Volver
          </button>
        </div>
        <div style={{ flex: 2, minWidth: 120, marginInline: 15 }}>
          <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Estado</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state}
              label="state"
              onChange={handleChange}
            >
              <MenuItem value={"ACCEPTED"}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      width: 13,
                      height: 13,
                      borderRadius: "50%",
                      backgroundColor: "#1D9129",
                      margin: 6,
                    }}
                  ></div>
                  <h3 style={{ margin: 0, padding: 0 }}>Aprobado</h3>
                </div>
              </MenuItem>
              <MenuItem value={"REQUIRES_CHANGES"}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      width: 13,
                      height: 13,
                      borderRadius: "50%",
                      backgroundColor: "#B86B11",
                      margin: 6,
                    }}
                  ></div>
                  <h3 style={{ margin: 0, padding: 0 }}>En revisión</h3>
                </div>
              </MenuItem>
              <MenuItem value={"DENIED"}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      width: 13,
                      height: 13,
                      borderRadius: "50%",
                      backgroundColor: "#BC1111",
                      margin: 6,
                    }}
                  ></div>
                  <h3 style={{ margin: 0, padding: 0 }}>Denegado</h3>
                </div>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </section>
      <section>
        {(state == "REQUIRES_CHANGES" || state == "DENIED" || state == "ACCEPTED") && (
          <div style={{ marginTop: 20 }}>

            {isEditing ?
              <FormFeedback getFeedback={handleEditing} info={feedback} id={provider.id} state={state} /> :

              <section
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "2px solid #4E169D",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  width: 328,
                  height: 216,
                  marginTop: 40,
                  marginInline: "auto"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "#4E169D",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    width: "100%"
                  }}
                >
                  <div
                    style={{
                      flex: 2,
                      justifyContent: "flex-start",
                      alignContent: "center",
                      textAlign: "start",
                      paddingLeft: 15,
                    }}
                  >
                    <h3 style={{ fontSize: "16px" }}>Devolución al Proveedor</h3>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      justifyContent: "flex-end",
                      alignContent: "center",
                      textAlign: "end",
                    }}
                  >
                    <button onClick={() => setEditing(true)} style={{ backgroundColor: "transparent", display: "flex", alignItems: "center" }}>
                      <h4>Editar</h4>

                      <img src={RightArrow} alt="right arrow" height={15} style={{ alignItems: "center", paddingLeft: 13 }} />
                    </button>
                  </div>
                </div>


                <p style={{ fontWeight: 400, color: "#222222", margin: 10 }}>
                  {feedback}
                </p>
              </section>
            }
          </div>
        )}
      </section>
      <InfoProvider
        name={provider.name}
        category={provider.category.name}
        email={provider.email}
        phone={provider.phone}
        instagram={provider.instagram}
        country={provider.country.name}
        province={provider.province.name}
        city={provider.city}
        description={provider.description}
      />
      <ExpandImage provider={provider} />
    </>
  );
};
