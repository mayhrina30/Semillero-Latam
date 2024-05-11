import { TextField } from "@material-ui/core";
import { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../../Reusable/Navbar";
import DrawerComponent from "../../Reusable/Drawer";
import Download from "../../../assets/svgs/download.svg";
import Delete from "../../../assets/svgs/delete.svg";
import Edit from "../../../assets/svgs/edit.svg";
import CircularProgress from "@mui/material/CircularProgress";
import {
  createImage,
  createPost,
} from "../../../utils/services/productService";
import { UserToken } from "../../../utils/contexts";
import { Formik, useFormik } from "formik";
import { schemaPosts } from "../../../utils/schemas/postsValidations";
import { decodeJWT } from "../../../utils/decodeJWT";
import { Alerts } from "../../Reusable/alerts";

export const AddPost = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const [images, setImages] = useState(false);
  const [reload, setReload] = useState(false);
  const [userData, setUserData] = useState();
  const [imagesUpload, setImagesUpload] = useState([]);
  const [loader, setLoader] = useState(false);
  const { token, setToken } = useContext(UserToken);
  const fileInputRef = useRef(null);
  const key = useRef(200);
  const [activeModalError, setActiveModalError] = useState(false);
  const [activeModalSuccess, setActiveModalSuccess] = useState(false);
  const [activeModalMaxSizeError, setActiveModalMaxSizeError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const handleModalToggleMaxSizeError = () => {
    setActiveModalMaxSizeError(!activeModalMaxSizeError);
  };
  const handleModalToggleError = () => {
    setActiveModalError(!activeModalError);
  };
  const handleModalToggleSuccess = () => {
    setActiveModalSuccess(!activeModalSuccess);
  };
  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (!token) {
      if (storage) {
        setToken(storage);
      } else {
        window.location.href = "/";
      }
    }
    const user = decodeJWT({ token: storage });
    if (user) {
      setUserData(user);
    }
  }, []);

  const textLenght = (event) => {
    setValueInput(event.target.value);
  };
  const handleImageSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    if (images.length < 3 || images == false) {
      key.current = key.current + 3;
      const files = event.target.files;

      const maxSize = 3 * 1024 * 1024;
      const filesArray = [];
      if (imagesUpload != undefined) {
        const largo = imagesUpload.length;
        for (let index = 0; index < largo; index++) {
          filesArray.push(imagesUpload[index]);
        }
      }
      for (let index = 0; index < files.length; index++) {
        if (files[index] != undefined) {
          if (
            files[index].size <= maxSize &&
            files[index].size > 0 &&
            filesArray.length < 3
          ) {
            filesArray.push(files[index]);
          }
        }
      }
      setImagesUpload(filesArray);
      let selectedImages = images;
      if (images == false) {
        selectedImages = [];
      }
      if (files && files.length > 0) {
        const imagesToProcess = Array.from(files).slice(0, files.length);
        await Promise.all(
          imagesToProcess.map(async (file) => {
            if (file.size <= maxSize) {
              const imageUrl = await loadImageAsDataURL(file);
              if (selectedImages.length < 3) {
                selectedImages.push(imageUrl);
              }
              setReload(imageUrl);
            } else {
              handleModalToggleMaxSizeError();
            }
          })
        );
      }
      setImages(selectedImages);
    }
  };
  const loadImageAsDataURL = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };
  const deleteImage = (index) => {
    const newImages = [...images];
    const newImagesUpload = [...imagesUpload];
    newImagesUpload.splice(index, 1);
    newImages.splice(index, 1);
    setImages(newImages);
    setImagesUpload(newImagesUpload);
  };
  const sendPost = async (data) => {
    setLoader(true);
    if (imagesUpload.length > 0) {
      const response = await createPost({
        post: data,
        token,
        email: userData.sub,
      })
        .then((data) => {
          if (data != false) {
            const publicationId = data.id;
            let contador = 0;
            if (imagesUpload.length >= 1 || imagesUpload.length <= 3) {
              imagesUpload.forEach(async (image) => {
                if (image != undefined) {
                  let formData = new FormData();
                  formData.append("image", image);
                  const response = await createImage({
                    file: formData,
                    token,
                    publicationId,
                  });

                  if (response == false) {
                    console.log("fallaron las imagenes");
                  } else {
                    contador = contador + 1;
                    console.log(contador, imagesUpload.length);
                    if (contador == imagesUpload.length) {
                      setLoader(false);
                      handleModalToggleSuccess();
                    }
                  }
                }
              });
            }
          } else {
            setLoader(false);
            handleModalToggleError();
            setLoader(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setLoader(false);
      setErrorMessage(true);
      setLoader(false);
    }
  };
  const initialValues = {
    titleInput: "",
    descriptionInput: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: sendPost,
    validationSchema: schemaPosts,
  });
  const redirect = () => {
    window.location.href = "/dashboard/publicaciones";
  };
  return (
    <main style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <Navbar isDrawerOpen={isDrawerOpen} toggleDrawer={setIsDrawerOpen} />
      </div>
      <div>
        <DrawerComponent isOpen={isDrawerOpen} toggleDrawer={setIsDrawerOpen} />
      </div>
      <header style={{ marginTop: 70 }}>
        <h1 style={{ color: "#000", fontSize: 25 }}>Carga de publicación</h1>
      </header>
      <h2 style={{ color: "#000", fontSize: 20, margin: 5 }}>
        Completé los datos para crear una nueva publicación
      </h2>

      <form onSubmit={formik.handleSubmit}>
        <main style={{ padding: 15, margin: 15 }}>
          <div style={{ margin: 5, marginBottom: 15 }}>
            <TextField
              name="titleInput"
              placeholder="title"
              id="outlined-basic"
              label="titulo*"
              variant="outlined"
              fullWidth={true}
              margin="none"
              onChange={formik.handleChange}
              error={formik.errors.titleInput}
              helperText={formik.errors.titleInput}
              disabled={loader}
            />
          </div>
          <div style={{ margin: 5, borderRadius: 2 }}>
            <TextField
              name="descriptionInput"
              id="outlined-multiline-flexible"
              label="Ingresá el contenido de la publicación*"
              variant="outlined"
              multiline
              minRows={25}
              fullWidth={true}
              margin="none"
              onChange={formik.handleChange}
              inputProps={{ maxLength: 2000 }}
              error={formik.errors.descriptionInput}
              helperText={formik.errors.descriptionInput}
              disabled={loader}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: -25,
            }}
          >
            <div style={{ flex: 2, justifyContent: "flex-start" }}>
              <h5 style={{ color: "#aaa" }}>Máximo 2.000 caracteres</h5>
            </div>
            <div style={{ flex: 1, justifyContent: "flex-end" }}>
              <h5 style={{ color: "#aaa" }}>
                {formik.values.descriptionInput.length} / 2000
              </h5>
            </div>
          </div>
          {imagesUpload.length == 3 ? (
            ""
          ) : (
            <section style={{ display: "flex", justifyContent: "flex-end" }}>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <button
                  onClick={handleImageSelect}
                  type="button"
                  style={{ backgroundColor: "#4E169D", margin: 15 }}
                  disabled={loader}
                >
                  <img src={Download} alt=" subir imagen" /> Seleccionar
                  Imágenes
                </button>

                <p
                  style={{
                    color: errorMessage ? "#f00" : "#000",
                    textAlign: "initial",
                    fontSize: "10px",
                    margin: 5,
                    padding: 0,
                  }}
                >
                  *Requerida al menos una imagen
                </p>

                <p
                  style={{
                    color: "#000",
                    textAlign: "initial",
                    fontSize: "10px",
                    margin: 5,
                    padding: 0,
                  }}
                >
                  Hasta 3 imágenes. Máximo 3Mb cada una
                </p>
              </div>
            </section>
          )}
        </main>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {images
            ? images.map((imageUrl, index) => (
                <div
                  style={{ flex: 1, height: "100px", position: "relative" }}
                  key={"imagePost-" + key.current + index}
                >
                  <img
                    src={imageUrl}
                    alt="imagen seleccionada"
                    width={"80%"}
                    style={{
                      objectFit: "cover",
                      borderRadius: 5,
                      height: "100px",
                    }}
                  />
                  <div style={{ position: "absolute", right: 40, top: 0 }}>
                    <button
                      style={{
                        margin: 0,
                        padding: 0,
                        backgroundColor: "transparent",
                      }}
                      onClick={() => deleteImage(index)}
                    >
                      <img
                        src={Delete}
                        alt="delete icon"
                        style={{
                          padding: 5,
                          backgroundColor: "#22222299",
                          borderRadius: "50%",
                          margin: 2,
                        }}
                      />
                    </button>
                  </div>
                </div>
              ))
            : ""}
        </div>
        <button
          type="submit"
          style={{ margin: 15, backgroundColor: "#4E169D" }}
          disabled={loader}
        >
          {loader ? <CircularProgress /> : "Crear publicación"}
        </button>
      </form>

      <Alerts
        title={"Lo sentimos, la publicación no pudo ser creada."}
        description={"Por favor, volvé a intentarlo."}
        isError={true}
        active={activeModalError}
        operation={sendPost}
        functionActive={handleModalToggleError}
        actionName={"Intentar de nuevo"}
      />
      <Alerts
        title={"Publicación creada con éxito"}
        isError={false}
        active={activeModalSuccess}
        operation={redirect}
        functionActive={handleModalToggleSuccess}
      />
      <Alerts
        title={"El tamaño maximo es 3 mb"}
        isError={true}
        active={activeModalMaxSizeError}
        operation={handleModalToggleMaxSizeError}
        functionActive={handleModalToggleMaxSizeError}
      />
    </main>
  );
};
