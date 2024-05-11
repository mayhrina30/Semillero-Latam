import { useEffect, useRef, useState } from "react";
import { getProviderByCategory } from "../../utils/services/providerService";
import { useParams } from "react-router-dom";
import Navbar from "../Reusable/Navbar";
import DrawerComponent from "../Reusable/Drawer";
import { SearchBar } from "../Reusable/Searchbar";
import BackGroundGreen from "../../assets/svgs/backGroundGreen.svg";
import { CardProviders } from "../Reusable/cardProviders";
import "../../assets/styles/App.css"
export const ProviderByCategory = () => {
  const id = useRef();
  const [providers, setProviders] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const params = useParams();
  const [searchActive, setSearchActive] = useState(false);
  const searchActiveFunctionTrue = () => {
    setSearchActive(true);
  };
  const searchActiveFunctionFalse = () => {
    setSearchActive(false);
  };
  const fetchProviderByCategory = async ({ idValue }) => {
    const response = await getProviderByCategory({ id: idValue });
    if (response == false) {
      console.log("fallo");
    } else {
      console.log(response);
      setProviders(response);
    }
  };
  useEffect(() => {
    const idProvider = params.id;
    if (id) {
      id.current = idProvider;
    }
    fetchProviderByCategory({ idValue: idProvider });
  }, []);
  return (
    <>
      <main style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <Navbar isDrawerOpen={isDrawerOpen} toggleDrawer={setIsDrawerOpen} />
        </div>
        <div>
          <DrawerComponent
            isOpen={isDrawerOpen}
            toggleDrawer={setIsDrawerOpen}
          />
        </div>
        <div
          style={{
            width: "368px",
            position: searchActive ? "" : "absolute",
            zIndex: 101,
          }}className="zIndexUp"
        >
          <SearchBar
            searchActiveFunctionFalse={searchActiveFunctionFalse}
            searchActiveFunctionTrue={searchActiveFunctionTrue}
          />
        </div>
        {searchActive ? (
          ""
        ) : (
          <>
            <section>
              <div style={{ position: "relative" }}>
                <div
                  style={{ position: "absolute", zIndex: 100, width: "100%" }}
                >
                  <section style={{ marginLeft: 20, marginTop: 160 }}>
                  <h4 style={{ textAlign: "initial", marginBottom: 0 }}>
                    PROVEEDORES
                  </h4>
                  <h2
                    style={{
                      textAlign: "initial",
                      margin: 0,
                      lineHeight: "30px",
                      fontSize: "28px",
                      marginBottom: 8,
                      marginTop:4
                    }}
                  >
                    Directorio ECO
                  </h2>
                  <h4
                    style={{ textAlign: "initial", margin: 0, maxWidth: 200,fontSize: 22, lineHeight:1.3}}
                  >
                    Descubrí a quienes comparten tu pasión por el impacto
                    positivo y la sostenibilidad
                  </h4>
                </section>
                </div>
              </div>
              <img
                src="/proveedorPortada.webp"
                alt="imagen de portada"
                width={"100%"}
                style={{ filter: "brightness(0.5)", marginTop: 45 }}
              />
            </section>
            <img
              src={BackGroundGreen}
              alt=""
              style={{
                position: "absolute",
                left: 0,
                top: 580,
                width: "100%",
                zIndex: 11,
              }}
            />
            <section style={{ zIndex: 11, padding: 10 }}>
              <h1 style={{ color: "#000", fontSize: 35 }}>
                {providers ? "Categorías" : ""}
              </h1>
              <h2 style={{ color: "#4E169D" }}>
                {providers ? providers[0].category.name : ""}
              </h2>
              {providers ? (
                providers.map((provider) => (
                  <div style={{ paddingBottom: 20 }} key={crypto.randomUUID()}>
                    <CardProviders
                      title={provider.name}
                      description={provider.description}
                      category={provider.category}
                      email={provider.email}
                      facebook={provider.facebook}
                      instagram={provider.instagram}
                      province={provider.province.name}
                      country={provider.country.name}
                      whatsapp={provider.whatsapp}
                      imageProvider={provider.images}
                      categoryImage={provider.category.name}
                      key={crypto.randomUUID()}
                    />
                  </div>
                ))
              ) : (
                <h4 style={{ color: "#000" }}>
                  Aun no se han creado productos con esta categoria
                </h4>
              )}
            </section>
          </>
        )}
      </main>
    </>
  );
};
