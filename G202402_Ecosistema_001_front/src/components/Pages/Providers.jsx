import firstImage from "../../assets/images/4989818dea0524d2fb0186ddb4f48bb3.webp";
import secondImage from "../../assets/images/a45d3fdab035379810b3564aa3ca08bd.webp";
import thirdImage from "../../assets/images/e3bd50330ffa28bcb22ef67ef6231dd2.webp";
import { useEffect, useState } from "react";
import Navbar from "../Reusable/Navbar";
import DrawerComponent from "../Reusable/Drawer";
import { CardProviders } from "../Reusable/cardProviders";
import { SearchBar } from "../Reusable/Searchbar";
import BackGroundGreen from "../../assets/svgs/backGroundGreen.svg";
import { getCategoriesBack } from "../../utils/services/categoryService";
import "../../assets/styles/App.css"
export const Providers = () => {
  const [categories, setCategories] = useState();
  const [searchActive, setSearchActive] = useState(false);
  const searchActiveFunctionTrue = () => {
    setSearchActive(true);
  };
  const searchActiveFunctionFalse = () => {
    setSearchActive(false);
  };
  const getCategories = async () => {
    const response = await getCategoriesBack();
    if (response == false) {
      console.log("fallo");
    } else {
      setCategories(response);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <main style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <Navbar isDrawerOpen={isDrawerOpen} toggleDrawer={setIsDrawerOpen} />
      </div>
      <div>
        <DrawerComponent isOpen={isDrawerOpen} toggleDrawer={setIsDrawerOpen} />
      </div>
      <div
        style={{
          width: "368px",
          position: searchActive ? "" : "absolute",
          
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
        <section>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", zIndex: 100, width: "100%" }}>
              <>
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
              </>
            </div>
          </div>
          <img
            src="/proveedorPortada.webp"
            alt="imagen de portada"
            width={"100%"}
            style={{ filter: "brightness(0.5)", marginTop: 45 }}
          />

          <main
            style={{
              background:
                "linear-gradient(to bottom,transparent  50%,#00A364  50%)",
            }}
          >
            <img
              src={BackGroundGreen}
              alt=""
              style={{
                position: "absolute",
                left: "5.4px",
                top: 540,
                width: "97%",
                zIndex: -1,
              }}
            />
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                zIndex: 12,
                gap:5
              }}
            >
              {categories
                ? categories.map((category) => (
                    <button
                      style={{
                        flex: 1,
                        padding: 5,
                        margin: 5,
                        marginInline: 10,
                        display: "flex",
                        backgroundColor: "#fff",
                      }}
                      key={crypto.randomUUID()}
                      onClick={() =>
                        (window.location.href = `/proveedores/${category.id}`)
                      }
                    >
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          justifyContent: "end",
                        }}
                      >
                        <div
                          style={{
                            padding: 10,
                            borderRadius: "50%",
                            border: "1px solid #000",
                            width: 40,
                            height: 40,
                            marginRight: 15,
                          }}
                        >
                          <img
                            src={category.image}
                            alt=""
                            style={{
                              backgroundColor: "#fff",
                            }}
                            height={40}
                            width={40}
                          />
                        </div>
                      </div>
                      <div style={{ flex: 1, textAlign: "initial" }}>
                        <h4 style={{ color: "#000", alignContent: "center" }}>
                          {category.name}
                        </h4>
                      </div>
                    </button>
                  ))
                : ""}
            </section>
          </main>
        </section>
      )}
    </main>
  );
};
