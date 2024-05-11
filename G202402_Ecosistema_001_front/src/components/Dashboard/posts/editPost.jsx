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
  deleteImagePost,
  getPostById,
  putPost,
} from "../../../utils/services/productService";
import { UserToken } from "../../../utils/contexts";
import { useParams } from "react-router-dom";
import { FieldArray, useFormik } from "formik";
import { schemaPosts } from "../../../utils/schemas/postsValidations";
import { Alerts } from "../../Reusable/alerts";
import { TramRounded } from "@material-ui/icons";

export const EditPost = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesEliminated, setImagesEliminated] = useState([]);
  const [imagesToMap, setImagesToMap] = useState(false);
  const [imagesUpload, setImagesUpload] = useState([]);
  const [loader, setLoader] = useState(false);
  const [activeModalError, setActiveModalError] = useState(false);
  const [activeModalSuccess, setActiveModalSuccess] = useState(false);
  const [activeModalMaxSizeError, setActiveModalMaxSizeError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [reload, setReload] = useState(false);
  const [post, setPost] = useState();
  const params = useParams();
  const { token, setToken } = useContext(UserToken);
  const fileInputRef = useRef(null);
  const key = useRef(250);
  const postInitial = useRef();

  const idPost = useRef();
  const handleModalToggleMaxSizeError = () => {
    setActiveModalMaxSizeError(!activeModalMaxSizeError);
  };
  const handleModalToggleError = () => {
    setActiveModalSuccess(false);
    setActiveModalError(!activeModalError);
  };
  const handleModalToggleSuccess = () => {
    setActiveModalError(false);
    setActiveModalSuccess(!activeModalSuccess);
  };
  const handleImageSelect = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (event) => {
    if (imagesToMap.length + images.length < 3 || imagesToMap == false) {
      key.current = key.current + 3;
      const files = event.target.files;

      const maxSize = 3 * 1024 * 1024;

      let selectedImages = images;
      if (imagesToMap == false || images == []) {
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
                let newImagesUpload = imagesUpload;
                newImagesUpload.push(file);
                setImagesUpload(newImagesUpload);
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
    const newImages = [...imagesToMap];
    let newImagesEliminated = [...imagesEliminated];
    newImagesEliminated.push(newImages[index]);
    setImagesEliminated(newImagesEliminated);
    newImages.splice(index, 1);
    setImagesToMap(newImages);
  };
  const deleteImageUpload = (index) => {
    const newImages = [...images];
    const newImagesUpload = [...imagesUpload];
    newImagesUpload.splice(index, 1);
    newImages.splice(index, 1);
    setImagesUpload(newImagesUpload);
    setImages(newImages);
  };
  const updatePost = async () => {
    setLoader(true);

    if (imagesToMap.length > 0 || imagesUpload.length > 0) {
      const storage = localStorage.getItem("token");
      let permit = true;
      if (imagesToMap != postInitial.current) {
        for (const image of imagesEliminated) {
          const response = await deleteImagePost({
            idImage: image.id,
            token: storage,
          });
          if (response !== false) {
            if (permit != false) {
              permit = true;
            }
          } else {
            setLoader(false);
            handleModalToggleError();
            permit = false;
          }
        }
      }
      if (imagesUpload[0] != undefined) {
        for (const image of imagesUpload) {
          if (imagesToMap.length + images.length <= 3) {
            const formData = new FormData();
            formData.append("image", image);
            const response = await createImage({
              file: formData,
              publicationId: idPost.current,
              token: storage,
            });
            if (response !== false) {
              if (permit != false) {
                permit = true;
              }
            } else {
              setLoader(false);
              handleModalToggleError();
              permit = false;
            }
          }
        }
      }
      const postData = {
        id: idPost.current,
        title: formik.values.titleInput,
        description: formik.values.descriptionInput,
        numberOfViews: post.numberOfViews
      };
      const response = await putPost({ post: postData, token: storage });
      if (response != false && permit == true) {
        setLoader(false);
        handleModalToggleSuccess();
      } else {
        setLoader(false);
        handleModalToggleError();
      }
    } else {
      setLoader(false);
      setErrorMessage(true);
      setLoader(false);
    }
  };
  const fetchPost = async () => {
    const storage = localStorage.getItem("token");
    const response = await getPostById({
      id: idPost.current,
      token: storage,
    });
    setPost(response);
    setImagesToMap(response.images);
    postInitial.current = response.images;
  };
  useEffect(() => {
    const id = params.id;
    if (id) {
      idPost.current = id;
    }
    fetchPost();
  }, []);
  const redirect = () => {
    window.location.href = "/dashboard/publicaciones";
  };
  const formik = useFormik({
    initialValues: {
      titleInput: post ? post.title : "",
      descriptionInput: post ? post.description : "",
    },
    onSubmit: updatePost,
    validationSchema: schemaPosts,
    enableReinitialize: true,
  });
  return (
    <main style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <Navbar isDrawerOpen={isDrawerOpen} toggleDrawer={setIsDrawerOpen} />
      </div>
      <div>
        <DrawerComponent isOpen={isDrawerOpen} toggleDrawer={setIsDrawerOpen} />
      </div>
      <header style={{ marginTop: 70 }}>
        <h1 style={{ color: "#000", fontSize: 25 }}>Edición de publicación</h1>
      </header>
      <h2 style={{ color: "#000", fontSize: 20, margin: 5 }}>
        Modificá los datos de la publicación
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
              value={formik.values.titleInput}
              disabled={loader}
            />
          </div>
          <div style={{ margin: 5, borderRadius: 2 }}>
            <TextField
              name="descriptionInput"
              id="outlined-multiline"
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
              value={formik.values.descriptionInput}
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
          {imagesToMap.length + images.length >= 3 ? (
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
                  disabled={loader}
                />
                <button
                  type="button"
                  onClick={handleImageSelect}
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            {imagesToMap
              ? imagesToMap.map((imageUrl, index) => (
                  <div
                    style={{ flex: 1, height: "100px", position: "relative" }}
                    key={"imagePost-" + key.current + index}
                  >
                    <img
                      src={imageUrl.url}
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
                        type="button"
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
                        type="button"
                        style={{
                          margin: 0,
                          padding: 0,
                          backgroundColor: "transparent",
                        }}
                        disabled={loader}
                        onClick={() => deleteImageUpload(index)}
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
            {loader ? <CircularProgress /> : "Guardar cambios"}
          </button>
        </main>
      </form>
      <Alerts
        title={"Publicacion actualizada con exito"}
        isError={false}
        active={activeModalSuccess}
        operation={redirect}
        functionActive={handleModalToggleSuccess}
      />
      <Alerts
        title={"Lo sentimos, la publicación no pudo ser actualizada."}
        description={"Por favor, volvé a intentarlo."}
        isError={true}
        active={activeModalError}
        operation={updatePost}
        functionActive={handleModalToggleError}
        actionName={"Intentar de nuevo"}
      />
      <Alerts
        title={"El tamaño maximo es 3 mb"}
        isError={true}
        active={activeModalMaxSizeError}
        operation={redirect}
        functionActive={setActiveModalMaxSizeError}
      />
    </main>
  );
};
