import { useState } from "react";
import { Card as MuiCard, CardContent, Typography } from "@mui/material";
import ExtendedProviderCard from "../Utils/ExtendedProviderCard";
import UbicationIcon from "../../assets/svgs/ubication.svg";

const Card = ({
  title,
  category,
  subcategory,
  imageUrl,
  extendedDescription,
  onClick,
  ubication,
  whatsapp,
  instagram,
  facebook,
  email,
}) => {
  const [isExtendedCardOpen, setIsExtendedCardOpen] = useState(false); // Estado para controlar si se abre la ExtendedCard

  const handleCardClick = () => {
    setIsExtendedCardOpen(true); // Abrir el ExtendedCard al hacer clic en la tarjeta
  };

  const handleCloseExtendedCard = () => {
    setIsExtendedCardOpen(false); // Cerrar el ExtendedCard al hacer clic en el botón de cerrar
  };

  return (
    <div style={{ position: "relative", marginBottom: "10px" }}>
      {isExtendedCardOpen ? (
        <ExtendedProviderCard
          title={title}
          category={category}
          subcategory={subcategory}
          ubication={ubication}
          imageUrl={imageUrl}
          extendedDescription={extendedDescription}
          instagram={instagram}
          facebook={facebook}
          email={email}
          whatsapp={whatsapp}
          onClose={handleCloseExtendedCard}
        />
      ) : (
        <div style={{ position: "relative" }}>
          <MuiCard
            style={{
              width: "152px",
              height: "244px",
              borderRadius: "8px",
              cursor: "pointer",
              position: "relative",
              zIndex: 0,
            }}
            onClick={handleCardClick}
          >
            <div
              style={{
                width: "136px",
                height: "136px",
                borderRadius: "8px",
                margin: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={imageUrl}
                alt={title}
                style={{
                  height: "136px",
                  flexShrink: 0,
                  minWidth: "100%",
                  minHeight: " 100%",
                }}
              />
            </div>

            <CardContent
              style={{ position: "relative", zIndex: 1, paddingLeft: "8px" }}
            >
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                style={{
                  fontFamily: "Nunito",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "25px",
                  letterSpacing: "0em",
                  textAlign: "left",
                  color: "#222222",
                  marginBottom: "-4px",
                  marginTop: "-25px",
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{
                  fontFamily: "Nunito",
                  fontSize: "13px",
                  fontWeight: 400,
                  lineHeight: "18px",
                  letterSpacing: "0em",
                  textAlign: "left",
                  color: "#222222",
                  marginBottom: "10px",
                }}
              >
                {subcategory}
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "1px",
                }}
              >
                <img
                  src={UbicationIcon}
                  alt="Ubicación"
                  style={{ width: "16px", height: "16px", marginRight: "2px" }}
                />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{
                    fontFamily: "Nunito",
                    fontSize: "13px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    letterSpacing: "0em",
                    textAlign: "left",
                    color: "#222222",
                    paddingLeft: 5,
                  }}
                >
                  {ubication}
                </Typography>
              </div>
            </CardContent>
          </MuiCard>
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-5px",
              width: "96px",
              height: "24px",
              padding: "4px 8px",
              borderRadius: "4px",
              border: "1px solid #00A364",
              backgroundColor: "#FAFAFA",
              boxShadow: "0px 4px 4px 0px #00000040",
              zIndex: 2,
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
        </div>
      )}
    </div>
  );
};

export default Card;
