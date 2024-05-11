import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
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
import { decodeJWT } from "../../../utils/decodeJWT";
import { Alerts } from "../../Reusable/alerts";
import { providerSchema } from "../../../utils/schemas/providerSchema";
import { getCategoriesBack } from "../../../utils/services/categoryService";
import { getCountriesBack } from "../../../utils/services/countryService";
import { getProvincesBack } from "../../../utils/services/provincesService";
import {
  createImageProvider,
  createProvider,
} from "../../../utils/services/providerService";

export const AddProvider = () => {
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
  const [activeModalMaxProvidersError, setActiveModalMaxProvidersError] = useState(false);
  const [activeModalSuccess, setActiveModalSuccess] = useState(false);
  const [activeModalMaxSizeError, setActiveModalMaxSizeError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [countries, setCountries] = useState();
  const [categories, setCategories] = useState();
  const [provinces, setProvinces] = useState();
  const handleModalToggleMaxSizeError = () => {
    setActiveModalMaxSizeError(!activeModalMaxSizeError);
  };
  const handleModalToggleError = () => {
    setActiveModalError(!activeModalError);
    setLoader(false);
  };
  const handleModalMaxProvidersError = () => {
    setActiveModalMaxProvidersError(!activeModalMaxProvidersError);
    setLoader(false);
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
    fetchCategories({ tokenValue: storage });
    fetchCountries({ tokenValue: storage });
    fetchProvinces({ tokenValue: storage });
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
  const sendProvider = async (data) => {
    setLoader(true);
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
    if (imagesUpload.length > 0) {
      const response = await createProvider({
        provider: formik.values,
        token,
        email: userData.sub,
        categoryData,
        provinceData,
        countryData,
      })
        .then((data) => {
          if (data != false) {
            const providerId = data.id;
            let contador = 0;
            if (imagesUpload.length >= 1 || imagesUpload.length <= 3) {
              imagesUpload.forEach(async (image) => {
                if (image != undefined) {
                  let formData = new FormData();
                  formData.append("image", image);
                  const response = await createImageProvider({
                    file: formData,
                    token,
                    providerId,
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
            handleModalMaxProvidersError();
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
    name: "",
    instagram: "",
    description: "",
    email: "",
    phone: "",
    facebook: "",
    category: categories,
    country: countries,
    province: provinces,
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: sendProvider,
    validationSchema: providerSchema,
  });
  const redirect = () => {
    window.location.href = "/";
  };
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
  const fetchProvinces = async ({ tokenValue }) => {
    const response = await getProvincesBack({ token: tokenValue });
    if (response == false) {
      console.log("fallo");
    } else {
      setProvinces(response);
    }
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
        <h1 style={{ color: "#222222", fontSize: 25 }}>
          Carga de Producto/Servicio
        </h1>
      </header>
      <h2 style={{ color: "#222222", fontSize: 20, margin: 5 }}>
        Completé los formulario para <br /> subir tu Producto/Servicio
      </h2>

      <form onSubmit={formik.handleSubmit}>
        <main style={{ padding: 15}}>
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
              onChange={(e) => {
                countries.map((country) => {
                  if (country.name === e.target.value) {
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
                select
                helperText={
                  formik.errors.province
                    ? formik.errors.province
                    : "Seleccioná una provincia/estado de la lista"
                }
                value={formik.values.province}
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
                  <img src={Download} alt=" subir imagen" /> Subir imagen
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
                        onClick={() => deleteImage(index)}
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
          {loader ? <CircularProgress /> : "Crear Producto/Servicio"}
        </button>
      </form>
      <Alerts
        title={"Lo sentimos, el Producto/Servicio no pudo ser creado."}
        description={"Por favor, volvé a intentarlo."}
        isError={true}
        active={activeModalError}
        operation={sendProvider}
        functionActive={handleModalToggleError}
        actionName={"Intentar de nuevo"}
      />
      <Alerts
        title={"Producto/Servicio creado con éxito"}
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
      /><Alerts
        title={"Solo puedes crear 3 Productos/Servicios"}
        isError={true}
        active={activeModalMaxProvidersError}
        operation={handleModalMaxProvidersError}
        functionActive={handleModalMaxProvidersError}
      />
    </main>
  );
};
