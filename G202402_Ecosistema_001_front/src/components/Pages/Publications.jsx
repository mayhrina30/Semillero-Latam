import { useContext, useState } from "react";
import Navbar from "../Reusable/Navbar";
import DrawerComponent from "../Reusable/Drawer";
import { Posts } from "../Reusable/Posts";
import BackGroundGreen from "../../assets/svgs/backGroundGreen.svg";
import productPortada from "../../assets/images/productPortada.webp";
import { SearchBar } from "../Reusable/Searchbar";
import { getPostsActives } from "../../utils/services/productService";
import { useEffect } from "react";
import { UserToken } from "../../utils/contexts";
export const Publications = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const { token, setToken } = useContext(UserToken);
  const [searchActive, setSearchActive] = useState(false);
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
    const storage = localStorage.getItem("token");
    if (storage && !token) {
      setToken(storage);
    }
    getPublications();
  }, []);
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FAFAFA",
        width: "100%",
      }}
    >
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
          zIndex: 101,
        }}
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
              <div style={{ position: "absolute", zIndex: 100, width: "100%" }}>
                <section style={{ marginLeft: 20, marginTop: 160 }}>
                  <h4 style={{ textAlign: "initial", marginBottom: 0 }}>
                    <strong>PUBLICACIONES</strong>
                  </h4>
                  <h2
                    style={{
                      textAlign: "initial",
                      margin: 0,
                      lineHeight: "30px",
                      fontSize: "28px",
                      marginBottom: 11,
                      marginTop: 6,
                    }}
                  >
                    <strong>
                      Historias de <br /> impacto
                    </strong>
                  </h2>
                  <h4
                    style={{
                      textAlign: "initial",
                      margin: 0,
                      maxWidth: 200,
                      fontWeight: 3,
                      fontSize: 20,
                    }}
                  >
                    Encontrá inspiración y explorá las noticias y tendencias que
                    están dando forma a un mundo más verde
                  </h4>
                </section>
              </div>
            </div>
            <img
              src={productPortada}
              alt="imagen de portada"
              width={"100%"}
              style={{ filter: "brightness(0.5)", marginTop: 55 }}
            />
          </section>
          <img
            src={BackGroundGreen}
            alt=""
            style={{
              position: "absolute",
              left: 0,
              top: 500,
              width: "100%",
              zIndex: 11,
            }}
          />

          <section style={{ zIndex: 12, paddingTop: 10 }}>
            <div
              style={{
                flex: 1,
                marginTop: "55px",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              {posts.reverse().map((post, index) => (
                <div style={{ marginBottom: 20 }} key={crypto.randomUUID()}>
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
        </>
      )}
    </main>
  );
};
