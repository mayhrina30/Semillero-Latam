import { TextField } from "@mui/material";
import { styled } from "@mui/styles";
import PropTypes from "prop-types"
const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            color: '#222222',
            borderColor: '#222222',
            borderWidth: '1px'

        },
        '&.Mui-focused fieldset': {
            borderColor: '#222222',
            borderWidth: '1px'
        }
    }
})
export default function ProviderTextField({ label, value, isMultiline, isRequired }) {

    return (

        <CustomTextField
            label={label}
            value={value}
            multiline={isMultiline}
            sx={{ marginTop: 1, marginBottom: 3, width: '328px' }}
            fullWidth
            focused
            required={isRequired}
            InputLabelProps={{
                style: {
                    color: '#4E169D',
                    fontWeight: 500
                }
            }}
        />
    )

}

ProviderTextField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    isMultiline: PropTypes.bool,
    isRequired: PropTypes.bool
}

ProviderTextField.defaultProps = {
    label: "Label",
    value: "Content",
    isMultiline: false,
    isRequired: false
}