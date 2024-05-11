import UbicationIcon from "../../assets/svgs/ubication.svg";
import WhatsappIcon from "../../assets/svgs/whatsapp.svg";
import InstagramIcon from "../../assets/svgs/instagram.svg";
import FacebookIcon from "../../assets/svgs/facebook.svg";
import MailIcon from "../../assets/svgs/mail.svg";
import whatsappSvg from "../../assets/svgs/whatsapp.svg";
import facebookSvg from "../../assets/svgs/facebook.svg";
import instagramSvg from "../../assets/svgs/instagram.svg";
import mailSvg from "../../assets/svgs/mail.svg";
import ubicationSvg from "../../assets/svgs/ubication.svg";
import {
  Card as MuiCard,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Posts } from "../Reusable/Posts";
import { CardProviders } from "../Reusable/cardProviders";
import { useState } from "react";
import downArrow from "../../assets/svgs/downArrow.svg";
import upArrow from "../../assets/svgs/upArrow.svg";
const ExtendedCard = ({
  title,
  category,
  subcategory,
  location,
  imageUrl,
  extendedDescription,
  onClose,
  ubication,
  whatsapp,
  instagram,
  facebook,
  email,
}) => {
  const [extendInfo, setExtendInfo] = useState(false);
  const extend = () => {
    setExtendInfo(!extendInfo);
  };
  return (
    <main
      className="extended-card-wrapper"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 10999,
      }}
    >
      <section style={{zIndex: 11999,}}>
        <MuiCard
          className="extended-card"
          style={{
            width: "328px",
            height: "550px",
            padding: "8px",
            gap: "2px",
            borderRadius: "16px",
            backgroundColor: "#EAEAEA",
            position: "relative",
            overflow: "auto",
            zIndex: 12999,
          }}
        >
          <IconButton
            onClick={onClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "8px",
              color: "#222222",
            }}
          >
            <CloseIcon />
          </IconButton>

          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              marginTop: "40px",
            }}
          >
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
                variant="caption"
                style={{
                  color: "#4E169D",
                  fontFamily: "Nunito",
                  fontSize: "13px",
                  fontWeight: 400,
                  lineHeight: "18px",
                  textAlign: "left",
                }}
              >
                {category}
              </Typography>
            </div>
            <div
              style={{
                height: "128px",
                marginBottom: "8px",
                flex:1
              }}
            >
              <img
                src={imageUrl}
                alt="Image"
                style={{
                  width: "100%",
                  height: "128px",
                  objectFit: "cover",
                  borderRadius: "16px 0px 16px 16px",
                }}
              />
            </div>
            <section
              style={{
                background: "transparent",
                color: "#000",
              }}
            >
              <h2 style={{ textAlign: "initial", margin: 0 }}>{title}</h2>
              <h4 style={{ textAlign: "initial", margin: 0, color: "#4e169d" }}>
                {category}
              </h4>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={ubicationSvg} alt="icon ubication" />
                <h4
                  style={{ margin: 0, fontSize: "20px", alignItems: "center", paddingLeft: 5 }}
                >
                  {ubication}
                </h4>
              </div>
            </section>
            <Typography
              variant="body2"
              style={{
                textAlign: "center",
                fontSize: "16px",
                lineHeight: "20px",
                fontFamily: "Nunito",
                fontWeight: "400",
              }}
            >
              {extendedDescription}
            </Typography>
            <div
              style={{ width: "100%", marginTop: "16px", marginBottom: "16px" }}
            >
              <Typography
                variant="h6"
                style={{
                  textAlign: "left",
                  fontFamily: "Nunito",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "25px",
                  color: "#222222",
                  marginBottom: "10px",
                }}
              >
                Contactanos
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {whatsapp ? (
                  <div style={{ flex: 1 }}>
                    <a href={whatsapp}>
                      <img src={whatsappSvg} alt="whatsapp icon" />
                      <h5 style={{ margin: 0, color: "#4e169d" }}>WhatsApp</h5>
                    </a>
                  </div>
                ) : (
                  ""
                )}
                {instagram ? (
                  <div style={{ flex: 1 }}>
                    <a href={instagram}>
                      <img src={instagramSvg} alt="instagram icon" />
                      <h5 style={{ margin: 0, color: "#4e169d" }}>Instagram</h5>
                    </a>
                  </div>
                ) : (
                  ""
                )}
                {facebook ? (
                  <div style={{ flex: 1 }}>
                    <a href={facebook}>
                      <img src={facebookSvg} alt="facebook icon" />
                      <h5 style={{ margin: 0, color: "#4e169d" }}>Facebook</h5>
                    </a>
                  </div>
                ) : (
                  ""
                )}
                {email ? (
                  <div style={{ flex: 1 }}>
                    <a href={email}>
                      <img src={mailSvg} alt="email icon" />
                      <h4 style={{ margin: 0, color: "#4e169d" }}>Mail</h4>
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </CardContent>
        </MuiCard>
      </section>
    </main>
  );
};

export default ExtendedCard;
