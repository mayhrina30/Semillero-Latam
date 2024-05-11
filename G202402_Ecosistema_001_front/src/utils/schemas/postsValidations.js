import * as yup from "yup";

export const schemaPosts = yup.object().shape({
  titleInput: yup
    .string()
    .min(10, "El texto debe tener al menos 10 caracteres")
    .max(50, "El texto no debe exceder los 50 caracteres")
    .required("Este campo es obligatorio"),
  descriptionInput: yup
    .string()
    .min(10, "El valor mínimo es 10")
    .max(2000, "El valor máximo es 2000")
    .required("Este campo es obligatorio"),
});
