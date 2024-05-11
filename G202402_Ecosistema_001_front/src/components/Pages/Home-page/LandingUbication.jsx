import { useEffect, useState } from "react";
import Card from "../../Reusable/Card";
import ExtendedCard from "../../Utils/ExtendedProviderCard"; // Importa ExtendedCard en lugar de ExtendedProviderCard
import vectorBackground from "../../../assets/svgs/vector.svg";
import firstImage from "../../../assets/images/4989818dea0524d2fb0186ddb4f48bb3.webp";
import secondImage from "../../../assets/images/a45d3fdab035379810b3564aa3ca08bd.webp";
import thirdImage from "../../../assets/images/e3bd50330ffa28bcb22ef67ef6231dd2.webp";
import { decodeJWT } from "../../../utils/decodeJWT";
import { getProvidersByLocation } from "../../../utils/services/providerService";
export const LandingUbication = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isExtendedCardOpen, setIsExtendedCardOpen] = useState(false);
  const [providers, setProviders] = useState();
  useEffect(() => {
    getProviders();
  }, []);
  const getProviders = async () => {
    const storage = localStorage.getItem("token");
    if (storage != null) {
      const decode = decodeJWT({ token: storage });
      const response = await getProvidersByLocation({
        email: decode.sub,
        token: storage,
      });
      if (response != false) {
        setProviders(response);
      }
    }
  };
  const handleExtendedCardClose = () => {
    setIsExtendedCardOpen(false);
  };

  if (selectedCard) {
    console.log("Extended Description:", selectedCard.extendedDescription);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${vectorBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        maxWidth: "100%",
        position: "relative",
        top: 25
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div style={{ marginLeft: "-35px", marginBottom: "65px" }}>
          <h3
            style={{
              textAlign: "left",
              marginTop: "-60px",
              paddingBottom: "0px",
              color: "#000",
            }}
          >
            Recomendaciones locales para vos
          </h3>
          <h2
            style={{
              textAlign: "left",
              marginTop: "-20px",
              color: "#000",
            }}
          >
            Proveedores cerca tuyo
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "-25px",
            marginLeft: -8,
            flexDirection: "row",
            flex: 2,
            flexWrap: "wrap",
          }}
        >
          {providers
            ? providers.map((provider, index) => (
                <div key={crypto.randomUUID()}>
                  <div>
                    <Card
                      title={provider.name}
                      category={provider.category.name}
                      subcategory={provider.category.name}
                      ubication={
                        provider.province.name + ", " + provider.country.name
                      }
                      imageUrl={provider.images[0].url}
                      instagram={provider.instagram}
                      facebook={provider.facebook}
                      email={provider.email}
                      whatsapp={provider.whatsapp}
                      extendedDescription={provider.description}
                    />
                  </div>
                </div>
              ))
            : ""}
        </div>
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            marginTop: "15px",
          }}
        >
        </div> */}
      </div>
    </div>
  );
};
