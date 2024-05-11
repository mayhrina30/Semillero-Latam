import { useEffect, useState, useContext } from "react";
import Navbar from "../../Reusable/Navbar";
import DrawerComponent from "../../Reusable/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import { ProviderState } from "../../Reusable/ProviderState";
import { getProvidersBack } from "../../../utils/services/providerService";
import { UserToken } from "../../../utils/contexts";
import { Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    overflowX: "auto",
    whiteSpace: "nowrap",
    scrollbarWidth: "none",
    borderBottom: "1px solid transparent",
    borderBottomColor: "#4E169D",
    marginBottom: 1,
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  item: {
    display: "inline-block",
    marginInline: 5,
    marginTop: 15,
    cursor: "pointer",
    borderBottom: "2px solid transparent",
  },
  activeItem: {
    borderBottomColor: "#4E169D",
    borderBottomWidth: 2,
    borderWidth: 0,
  },
  focusedItem: {
    backgroundColor: "transparent",
  },
}));
export const ProviderAdmins = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState(0);
  const { token, setToken } = useContext(UserToken);
  const [data, setData] = useState([]);

  const states = [
    "INITIAL_REVIEW",
    "ACCEPTED",
    "REQUIRES_CHANGES",
    "DENIED",
    "CHANGES_MADE",
  ];

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
      setToken(storage);
    }
    getProvidersBack({ token }).then((data) => data && setData(data));
  }, [token]);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };
  const verifi = ({ prov }) => {
    if (activeIndex === 2) {
      if (prov.state === "CHANGES_MADE" || prov.state === "REQUIRES_CHANGES") {
        return true;
      }
    }
    if (prov.state === states[activeIndex]) {
      return true;
    }
    return false;
  };
  return (
    <>
      <div>
        <Navbar isDrawerOpen={isDrawerOpen} toggleDrawer={setIsDrawerOpen} />
      </div>
      <div>
        <DrawerComponent isOpen={isDrawerOpen} toggleDrawer={setIsDrawerOpen} />
      </div>
      <section style={{ marginTop: 90 }}>
        <h1 style={{ fontSize: "28px", color: "#222222" }}>Proveedores</h1>
      </section>
      <section>
        <div className={classes.container}>
          <button
            className={`${classes.item} ${
              activeIndex === 0 ? classes.activeItem : ""
            } ${activeIndex === 0 ? classes.focusedItem : ""}`}
            onClick={() => handleItemClick(0)}
            style={{
              borderRadius: 0,
              backgroundColor: "transparent",
              color: "#000",
            }}
          >
            Nuevos perfiles
          </button>
          <button
            className={`${classes.item} ${
              activeIndex === 1 ? classes.activeItem : ""
            } ${activeIndex === 1 ? classes.focusedItem : ""}`}
            onClick={() => handleItemClick(1)}
            style={{
              borderRadius: 0,
              backgroundColor: "transparent",
              color: "#000",
            }}
          >
            Aprobados
          </button>
          <button
            className={`${classes.item} ${
              activeIndex === 2 ? classes.activeItem : ""
            } ${activeIndex === 2 ? classes.focusedItem : ""}`}
            onClick={() => handleItemClick(2)}
            style={{
              borderRadius: 0,
              backgroundColor: "transparent",
              color: "#000",
            }}
          >
            En revisión
          </button>
          <button
            className={`${classes.item} ${
              activeIndex === 3 ? classes.activeItem : ""
            } ${activeIndex === 3 ? classes.focusedItem : ""}`}
            onClick={() => handleItemClick(3)}
            style={{
              borderRadius: 0,
              backgroundColor: "transparent",
              color: "#000",
            }}
          >
            Denegados
          </button>
        </div>
      </section>
      <main>
        <Box>
          {data
            ?.filter((prov) => verifi({ prov }))
            .map((provider) => (
              <ProviderState
                key={crypto.randomUUID()}
                description={provider.category.name}
                title={provider.name}
                state={provider.state}
                provider={provider}
                token={token}
              />
            ))}
        </Box>
      </main>
    </>
  );
};
