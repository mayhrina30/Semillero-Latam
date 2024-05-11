import Navbar from "../../Reusable/Navbar";
import DrawerComponent from "../../Reusable/Drawer";
import { Posts } from "../../Reusable/Posts";
import { useEffect, useState } from "react";
import { getPosts } from "../../../utils/services/productService";
import { UserToken } from "../../../utils/contexts";
import { useContext } from "react";
export const PostsAdmins = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const { token, setToken } = useContext(UserToken);
  const getPublications = async ({tokenStorage}) => {
    const response = await getPosts({ token: tokenStorage });
    setPosts(response);
  };

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
      setToken(storage);
    }
    getPublications({tokenStorage: storage});
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
        <h1 style={{ color: "#000", fontSize: "25px" }}>Publicaciones</h1>
        <button
          style={{ backgroundColor: "#4E169D" }}
          onClick={() =>
            (window.location.href = "/publicaciones/add")
          }
        >
          Crear publicación
        </button>
      </header>
      <h2 style={{ color: "#000" }}>Publicaciones cargadas</h2>
      {posts.map((post, index) => (
        <Posts
          idPost={post.id}
          title={post.title}
          description={post.description}
          imagesPost={post.images}
          time={post.creationDate}
          key={index}
          isAdmin={true}
          deleted={post.deleted}
        />
      ))}
    </main>
  );
};
