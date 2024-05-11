import * as React from "react";
import {Box} from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import SwipeableViews from "react-swipeable-views";
import Popover from "@mui/material/Popover";
import Button from '@mui/material/Button';
import { useState } from "react"; 
import { deletePost, updateViews } from "../../utils/services/productService";
import { UserToken } from "../../utils/contexts";
import { useContext } from "react";
import { useEffect } from "react";
import Options from "../../assets/svgs/options.svg";
/* 
<Posts
        title={"Lavanda"}
        description={
          "Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella."
        }
        firstImage={{ imageDate: firsImage, categoryPost: "Bienestar" }}
        secondImage={
            { imageDate: "../assets/images/a45d3fdab035379810b3564aa3ca08bd.webp", categoryPost: "Bienestar" }
        } !IMPORTANTE NO ACEPTA IMAGENES RELATIVAS ⬆⬆⬆
        thirdImage={image3}

        SI ACEPTA:  import firsImage from "./assets/images/4989818dea0524d2fb0186ddb4f48bb3.webp";
                    const image1 = {imageDate: firsImage, categoryPost: "Bienestar"}
       
      />
*/
function text(texto, large) {
  if (texto.length > large) {
    return texto.substring(0, large) + "...";
  } else {
    return texto;
  }
}

export const Posts = ({
  idPost,
  title,
  description,
  time,
  firstImage,
  secondImage,
  thirdImage,
  isAdmin,
  deleted,
  imagesPost,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [extendInfo, setExtendInfo] = useState(false);
  const [textLarge, setTextLarge] = useState(false);
  const [descriptionText, SetDescriptionText] = useState(description);
  const [deletedText, setDeletedText] = useState(false);
  const { token, setToken } = useContext(UserToken);
  let maxSteps;
  let images;
  if (imagesPost) {
    maxSteps = imagesPost.length;
  } else {
    images = [firstImage, secondImage, thirdImage].filter((image) => image);
    maxSteps = images.length;
  }

  useEffect(() => {
    if (deleted) {
      setDeletedText(true);
    }
  }, []);
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const extend = () => {
    setTextLarge(!textLarge);
    if (textLarge == false) {
      updateView();
    }
  };
  const updateView = async () => {
    const storage = localStorage.getItem("token")
    await updateViews({ id: idPost, token: storage });
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage && !token) {
      setToken(storage);
    }
  }, []);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const hidePost = async () => {
    console.log(idPost);
    const response = await deletePost({ idPost, token });
    if (response != false) {
      setDeletedText(!deletedText);
    }
  };
  return (
    <main
      style={{
        backgroundColor: "#eaeaea",
        borderRadius: "16px",
        padding: "16px",
        maxWidth: " 360px",
        height: "auto",
        marginBottom: 10,
        marginTop: 10,
      }}
    >
      <section
        style={{
          background: "transparent",
          color: "#000",
          display: "flex",
          flexDirection: "row",
          flex: 5,
        }}
      >
        <h2
          style={{
            textAlign: isAdmin ? "initial" : "center",
            margin: 0,
            flex: isAdmin ? 4 : 5,
          }}
        >
          {title}
        </h2>
        {isAdmin ? (
          <div style={{ flex: isAdmin ? 1 : 0 }}>
            <Button
              onClick={handleClick}
              aria-describedby={id}
              style={{ padding: 0, justifyContent: "flex-end" }}
            >
              <img src={Options} alt="select options" />
            </Button>
          </div>
        ) : (
          ""
        )}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
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
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ flex: 1 }}>
                <button
                  style={{
                    paddingInline: 15,
                    margin: 0,
                    backgroundColor: "transparent",
                  }}
                  onClick={() =>
                    (window.location.href = `/publicaciones/edit/${idPost}`)
                  }
                >
                  <h4 style={{ color: "#000", margin: 0 }}>Editar</h4>
                </button>
              </div>
              <div style={{ flex: 1 }}>
                <button
                  style={{
                    paddingInline: 15,
                    margin: 0,
                    backgroundColor: "transparent",
                  }}
                  onClick={() => hidePost()}
                >
                  <p style={{ color: "#000", margin: 0 }}>
                    {deletedText ? "Mostrar" : "Ocultar"}
                  </p>
                </button>
              </div>
            </div>
          </section>
        </Popover>
      </section>

      <Box style={{ maxWidth: 400, display: "flex", flexDirection: "column" }}>
        {imagesPost ? (
          <SwipeableViews
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {imagesPost.map((imageMap, index) => (
              <div
                key={index}
                style={{
                  justifyContent: "center",
                  height: "170px",

                  overflow: "hidden",
                }}
              >
                {Math.abs(activeStep - index) <= 2 ? (
                  <img
                    src={imageMap.url}
                    style={{
                      height: "100%",
                      width: "100%",
                      /* height: imageMap.height,
                      width:imageMap.width, */
                      display: "block",
                      overflow: "hidden",

                      objectFit: "cover",
                      borderTopLeftRadius: "16px",
                      borderBottomLeftRadius: "16px",
                      borderBottomRightRadius: "16px",
                    }}
                  ></img>
                ) : null}
              </div>
            ))}
          </SwipeableViews>
        ) : (
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
                  height: "170px",
                  overflow: "hidden",
                }}
              >
                {Math.abs(activeStep - index) <= 2 ? (
                  <img
                    src={imageMap}
                    style={{
                      height: "100%",
                      display: "block",
                      overflow: "hidden",
                      width: "100%",
                      objectFit: "cover",
                      borderTopLeftRadius: "16px",
                      borderBottomLeftRadius: "16px",
                      borderBottomRightRadius: "16px",
                    }}
                  ></img>
                ) : null}
              </div>
            ))}
          </SwipeableViews>
        )}
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          style={{ justifyContent: "center", background: "transparent" }}
        />
      </Box>
      <section
        style={{
          background: "transparent",
          color: "#000",
          textAlign: "initial",
        }}
      >
        <h5>{time}</h5>

        <div>
          <div
            style={{ whiteSpace: "break-spaces", textOverflow: "clip" }}
            dangerouslySetInnerHTML={{
              __html: textLarge ? descriptionText : text(description, 200),
            }}
          ></div>
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            onClick={extend}
            style={{
              backgroundColor: "transparent",
              alig: "center",
              color: "#4E169D",
            }}
          >
            {textLarge ? "Ver menos" : "Ver más"}
          </button>
        </div>
      </section>
    </main>
  );
};
