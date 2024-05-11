import * as React from "react";
import {Box} from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import SwipeableViews from "react-swipeable-views";
import ubicationSvg from "../../assets/svgs/ubication.svg";
import downArrow from "../../assets/svgs/downArrow.svg";
import upArrow from "../../assets/svgs/upArrow.svg";
import whatsappSvg from "../../assets/svgs/whatsapp.svg";
import facebookSvg from "../../assets/svgs/facebook.svg";
import instagramSvg from "../../assets/svgs/instagram.svg";
import mailSvg from "../../assets/svgs/mail.svg";
/* 
<CardProviders
        title={"Lavanda"}
        description={
          "Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella."
        }
        category={"Cosmetica natural"}
        ubication={"Mina Clavero, Cordoba"}
        instagram={"https://web.whatsapp.com/"}
        facebook={"https://web.whatsapp.com/"}
        email={"https://web.whatsapp.com/"}
        whatsapp={"https://web.whatsapp.com/"}
        firstImage={{ imageDate: firsImage, categoryPost: "Bienestar" }}
        secondImage={
            { imageDate: "../assets/images/a45d3fdab035379810b3564aa3ca08bd.webp", categoryPost: "Bienestar" }
        } !IMPORTANTE NO ACEPTA IMAGENES RELATIVAS ⬆⬆⬆
        thirdImage={image3}

        SI ACEPTA:  import firsImage from "./assets/images/4989818dea0524d2fb0186ddb4f48bb3.webp";
                    const image1 = {imageDate: firsImage, categoryPost: "Bienestar"}
       
      />
*/

export const CardProviders = ({
  title,
  description,
  category,
  whatsapp,
  instagram,
  facebook,
  email,
  firstImage,
  secondImage,
  thirdImage,
  imageProvider,
  categoryImage,
  country,
  province,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [extendInfo, setExtendInfo] = React.useState(false);
  let maxSteps;
  let images;
  if (imageProvider) {
    maxSteps = imageProvider.length;
  } else {
    images = [firstImage, secondImage, thirdImage].filter((image) => image);
    maxSteps = images.length;
  }
  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const extend = () => {
    setExtendInfo(!extendInfo);
  };
  return (
    <main
      style={{
        backgroundColor: "#eaeaea",
        borderRadius: "16px",
        padding: "16px",
      }}
    >
      <div>
        <Box style={{ maxWidth: 400, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              alignSelf: "flex-end",
              background: "transparent",
              border: "2px solid #00a364",
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "4px",
              padding: "3px",
              paddingInline: "18px",
            }}
          >
            <Typography
              sx={{ color: "#4E169D" }}
              style={{
                color: "#4E169D",
                fontSize: "16px",
                fontFamily: "Nunito",
              }}
            >
              {categoryImage ? categoryImage : images[activeStep].categoryPost}
            </Typography>
          </div>

          {imageProvider ? (
            <SwipeableViews
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {imageProvider.map((imageMap, index) => (
                <div
                  key={crypto.randomUUID()}
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
                      src={imageMap.imageDate}
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
      </div>
      <section
        style={{
          background: "transparent",
          color: "#000",
        }}
      >
        <h2 style={{ textAlign: "initial", margin: 0 }}>{title}</h2>
        <h4 style={{ textAlign: "initial", margin: 0, color: "#4e169d" }}>
          {category.name}
        </h4>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={ubicationSvg} alt="icon ubication" />
          <h4 style={{ margin: 0, fontSize: "20px", alignItems: "center" }}>
            {province}, {country}
          </h4>
        </div>
      </section>
      <section style={{ maxWidth: "400px" }}>
        {extendInfo ? (
          <section>
            <p style={{ color: "#000", fontSize: "16px", textAlign: "center" }}>
              {description}
            </p>
            <h2 style={{ textAlign: "initial", margin: 0, color: "#000" }}>
              Contactanos
            </h2>
            <footer
              style={{
                display: "flex",
                flex: 4,
                marginTop: "15px",
                justifyContent: "space-between",
              }}
            >
              {whatsapp ? (
                <div style={{ flex: 1 }}>
                  <a href={whatsapp} style={{ textAlign: "center" }}>
                    <div style={{ textAlign: "center" }}>
                      <img src={whatsappSvg} alt="whatsapp icon" />
                    </div>
                    <h5
                      style={{
                        margin: 0,
                        color: "#4e169d",
                        textAlign: "center",
                      }}
                    >
                      WhatsApp
                    </h5>
                  </a>
                </div>
              ) : (
                ""
              )}
              {instagram ? (
                <div style={{ flex: 1 }}>
                  <a href={instagram}>
                    <div style={{ textAlign: "center" }}>
                      <img src={instagramSvg} alt="instagram icon" />
                    </div>

                    <h5
                      style={{
                        margin: 0,
                        color: "#4e169d",
                        textAlign: "center",
                      }}
                    >
                      Instagram
                    </h5>
                  </a>
                </div>
              ) : (
                ""
              )}
              {facebook ? (
                <div style={{ flex: 1 }}>
                  <a href={facebook}>
                    <div style={{ textAlign: "center" }}>
                      <img src={facebookSvg} alt="facebook icon" />
                    </div>
                    <h5
                      style={{
                        margin: 0,
                        color: "#4e169d",
                        textAlign: "center",
                      }}
                    >
                      Facebook
                    </h5>
                  </a>
                </div>
              ) : (
                ""
              )}
              {email ? (
                <div style={{ flex: 1 }}>
                  <a href={email}>
                    <div style={{ textAlign: "center" }}>
                      <img src={mailSvg} alt="email icon" />
                    </div>
                    <h5
                      style={{
                        margin: 0,
                        color: "#4e169d",
                        textAlign: "center",
                      }}
                    >
                      Mail
                    </h5>
                  </a>
                </div>
              ) : (
                ""
              )}
            </footer>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => extend()}
                style={{ backgroundColor: "transparent" }}
              >
                <img src={upArrow} alt="icon arrow down" />
              </button>
            </div>
          </section>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => extend()}
              style={{ backgroundColor: "transparent" }}
            >
              <img src={downArrow} alt="icon arrow down" />
            </button>
          </div>
        )}
      </section>
    </main>
  );
};
