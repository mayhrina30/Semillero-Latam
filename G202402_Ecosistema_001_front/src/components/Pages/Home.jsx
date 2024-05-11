import { BrowserRouter as Router } from "react-router-dom";
import "../../assets/styles/App.css";
import Navbar from "../Reusable/Navbar";
import Section2 from "./Home-page/Section2";
import Categorias from "./Home-page/Categorias";
import DrawerComponent from "../Reusable/Drawer";
import { CardProviders } from "../Reusable/cardProviders";
import firstImage from "../../assets/images/4989818dea0524d2fb0186ddb4f48bb3.webp";
import secondImage from "../../assets/images/a45d3fdab035379810b3564aa3ca08bd.webp";
import thirdImage from "../../assets/images/e3bd50330ffa28bcb22ef67ef6231dd2.webp";
import { Posts } from "../Reusable/Posts";
import { getPostsActives } from "../../utils/services/productService";
import { useEffect, useState } from "react";
import { LandingUbication } from "./Home-page/LandingUbication";
import "../../assets/styles/Section.css";
import { SearchBar } from "../Reusable/Searchbar";
import { decodeJWT } from "../../utils/decodeJWT";
import { setLocation } from "../../utils/services/userService";

export const Home = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [ubication, setUbication] = useState(false);
  const getLocation = () => {
    const storage = localStorage.getItem("token");
    if (storage != null) {
      const decode = decodeJWT({ token: storage });
      setUbication(true);
      if (storage && decode.location == false) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const response = await setLocation({
                token: storage,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                email: decode.sub,
              });
              if (response != false) {
                localStorage.setItem("token", response.message);
                window.location.href = "/";
              }
            },
            (error) => {
              console.error(error.message);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      }
    }
  };
  const searchActiveFunctionTrue = () => {
    setSearchActive(true);
  };
  const searchActiveFunctionFalse = () => {
    setSearchActive(false);
  };
  const getPublications = async () => {
    const response = await getPostsActives();
    setPosts(response);
  };
  useEffect(() => {
    getLocation();
  }, []);
  useEffect(() => {
    getPublications();
  }, []);
  return (
    <>
      <div
        className="App"
        style={{
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div style={{ width: "100%" }}>
          <Navbar isDrawerOpen={isDrawerOpen} toggleDrawer={setIsDrawerOpen} />
        </div>
        <div>
          <DrawerComponent
            isOpen={isDrawerOpen}
            toggleDrawer={setIsDrawerOpen}
          />
        </div>

        <div
          style={{ width: "100%", position: searchActive ? "" : "absolute" }}
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
            <div style={{ width: "100%", zIndex: 11 }}>
              <section
                className="main-content"
                style={{ position: "relative", width: "100%" }}
              >
                <img
                  src="/background2.webp"
                  alt=""
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    zIndex: -100,
                    filter: "brightness(0.5)",
                  }}
                />
                <section style={{ marginTop: 130 }}>
                  <div
                    className="div-p"
                    style={{ marginLeft: 20, marginTop: 35 }}
                  >
                    <h1 style={{ margin: 0, fontSize: 20, marginBottom: 8 }}>
                      RED DE IMPACTO
                    </h1>
                    <p style={{ zIndex: 11, margin: 0 }}>
                      Conectamos proveedores y personas comprometidas con el
                      impacto y el consumo consciente
                    </p>
                  </div>
                </section>
              </section>
            </div>
            <main style={{ width: "100%" }}>
              <div style={{ marginBottom: 35 }}>
                <Section2 />
              </div>

              {ubication ? <LandingUbication /> : ""}

              <Categorias />
              <section
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingInline: 15,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    padding: 0,
                    color: "#000",
                    textAlign: "start",
                  }}
                >
                  Publicaciones
                </h3>
                <h2
                  style={{
                    margin: 0,
                    padding: 0,
                    textAlign: "start",
                    color: "#000",
                  }}
                >
                  Impulsando transformaciones
                </h2>
                <div>
                  {posts
                    .slice(-3)
                    .reverse()
                    .map((post, index) => (
                      <div style={{ marginBottom: 18 }} key={crypto.randomUUID()}>
                        <Posts
                          idPost={post.id}
                          title={post.title}
                          description={post.description}
                          imagesPost={post.images}
                          time={post.creationDate}
                          key={index}
                        />
                      </div>
                    ))}
                </div>
              </section>
              <div style={{marginBottom: 15}}>
                <button
                  style={{
                    padding: "10px 24px",
                    borderRadius: "100px",
                    backgroundColor: "#4E169D",
                    color: "#FFFFFF",
                    fontFamily: "Nunito",
                    fontSize: 15,
                  }}
                  onClick={() => window.location.href = "/publicaciones"}
                >
                  Ver más publicaciones
                </button>
              </div>
            </main>
          </>
        )}
      </div>
    </>
  );
};
