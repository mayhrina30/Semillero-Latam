import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { getCategoriesBack } from "../../../utils/services/categoryService";

const categorys = [
  { nombre: "Construcción", icono: "../../CONSTRUCCION.webp" },
  { nombre: "Tecnología", icono: "../../TECNOLOGIA.webp" },
  { nombre: "Indumentaria", icono: "../../INDUMENTARIA.webp" },
  { nombre: "Bienestar", icono: "../../BIENESTAR.webp" },
  { nombre: "Gastronomía", icono: "../../GASTRONOMIA.webp" },
  { nombre: "Cultivos", icono: "../../CULTIVOS.webp" },
  { nombre: "Transporte", icono: "../../TRANSPORTE.webp" },
  { nombre: "Reciclaje", icono: "../../RECICLAJE.webp" },
];

function Categorias() {
  const [categories, setCategories] = useState();
  const [categoriesLength, setCategoriesLength] = useState(6);
  const fetchCategories = async () => {
    const response = await getCategoriesBack();
    if (response == false) {
      console.log("fallo");
    } else {
      setCategories(response);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const moreCategories = () =>{
    if(categoriesLength == 6){
      setCategoriesLength(11)
    }else{
      setCategoriesLength(6)
    }
  }
  return (
    <div
      style={{
        position: "relative",
        padding: "20px",
        paddingRight: "20px",
        paddingLeft: "20px",
        marginTop: 35
      }}
    >
      <h3
        style={{
          fontFamily: "Nunito",
          fontSize: 16,
          fontWeight: 600,
          lineHeight: "25px",
          letterSpacing: "0em",
          textAlign: "center",
          color: "#000",
          margin:0
        }}
      >
        Red de Proveedores ECO
      </h3>
      <h2
        style={{
          fontFamily: "Nunito",
          fontSize: 22,
          fontWeight: 700,
          lineHeight: "25px",
          letterSpacing: "0em",
          textAlign: "center",
          color: "#000",
          marginTop:0
        }}
      >
        Categorías
      </h2>

      {categories ? (
        <Grid container spacing={3}>
          {categories.slice(0, categoriesLength).map((category, index) => (
            <Grid
              item
              xs={6}
              key={crypto.randomUUID()}
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "4px",
              }}
            >
                <button
                  style={{
                    width: 160,
                    height: 64,
                    borderRadius: 16,
                    backgroundColor: "rgba(234, 234, 234, 1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "2px",
                  }}
                  onClick={()=>window.location.href = `/proveedores/${category.id}`}
                >
                  <div
                    style={{
                      padding: 5,
                      borderRadius: "50%",
                      border: "1px solid #000",
                      width: 28,
                      height: 28,
                    }}
                  >
                    <img
                    src={category.image}
                    alt={category.name}
                    style={{
                      width: 28,
                      height: 28,
                    }}
                  />
                  </div>
                  
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily: "Nunito",
                      fontSize: "16px",
                      fontWeight: 700,
                      lineHeight: "25px",
                      letterSpacing: "0em",
                      textAlign: "center",
                      borderBottom: "solid 1px #4E169D",
                      color:"#000",
                      marginLeft: 4
                    }}
                  >
                    {category.name}
                  </Typography>
                </button>
           
            </Grid>
          ))}
        </Grid>
      ) : (
        ""
      )}

      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          marginTop: 35,
        }}
      >
        <Button
          style={{
            width: 200,
            height: 40,
            padding: "10px 24px",
            borderRadius: "100px",
            gap: "10px",
            backgroundColor: "#4E169D",
            zIndex: 1,
            color: "#FFFFFF",
            textTransform: "none",
            fontFamily: "Nunito",
            fontSize: 15
          }}
          onClick={moreCategories}
        >
          {categoriesLength == 6 ? "Ver más Categorías" : "Ver menos Categorías"}
        </Button>
      </div>
    </div>
  );
}

export default Categorias;
