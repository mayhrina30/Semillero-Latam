import { TextField } from "@material-ui/core";
import { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../../Reusable/Navbar";
import MenuItem from "@mui/material/MenuItem";
import DrawerComponent from "../../Reusable/Drawer";
import Download from "../../../assets/svgs/download.svg";
import Delete from "../../../assets/svgs/delete.svg";
import Edit from "../../../assets/svgs/edit.svg";
import CircularProgress from "@mui/material/CircularProgress";
import {
  createImageProvider,
  createProvider,
  deleteImageProvider,
  getProviderByCategory,
  getProviderById,
  putProvider,
} from "../../../utils/services/providerService";
import { UserToken } from "../../../utils/contexts";
import { useParams } from "react-router-dom";
import { FieldArray, useFormik } from "formik";
import { providerSchema } from "../../../utils/schemas/providerSchema";
import { Alerts } from "../../Reusable/alerts";
import { getCountriesBack } from "../../../utils/services/countryService";
import { getCategoriesBack } from "../../../utils/services/categoryService";
import { getProvincesBack } from "../../../utils/services/provincesService";
import { decodeJWT } from "../../../utils/decodeJWT";

export const EditProvider = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesEliminated, setImagesEliminated] = useState([]);
  const [imagesToMap, setImagesToMap] = useState(false);
  const [imagesUpload, setImagesUpload] = useState([]);
  const [loader, setLoader] = useState(false);
  const [activeModalError, setActiveModalError] = useState(false);
  const [activeModalSuccess, setActiveModalSuccess] = useState(false);
  const [userData, setUserData] = useState();
  const [activeModalMaxSizeError, setActiveModalMaxSizeError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [reload, setReload] = useState(false);
  const [provider, setProvider] = useState();
  const [countries, setCountries] = useState();
  const [categories, setCategories] = useState();
  const [provinces, setProvinces] = useState();
  const params = useParams();
  const { token, setToken } = useContext(UserToken);
  const fileInputRef = useRef(null);
  const key = useRef(250);
  const providerInitial = useRef();

  const idProvider = useRef();
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
  const updateProvider = async () => {
    setLoader(true);
    if (imagesToMap.length > 0 || imagesUpload.length > 0) {
      const storage = localStorage.getItem("token");
      let permit = true;
      if (imagesToMap != providerInitial.current) {
        for (const image of imagesEliminated) {
          const response = await deleteImageProvider({
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

            const response = await createImageProvider({
              file: formData,
              token: storage,
              providerId: idProvider.current,
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
      let categoryData;
      let provinceData;
      let countryData;
      categories.map((category) => {
        if (category.name === formik.values.category) {
          categoryData = category;
        }
      });
      countries.map((country) => {
        if (country.name === formik.values.country) {
          countryData = country;
        }
      });
      provinces.map((province) => {
        if (province.name === formik.values.province) {
          provinceData = province;
        }
      });
      const providerData = {
        id: idProvider.current,
        name: formik.values.name,
        description: formik.values.description,
        deleted: false,
        instagram: formik.values.instagram,
        facebook: formik.values.facebook,
        email: formik.values.email,
        phone: formik.values.phone,
        category: categoryData,
        country: countryData,
        province: provinceData,
      };
      const response = await putProvider({
        id: idProvider.current,
        provider: providerData,
        token: storage,
        email: userData.sub,
      });
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
  const fetchProvider = async () => {
    const storage = localStorage.getItem("token");
    const response = await getProviderById({
      id: idProvider.current,
      token: storage,
    });
    setProvider(response);
    setImagesToMap(response.images);
    setProvinces(response.country.provinces);
    providerInitial.current = response.images;
  };
  useEffect(() => {
    const storage = localStorage.getItem("token");
    const id = params.id;
    if (id) {
      idProvider.current = id;
    }

    fetchCategories({ tokenValue: storage });
    fetchCountries({ tokenValue: storage });
    fetchProvider();
    const user = decodeJWT({ token: storage });
    if (user) {
      setUserData(user);
    }
  }, []);
  const fetchCategories = async ({ tokenValue }) => {
    const response = await getCategoriesBack({ token: tokenValue });
    if (response == false) {
      console.log("fallo");
    } else {
      setCategories(response);
    }
  };
  const fetchCountries = async ({ tokenValue }) => {
    const response = await getCountriesBack({ token: tokenValue });
    if (response == false) {
      console.log("fallo");
    } else {
      setCountries(response);
    }
  };
  const redirect = () => {
    window.location.href = "/";
  };
  const formik = useFormik({
    initialValues: {
      name: provider ? provider.name : "",
      instagram: provider ? provider.instagram : "",
      description: provider ? provider.description : "",
      email: provider ? provider.email : "",
      phone: provider ? provider.phone : "",
      facebook: provider ? provider.facebook : "",
      category: provider ? provider.category.name : "",
      country: provider ? provider.country.name : "",
      province: provider ? provider.province.name : "",
    },
    onSubmit: updateProvider,
    validationSchema: providerSchema,
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
        <main style={{ padding: 15 }}>
          <div style={{ margin: 5, marginBottom: 15 }}>
            <TextField
              type="text"
              name="name"
              id="outlined-basic"
              label="Nombre de la Organización*"
              variant="outlined"
              fullWidth={true}
              onChange={formik.handleChange}
              error={formik.errors.name}
              value={formik.values.name}
              helperText={
                formik.errors.name
                  ? formik.errors.name
                  : "Se visualizará en el titulo de la publicación"
              }
              disabled={loader}
            />
          </div>
          <div style={{ margin: 5, marginBottom: 15 }}>
            <TextField
              name="facebook"
              id="outlined-basic"
              label="Facebook"
              variant="outlined"
              fullWidth={true}
              onChange={formik.handleChange}
              error={formik.errors.facebook}
              value={formik.values.facebook}
              helperText={
                formik.errors.facebook
                  ? formik.errors.facebook
                  : "Podés pegar el link de tu perfil"
              }
              disabled={loader}
            />
          </div>
          <div style={{ margin: 5, marginBottom: 15 }}>
            <TextField
              name="instagram"
              id="outlined-basic"
              label="Instagram"
              variant="outlined"
              fullWidth={true}
              onChange={formik.handleChange}
              error={formik.errors.instagram}
              value={formik.values.instagram}
              helperText={
                formik.errors.instagram
                  ? formik.errors.instagram
                  : "Podés pegar el link de tu perfil"
              }
              disabled={loader}
            />
          </div>
          <div style={{ margin: 5, marginBottom: 15 }}>
            <TextField
              name="phone"
              id="outlined-basic"
              label="Whatsapp"
              variant="outlined"
              fullWidth={true}
              onChange={formik.handleChange}
              error={formik.errors.phone}
              value={formik.values.phone}
              helperText={
                formik.errors.phone
                  ? formik.errors.phone
                  : "Podés pegar el link de tu Whatsapp"
              }
              disabled={loader}
            />
          </div>
          <div style={{ margin: 5, marginBottom: 15 }}>
            <TextField
              name="email"
              id="outlined-basic"
              label="Correo electrónico"
              variant="outlined"
              fullWidth={true}
              onChange={formik.handleChange}
              error={formik.errors.email}
              value={formik.values.email}
              helperText={
                formik.errors.email
                  ? formik.errors.email
                  : "El mismo con el que te registraste o uno diferente"
              }
              disabled={loader}
            />
          </div>
          <div style={{ margin: 5, marginBottom: 15 }}>
            <TextField
              name="category"
              id="filled-select-currency"
              label="Categoría*"
              variant="outlined"
              SelectProp={{ native: true }}
              fullWidth={true}
              onChange={formik.handleChange}
              error={formik.errors.category}
              value={formik.values.category}
              select
              helperText={
                formik.errors.category
                  ? formik.errors.category
                  : "Seleccioná la categoría de tu Producto / Servicio"
              }
              disabled={loader}
            >
              {categories &&
                categories.map((categoryMap) => (
                  <MenuItem key={categoryMap.name} value={categoryMap.name}>
                    {categoryMap.name}
                  </MenuItem>
                ))}
            </TextField>
          </div>
          <div style={{ margin: 5, marginBottom: 15 }}>
            <TextField
              name="country"
              id="filled-select-currency"
              label="País*"
              variant="outlined"
              SelectProp={{ native: true }}
              fullWidth={true}
              value={formik.values.country}
              onChange={(e) => {
                countries.map((country) => {
                  if (country.name === e.target.value) {
                    formik.setFieldValue("province", "");
                    setProvinces(country.provinces);
                    formik.setFieldValue("country", country.name);
                  }
                });
              }}
              error={formik.errors.country}
              select
              helperText={
                formik.errors.country
                  ? formik.errors.country
                  : "Seleccioná un país de la lista"
              }
              disabled={loader}
            >
              {countries &&
                countries.map((countriesMap) => (
                  <MenuItem key={countriesMap.name} value={countriesMap.name}>
                    {countriesMap.name}
                  </MenuItem>
                ))}
            </TextField>
          </div>
          {provinces ? (
            <div style={{ margin: 5, marginBottom: 15 }}>
              <TextField
                name="province"
                id="filled-select-currency"
                label="Provincia/Estado*"
                variant="outlined"
                SelectProp={{ native: true }}
                fullWidth={true}
                onChange={formik.handleChange}
                error={formik.errors.province}
                value={formik.values.province}
                select
                helperText={
                  formik.errors.province
                    ? formik.errors.province
                    : "Seleccioná una provincia/estado de la lista"
                }
                disabled={loader}
              >
                {provinces &&
                  provinces.map((provincesMap) => (
                    <MenuItem key={provincesMap.name} value={provincesMap.name}>
                      {provincesMap.name}
                    </MenuItem>
                  ))}
              </TextField>
            </div>
          ) : (
            ""
          )}

          <div style={{ margin: 5, borderRadius: 2 }}>
            <TextField
              type="text"
              name="description"
              id="outlined-multiline-flexible"
              label="Descripción del Producto/Servicio*"
              variant="outlined"
              multiline
              minRows={10}
              fullWidth={true}
              onChange={formik.handleChange}
              inputProps={{ maxLength: 2000 }}
              error={formik.errors.description}
              helperText={formik.errors.description}
              value={formik.values.description}
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
              <h5 style={{ color: "#aaa" }}>Máximo 300 caracteres</h5>
            </div>
            <div style={{ flex: 1, justifyContent: "flex-end" }}>
              <h5 style={{ color: "#aaa" }}>
                {formik.values.description.length} / 300
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
                  <img src={Download} alt=" subir imagen" /> Subir Imagen
                </button>

                <p
                  style={{
                    color: errorMessage ? "#f00" : "#000",
                    textAlign: "initial",
                    fontSize: "12px",
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
                    fontSize: "12px",
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
        <div style={{ display: "flex", flexDirection: "row" }}>
          {imagesToMap
            ? imagesToMap.map((imageUrl, index) => (
                <div
                  style={{ display: "flex", flex: 1, justifyContent: "center" }}
                  key={"imagePost-" + key.current + index}
                >
                  <div
                    style={{
                      height: "80px",
                      width: "104px",
                      position: "relative",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={imageUrl.url}
                      alt="imagen seleccionada"
                      width={"80%"}
                      style={{
                        objectFit: "cover",
                        borderRadius: 5,
                        height: "80px",
                        width: "104px",
                      }}
                    />
                    <div style={{ position: "absolute", right: 5, top: 0 }}>
                      <button
                        style={{
                          margin: 0,
                          padding: 0,
                          backgroundColor: "transparent",
                        }}
                        onClick={() => deleteImage(index)}
                        disabled={loader}
                        type="button"
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
                </div>
              ))
            : ""}
          {images
            ? images.map((imageUrl, index) => (
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                  }}
                  key={"imagePost-" + key.current + index}
                >
                  <div
                    style={{
                      height: "80px",
                      width: "104px",
                      position: "relative",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt="imagen seleccionada"
                      width={"80%"}
                      style={{
                        objectFit: "cover",
                        borderRadius: 5,
                        height: "80px",
                        width: "104px",
                      }}
                    />
                    <div style={{ position: "absolute", right: 5, top: 0 }}>
                      <button
                        style={{
                          margin: 0,
                          padding: 0,
                          backgroundColor: "transparent",
                        }}
                        onClick={() => deleteImageUpload(index)}
                        type="button"
                        disabled={loader}
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
                </div>
              ))
            : ""}
        </div>

        <button
          type="submit"
          style={{ margin: 15, backgroundColor: "#4E169D", width:"90%" }}
          disabled={loader}
        >
          {loader ? <CircularProgress /> : "Guardar cambios"}
        </button>
      </form>
      <Alerts
        title={"Lo sentimos, la publicación no pudo ser actualizada."}
        description={"Por favor, volvé a intentarlo."}
        isError={true}
        active={activeModalError}
        operation={updateProvider}
        functionActive={handleModalToggleError}
        actionName={"Intentar de nuevo"}
      />
      <Alerts
        title={"Lo sentimos, la publicación no pudo ser actualizada."}
        description={"Por favor, volvé a intentarlo."}
        isError={true}
        active={activeModalError}
        operation={updateProvider}
        functionActive={handleModalToggleError}
        actionName={"Intentar de nuevo"}
      />
      <Alerts
        title={"El tamaño maximo es 3 mb"}
        isError={true}
        active={activeModalMaxSizeError}
        functionActive={setActiveModalMaxSizeError}
      />
      <Alerts
        title={"Cambios guardados con exito"}
        isError={false}
        active={activeModalSuccess}
        operation={redirect}
        functionActive={handleModalToggleSuccess}
      />
    </main>
  );
};
