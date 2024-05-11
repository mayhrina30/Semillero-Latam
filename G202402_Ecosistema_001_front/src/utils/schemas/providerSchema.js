import * as yup from "yup";

export const providerSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, "El nombre debe tener al menos 5 caracteres")
    .max(50, "El nombre no debe exceder los 50 caracteres")
    .required("Este campo es obligatorio"),
  category: yup.string().optional().required("Este campo es obligatorio"),
  email: yup.string().email("Debe ser un email").nullable(),
  phone: yup
    .string()
    .min(10, "El Whatsapp debe tener al menos 10 caracteres")
    .max(50, "El Whatsapp no debe exceder los 50 caracteres")
    .url("Debe ser un link")
    .nullable(),
  facebook: yup
    .string()
    .min(10, "El campo facebook debe tener al menos 10 caracteres")
    .max(50, "El campo facebook no debe exceder los 50 caracteres")
    .url("Debe ser un link")
    .nullable(),
  instagram: yup
    .string()
    .min(10, "El campo instagram debe tener al menos 10 caracteres")
    .max(50, "El campo instagram no debe exceder los 50 caracteres")
    .url("Debe ser un link")
    .nullable(),
  country: yup
    .string()
    .optional("Este debe ser un texto")
    .required("Este campo es obligatorio"),
  province: yup
    .string()
    .optional("Este debe ser un texto")
    .required("Este campo es obligatorio"),
  description: yup
    .string("Este debe ser un texto")
    .min(10, "El valor mínimo es 10")
    .max(300, "El valor máximo es 300")
    .required("Este campo es obligatorio"),
});
/* name, descripcion, categoria, email, telefono/whatsapp, face, pais, province, ¿ciudad?  */
