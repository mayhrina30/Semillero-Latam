import Navbar from "../../Reusable/Navbar";
import DrawerComponent from "../../Reusable/Drawer";
import { useEffect, useState } from "react";
import { UserToken } from "../../../utils/contexts";
import { useContext } from "react";
import { getProvidersBack } from "../../../utils/services/providerService";
import { CardProviders } from "../../Reusable/cardProviders";
export const ProvidersAdminsList = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [providers, setProviders] = useState([]);
  const { token, setToken } = useContext(UserToken);
  const getProviders = async ({ tokenStorage }) => {
    const response = await getProvidersBack({ token: tokenStorage });
    if (response != false) {
      setProviders(response);
    } else {
      console.log("fallo");
    }
  };

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
      setToken(storage);
    }
    getProviders({ tokenStorage: storage });
  }, []);
  return (
    <main style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <Navbar isDrawerOpen={isDrawerOpen} toggleDrawer={setIsDrawerOpen} />
      </div>
      <div>
        <DrawerComponent isOpen={isDrawerOpen} toggleDrawer={setIsDrawerOpen} />
      </div>
      <header
        style={{ marginTop: 45, display: "flex", flexDirection: "column" }}
      >
        <h1 style={{ color: "#000", fontSize: "25px" }}>Publicaiones</h1>
        <button
          style={{ backgroundColor: "#4E169D" }}
          onClick={() => (window.location.href = "/proveedores/add")}
        >
          Crear proveedor
        </button>
      </header>
      <h2 style={{ color: "#000" }}>Publicaciones cargadas</h2>
      {providers.map((provider, index) => (
        <div style={{ flex: 1, padding: 10 }} key={crypto.randomUUID()}>
          <button style={{backgroundColor:"#bbbbbb", color:"#000"}}
          onClick={() => (window.location.href = `/proveedores/edit/${provider.id}`)}>
            Editar
          </button>
          <CardProviders
            title={provider.name}
            description={provider.description}
            category={provider.category.name}
            country={provider.country.name}
            province={provider.province.name}
            email={provider.email}
            facebook={provider.facebook}
            instagram={provider.instagram}
            whatsapp={provider.phone}
            imageProvider={provider.images}
            categoryImage={provider.category.name}
            
          />
        </div>
      ))}
    </main>
  );
};
