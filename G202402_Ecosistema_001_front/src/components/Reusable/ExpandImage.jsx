import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import SwipeableViews from "react-swipeable-views";
import Modal from "@mui/material/Modal";
import LeftArrow from "../../assets/svgs/leftArrow.svg";
import RightArrow from "../../assets/svgs/rightArrow.svg";
import Zoom from "../../assets/svgs/zoom.svg";
export const ExpandImage = ({ provider }) => {
  const [active, setActive] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const handleOpen = ({index}) => {
    setOpen(true)
    setActiveStep(index)
  };
  const handleClose = () => setOpen(false);
  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  let maxSteps = images ? provider.images.length : 0;
  const expand = () => {
    setActive(!active);
  };
  const handleNext = () => {
    if(activeStep + 1 < maxSteps){
      setActiveStep(activeStep + 1)
    }
  };

  const handleBack = () => {
    if(activeStep - 1 >= 0){
      setActiveStep(activeStep - 1)
    }
  };
  useEffect(() => {
    if (provider.images) {
      setImages(provider.images);
    }
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: 328,
          marginInline: "auto",
        }}
      >
        {images
          ? images.map((image, index) => (
              <div
                style={{ flex: 1, position: "relative" }}
                key={crypto.randomUUID()}
              >
                <button
                  onClick={()=>handleOpen({index})}
                  style={{
                    backgroundColor: "transparent",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <img
                    src={Zoom}
                    alt="boton de Zoom"
                    style={{ position: "absolute", left: "46%", top: "37%" }}
                  />
                  <img
                    src={image.url}
                    alt=""
                    width={104}
                    height={80}
                    style={{ borderRadius: 5 }}
                  />
                </button>
              </div>
            ))
          : ""}
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ backgroundColor: "rgb(81 78 78)" }}
        >
          <Box
            style={{
              maxWidth: 400,
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              p: 4,
            }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>
                <button
                  onClick={handleBack}
                  /* disabled={activeStep === 0} */
                  style={{ backgroundColor: "transparent", marginLeft: 15 }}
                >
                  <img src={LeftArrow} alt="LeftArrow" />
                </button>
              </div>
              <div
                style={{
                  flex: 1,
                  alignContent: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography sx={{ color: "#fff" }}>
                  {activeStep + 1 + "/" + maxSteps}
                </Typography>
              </div>
              <div style={{ flex: 1, textAlign: "end" }}>
                <button
                  onClick={handleNext}
                  /* disabled={activeStep === maxSteps - 1} */
                  style={{ backgroundColor: "transparent", marginRight: 15 }}
                >
                  <img src={RightArrow} alt="RightArrow" />
                </button>
              </div>
            </div>
            <SwipeableViews
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {images.map((imageMap, index) => (
                <div
                  key={index}
                  style={{
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {imageMap  ? (
                    <img
                      src={imageMap.url}
                      style={{
                        height: "100%",
                        display: "block",
                        overflow: "hidden",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    ></img>
                  ) : null}
                </div>
              ))}
            </SwipeableViews>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              style={{ justifyContent: "center", background: "transparent" }}
            />
          </Box>
        </Modal>
      </div>
    </>
  );
};
