import * as React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import debounce from "just-debounce-it";
import { useCallback } from "react";
import { useEffect } from "react";
import { getProvidersSearch } from "../../utils/services/providerService";
import SearchFail from "../../assets/svgs/searchFail.svg";
import CircularProgress from "@mui/material/CircularProgress";
import "../../assets/styles/Section.css";
import { CardProviders } from "./cardProviders";

export const SearchBar = ({
  searchActiveFunctionTrue,
  searchActiveFunctionFalse,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const [error, setError] = useState(false);
  const [providers, setProviders] = useState();
  const [loader, setLoader] = useState(false);

  const getProvidersSearchfuction = async ({ search }) => {
    if (search.search.length != 0) {
      setActiveSearch(true);
      const response = await getProvidersSearch({ search });
      if (response == false) {
        setLoader(false);
        setError(true);
        setProviders(undefined);
        searchActiveFunctionTrue();
      } else {
        searchActiveFunctionTrue();
        setActiveSearch(true);
        setLoader(false);
        setError(false);
        setProviders(response);
      }
    } else {
      console.log("El input es  0");
      setLoader(false)
      setError(false);
      setProviders(undefined);
      setActiveSearch(false);
      searchActiveFunctionFalse();
    }
  };
  const handleChange = (event) => {
    setLoader(true);
    const newQuery = event.target.value;
    setSearchInput(newQuery);
    debouncedGetProviders({ search: newQuery });
  };
  const debouncedGetProviders = useCallback(
    debounce((search) => {
      getProvidersSearchfuction({ search });
    }, 400),
    []
  );
  return (
    <main
      style={{
        width: "100%",
        overflowY: "visible !important",
        backgroundColor: activeSearch ? "#fff" : "",
      }}
    >
      <TextField
        name="search"
        placeholder="Buscar Proveedores"
        id="outlined-basic"
        variant="outlined"
        onChange={handleChange}
        style={{
          marginTop: 72,
          marginInline: 15,
          height: 56,
          borderRadius: 100,
          color: "#222222",
          width: "90%",
          zIndex: 11,
        }}
        InputProps={{
          style: {
            borderRadius: 50,
            backgroundColor: "white",
            color: "#222222",
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <div
        style={{
          display: "flex",
          width: "100%",
          height: activeSearch ? "100%" : "200%",
          backgroundColor: "#fff",
          zIndex: 12,
          marginTop: 30
        }}
      >
        {activeSearch ? (
          <section>
            <h2 style={{ color: "#000", textAlign: "center", paddingTop: 10 }}>
              Resultados de tu búsqueda
            </h2>
            {loader ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              ""
            )}
            {providers ? (
              providers.map((provider) => (
                <div
                  style={{
                    padding: 15,
                    marginTop: 25,
                    zIndex: 12,
                    backgroundColor: "#fff",
                  }}
                  key={crypto.randomUUID()}
                >
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
                  />
                </div>
              ))
            ) : error == true ? (
              <section
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#EAEAEA",
                  margin: "15px",
                  borderRadius: "15px",
                  marginTop: 30,
                }}
              >
                <div style={{ justifyContent: "center", textAlign: "center" }}>
                  <img src={SearchFail} alt="Icono de busqueda" />
                </div>
                <div style={{ textAlign: "center" }}>
                  <h4 style={{ margin: 0, color: "#4E169D" }}>
                    No se encontraron resultados para tu búsqueda
                  </h4>
                  <h4 style={{ color: "#000" }}>
                    Intentá nuevamente con otra consulta
                  </h4>
                </div>
              </section>
            ) : (
              ""
            )}
          </section>
        ) : (
          ""
        )}
      </div>
    </main>
  );
};
