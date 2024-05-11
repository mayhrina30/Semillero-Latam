import { useState } from "react";
import RightArrow from "../../assets/svgs/rightArrow.svg";
import { FormStateProvider } from "../Utils/FormStateProvider";
export const ProviderState = ({ state, title, description, provider}) => {
  /* deberia recibir el objeto del provedor y  pasarselo a FormStateProvider*/
  const [active, setActive] = useState(true);
  const HandleClick = () => {
    setActive(!active);
  };
  return (
    <>
      {active ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#EAEAEA",
            width: "328px",
            height: "72px",
            marginInline: "auto",
            marginTop: 25,
            marginBottom: 40,
            borderRadius: 8,
          }}
        >
          <section style={{ flex: 4, padding: 8, alignContent: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                position: "relative",
              }}
            >
              {state === undefined ? (
                ""
              ) : (
                <div
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: "50%",
                    backgroundColor:
                      state === "ACCEPTED"
                        ? "#1D9129": state === "INITIAL_REVIEW"
                        ? "#1D9129"
                        : state === "DENIED"
                        
                        ? "#BC1111"
                        : "#B86B11",
                    margin: 6,
                    display:state === "INITIAL_REVIEW" ? "none": "",
                  }}
                ></div>
              )}

              <h4
                style={{
                  color: "#4E169D",
                  padding: 0,
                  margin: 0,
                  textAlign: "initial",
                  paddingLeft: state === "INITIAL_REVIEW" ? "8px" : "",
                }}
              >
                {title}
              </h4>
              <hr 
                style={{
                  position: "absolute",
                  top: "60%",
                  left: "3%",
                  width: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  borderTop:
                    state === "ACCEPTED"
                      ? "1px solid #1D9129"
                      : state === "INITIAL_REVIEW"
                      ? "1px solid #1D9129"
                      : state === "DENIED"
                      ? "1px solid #BC1111 "
                      : "1px solid #B86B11",
                  
                }}
              />
            </div>
            <div>
              <h4
                style={{
                  color: "#222222",
                  padding: 0,
                  margin: 0,
                  textAlign: "initial",
                  paddingLeft: 7,
                  lineHeight:"25px"
                }}
              >
                {description}
              </h4>
            </div>
          </section>
          <section
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <button
              style={{ backgroundColor: "transparent" }}
              onClick={() => HandleClick()}
            >
              <img src={RightArrow} alt="RightArrow"/>
            </button>
          </section>
        </div>
      ) : (
        <div>
          <FormStateProvider operation={HandleClick} provider={provider} />
        </div>
      )}
    </>
  );
};
