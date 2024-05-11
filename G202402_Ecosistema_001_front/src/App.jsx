import React from "react";
import { Home } from "./components/Pages/Home";
import { Profile } from "./components/Pages/Profile";
import { Publications } from "./components/Pages/Publications";
import { Providers } from "./components/Pages/Providers";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { PostsAdmins } from "./components/Dashboard/posts/PostsAdmins";
import { AddPost } from "./components/Dashboard/posts/addPost";
import { EditPost } from "./components/Dashboard/posts/editPost";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProviderByCategory } from "./components/Pages/ProviderByCategory";
import {ProviderAdmins} from "./components/Dashboard/provider/ProviderAdmis"
import { AddProvider } from "./components/Dashboard/provider/addProvider";
import { EditProvider } from "./components/Dashboard/provider/editProvider";
import { ProvidersAdminsList } from "./components/Dashboard/provider/listProvider";
export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/mi-perfil",
      element: <Profile />,
    },
    {
      path: "/publicaciones",
      element: <Publications />,
    },
    {
      path: "/proveedores",
      element: <Providers />,
    },
    {
      path: "/proveedores/list",
      element: <ProvidersAdminsList />,
    },
    {
      path: "/proveedores/:id",
      element: <ProviderByCategory />,
    },
    {
      path: "/mi-perfil",
      element: <Profile />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/dashboard/publicaciones",
      element: <PostsAdmins />,
    },
    {
      path: "/dashboard/proveedores",
      element: <ProviderAdmins />,
    },
    {
      path: "/publicaciones/add",
      element: <AddPost />,
    },
    {
      path: "/proveedores/add",
      element: <AddProvider />,
    },
    {
      path: "/publicaciones/edit/:id",
      element: <EditPost />,
    },
    {
      path: "/proveedores/edit/:id",
      element: <EditProvider />,
    },
  ]);
  return <RouterProvider router={router} />;
};
