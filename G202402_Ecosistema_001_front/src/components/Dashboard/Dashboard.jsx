import { useState } from "react";
import DrawerComponent from "../Reusable/Drawer";
import Navbar from "../Reusable/Navbar";
import { PublicationViews } from "./publicationViews/PublicationViews";
import { useEffect } from "react";
import { getDashboardInfoBack } from "../../utils/services/adminsService";
export const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dashboardInfo, setDashboardInfo] = useState();
  const [exist, setExist] = useState(false)
  const [activeAdmins, setActiveAdmins] = useState(false)
  const getDashboardInfo = async ({ token }) => {
    const response = await getDashboardInfoBack({ token });
    if (response != false) {
      console.log();
      setDashboardInfo(response);
      setExist(true)
    } else {
      window.location.href = "/";
    }
  };
  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
      getDashboardInfo({ token: storage });
    } else {
      window.location.href = "/";
    }
  }, []);
  return (
    <main style={{ display: "flex" }}>
      <div>
        <Navbar isDrawerOpen={isDrawerOpen} toggleDrawer={setIsDrawerOpen} />
      </div>
      <div>
        <DrawerComponent isOpen={isDrawerOpen} toggleDrawer={setIsDrawerOpen} />
      </div>
      <section style={{ marginTop: 55 }}>
        <h1 style={{ color: "#000", fontSize: 30 }}>Dashboard Administrador</h1>
        <h2 style={{ color: "#000" }}>Estadísticas mensuales</h2>
        <section
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#4E169D",
            borderRadius: 5,
            padding: 10,
            flex: 3,
            marginBottom: 15,
            marginInline: 10,
          }}
        >
          <div style={{ textAlign: "start", flex: 2, alignContent: "center" }}>
            <h3 style={{ color: "#fff", margin: 0 }}>
              Nuevos Perfiles creados
            </h3>
          </div>
          <div style={{ textAlign: "right", flex: 1, alignContent: "center" }}>
            <h2 style={{ color: "#fff", margin: 0 }}>
              {dashboardInfo ? dashboardInfo.newProviders : ""}
            </h2>
          </div>
        </section>
        <section
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginInline: 10,
          }}
        >
          <div
            style={{
              flexDirection: "column",
              border: "2px solid #1D9129",
              padding: 8,
              borderRadius: 10,
              position: "relative",
            }}
          >
            <h4
              style={{
                color: "#000",
                margin: 0,
                textAlign: "start",
                position: "relative",
                zIndex: 2,
              }}
            >
              Aprobado
            </h4>
            <hr
              style={{
                position: "absolute",
                top: "40%",
                left: "10%",
                width: "50%",
                transform: "translateY(-50%)",
                border: "none",
                borderTop: "2px solid #1D9129",
              }}
            />
            <h4 style={{ color: "#000", margin: 0, textAlign: "start" }}>
              {dashboardInfo ? dashboardInfo.stateSizeAccepted : ""}
            </h4>
          </div>

          <div
            style={{
              flexDirection: "column",
              border: "2px solid #B86B11",
              padding: 8,
              borderRadius: 10,
              position: "relative",
            }}
          >
            <h4
              style={{
                color: "#000",
                margin: 0,
                textAlign: "start",
                position: "relative",
                zIndex: 2,
              }}
            >
              En revisión
            </h4>
            <hr
              style={{
                position: "absolute",
                top: "40%",
                left: "10%",
                width: "50%",
                transform: "translateY(-50%)",
                border: "none",
                borderTop: "2px solid #B86B11",
              }}
            />
            <h4 style={{ color: "#000", margin: 0, textAlign: "start" }}>
              {dashboardInfo ? dashboardInfo.stateSizeReview : ""}
            </h4>
          </div>

          <div
            style={{
              flexDirection: "column",
              border: "2px solid #BC1111",
              padding: 8,
              borderRadius: 10,
              position: "relative",
            }}
          >
            <h4
              style={{
                color: "#000",
                margin: 0,
                textAlign: "start",
                position: "relative",
                zIndex: 2,
              }}
            >
              Denegado
            </h4>
            <hr
              style={{
                position: "absolute",
                top: "40%",
                left: "10%",
                width: "50%",
                transform: "translateY(-50%)",
                border: "none",
                borderTop: "2px solid #BC1111",
              }}
            />
            <h4 style={{ color: "#000", margin: 0, textAlign: "start" }}>
              {dashboardInfo ? dashboardInfo.stateSizeDenied : ""}
            </h4>
          </div>
        </section>
        <section
          style={{
            flexDirection: "column",
            backgroundColor: "#EAEAEA",
            borderRadius: 10,
            margin:8
          }}
        >
          <h2
            style={{
              color: "#4E169D",
              borderBottom: "2px solid #4E169D",
              marginBottom: 0,
              paddingTop: 15,
            }}
          >
            Proveedores por categoría
          </h2>
          <main style={{ flexDirection: "column", padding: 15 }}>
            {exist ? (
              <div>
                {dashboardInfo.categoryListInfo.map((category) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderBottom: "1px solid #000",
                    }}
                    key={crypto.randomUUID()}
                  >
                    <h5
                      style={{
                        color: "#000",
                        flex: 1,
                        textAlign: "start",
                        margin: 0,
                        padding: 10,
                        fontSize:"16px"
                      }}
                    >
                      {category.nameCategory}
                    </h5>
                    <h5
                      style={{
                        color: "#000",
                        flex: 1,
                        textAlign: "end",
                        margin: 0,
                        padding: 10,
                        fontSize:"16px"
                      }}
                    >
                      {category.categorySize}
                    </h5>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </main>
        </section>
        <PublicationViews />
      </section>
    </main>
  );
};
