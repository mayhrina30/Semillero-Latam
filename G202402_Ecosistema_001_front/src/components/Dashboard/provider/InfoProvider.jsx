import { Box, Container, Typography } from "@mui/material";
import PropTypes from "prop-types";
import ProviderTextField from "../../Reusable/ProviderTextField";

export const InfoProvider = ({
  name,
  category,
  email,
  phone,
  instagram,
  country,
  province,
  city,
  description,
}) => {
  return (
    <Container style={{ minWidth: "328px", paddingInline: 0 }}>
      <Box mt={5} mb={3}>
        <Typography
          component="h2"
          color={"#4E169D"}
          fontSize={"22px"}
          fontWeight={700}
        >
          {name}
        </Typography>
        <Typography
          component={"h4"}
          color={"#222222"}
          fontSize={"18px"}
          fontWeight={500}
          lineHeight={"24px"}
          gutterBottom
        >
          {category}
        </Typography>
      </Box>
      <ProviderTextField label="Categoría" value={name} />
      <ProviderTextField label="Correo Electrónico" value={email} />
      <ProviderTextField label="Teléfono o Whatsapp" value={phone} />
      <ProviderTextField label="Instagram" value={instagram} />
      <ProviderTextField label="País" value={country} />
      <ProviderTextField label="Provincia/Estado" value={province} />
      <ProviderTextField label="Ciudad" value={city} />
      <ProviderTextField
        label="Descripción del Producto/Servicio"
        isMultiline={true}
        isRequired={true}
        value={description}
      />
    </Container>
  );
};
InfoProvider.propTypes = {
  name: PropTypes.string,
  category: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  instagram: PropTypes.string,
  country: PropTypes.string,
  city: PropTypes.string,
  description: PropTypes.string,
};

InfoProvider.defaultProps = {
  name: "Nombre De Proveedor",
  category: "Categoría",
  email: "proveedor@email.com",
  phone: "Número De Teléfono",
  instagram: "@cuentaDeInstagram",
  country: "País Del Proveedor",
  province: "Provincia/Estado",
  city: "Ciudad",
  description: "Debe tener la descripción del producto.",
};
