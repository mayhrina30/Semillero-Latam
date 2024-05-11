import { useContext, useState } from "react";
import Navbar from "../Reusable/Navbar";
import DrawerComponent from "../Reusable/Drawer";
import { CardProviders } from "../Reusable/cardProviders";
import firstImage from "../../assets/images/4989818dea0524d2fb0186ddb4f48bb3.webp";
import secondImage from "../../assets/images/a45d3fdab035379810b3564aa3ca08bd.webp";
import thirdImage from "../../assets/images/e3bd50330ffa28bcb22ef67ef6231dd2.webp";
import { UserToken } from "../../utils/contexts";
import { decodeJWT } from "../../utils/decodeJWT";
import { getUserBack } from "../../utils/services/userService";
import { useEffect } from "react";

export const Profile = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userData, setUserData] = useState(false);
  const { token, setToken } = useContext(UserToken);
  const [activeProfile, setActiveProfile] = useState(false);
  const fetchUser = async ({ email, token }) => {
    const response = await getUserBack({ email, token });
    if (response != false) {
      console.log(response.provider);
      setUserData(response);
    } else {
      console.log("fallo");
    }
  };
  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (!storage) {
      window.location.href = "/";
    } else if (!token && storage) {
      setToken(storage);
    }
    const decode = decodeJWT({ token: storage });
    if (decode.authorities[0] == "ROLE_ADMIN") {
      window.location.href = "/";
    } else {
      setActiveProfile(true);
      fetchUser({ email: decode.sub, token: storage });
    }
  }, []);
  return (
    <>
      {activeProfile ? (
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff",
          }}
        >
          <div>
            <Navbar
              isDrawerOpen={isDrawerOpen}
              toggleDrawer={setIsDrawerOpen}
            />
          </div>
          <div>
            <DrawerComponent
              isOpen={isDrawerOpen}
              toggleDrawer={setIsDrawerOpen}
            />
          </div>
          <main
            style={{ display: "flex", flexDirection: "column", marginTop: 25 }}
          >
            <header style={{ marginTop: 25 }}>
              <h1 style={{ color: "#000", fontSize: 30 }}>
                {userData.name} {userData.lastName}
              </h1>
            </header>
            <div>
              <button
                style={{
                  color: "#fff",
                  backgroundColor: "#4E169D",
                  width: "90%",
                  borderRadius: 25,
                }}
                onClick={() => (window.location.href = `/proveedores/add`)}
              >
                Cargar Producto/Servicio
              </button>
            </div>
            <div>
              <h4 style={{ color: "#000", fontSize: 25, fontWeight: 10 }}>
                <strong>Mis Productos/Servicios</strong>
              </h4>
            </div>
            {userData.provider
              ? userData.provider.map((pro) => (
                  <section
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      border: "2px solid #4E169D",
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
                      margin: 10,
                    }}
                    key={crypto.randomUUID()}
                  >
                    <div
                      style={{
                        display: "flex",
                        backgroundColor: "#4E169D",
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          justifyContent: "flex-start",
                          alignContent: "center",
                          textAlign: "start",
                          paddingLeft: 15,
                        }}
                      >
                        <h3>
                          {pro.name.length >= 18
                            ? pro.name.substring(0, 20) + "..."
                            : pro.name}{" "}
                        </h3>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          justifyContent: "flex-end",
                          alignContent: "center",
                          textAlign: "end",
                        }}
                      >
                        <button
                          style={{ backgroundColor: "transparent" }}
                          onClick={() =>
                            (window.location.href = `/proveedores/edit/${pro.id}`)
                          }
                        >
                          Editar
                        </button>
                      </div>
                    </div>
                    <div
                      style={{
                        justifyContent: "flex-end",
                        display: "flex",
                        alignItems: "center",
                        padding: 10,
                      }}
                    >
                      <div
                        style={{
                          height: 16,
                          width: 16,
                          backgroundColor:
                            pro.state === "INITIAL_REVIEW"
                              ? "#505050"
                              : pro.state === "ACCEPTED"
                              ? "#1D9129"
                              : pro.state === "DENIED"
                              ? "#BC1111"
                              : pro.state === "REQUIRES_CHANGES"
                              ? "#B86B11"
                              : "#B86B11",
                          borderRadius: "50%",
                        }}
                      ></div>
                      <h4
                        style={{
                          color: "#000",
                          margin: 0,
                          paddingLeft: 5,
                        }}
                      >
                        {pro.state === "INITIAL_REVIEW"
                          ? "Postulado"
                          : pro.state === "ACCEPTED"
                          ? "Aceptado"
                          : pro.state === "DENIED"
                          ? "Denegado"
                          : pro.state === "REQUIRES_CHANGES"
                          ? "Requiere cambios"
                          : pro.state === "CHANGES_MADE"
                          ? "En revisión"
                          : ""}
                      </h4>
                    </div>
                    <h4 style={{ color: "#4E169D", padding: 5, margin: 0 }}>
                      {pro.state === "INITIAL_REVIEW"
                        ? "¡Gracias por querer formar parte de EcoSistema!"
                        : pro.state === "ACCEPTED"
                        ? "¡Felicitaciones! Sos parte de EcoSistema"
                        : pro.state === "DENIED"
                        ? "Devolución de la administración"
                        : pro.state === "REQUIRES_CHANGES"
                        ? "Devolución de la administración:"
                        : pro.state === "CHANGES_MADE"
                        ? ""
                        : "Estamos revisando tus cambios"}
                    </h4>
                    <h4 style={{ color: "#000", margin: 0 }}>{pro.feedback}</h4>
                    <p style={{ color: "#000" }}>
                      {pro.state === "INITIAL_REVIEW"
                        ? "Pronto tendrás más novedades"
                        : ""}
                    </p>
                  </section>
                ))
              : ""}

            <div>
              <h4 style={{ color: "#222222", fontSize: 20 }}>
                Asi se vería tu producto/servicio en el Directorio
              </h4>
            </div>
            {userData.provider
              ? userData.provider.map((pro) => (
                  <div style={{ padding: 15 }} key={crypto.randomUUID()}>
                    <CardProviders
                      title={pro.name}
                      description={pro.description}
                      category={pro.category}
                      email={pro.email}
                      facebook={pro.facebook}
                      instagram={pro.instagram}
                      province={pro.province.name}
                      country={pro.country.name}
                      whatsapp={pro.whatsapp}
                      imageProvider={pro.images}
                      categoryImage={pro.category.name}
                    />
                  </div>
                ))
              : ""}
          </main>
        </main>
      ) : (
        ""
      )}
    </>
  );
};
