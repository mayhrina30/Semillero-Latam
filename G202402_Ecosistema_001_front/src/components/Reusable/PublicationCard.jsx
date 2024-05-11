import { Grid, Typography } from "@mui/material";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PropTypes from 'prop-types'
export const PublicationCard = ({ title, creationDate, numberOfViews }) => {

    return (
        <Grid 
          container
          alignItems={"center"}
          border= {"1.5px solid #4E169D"}
          borderRadius={"8px"}
          heigh="64px"
          justifyContent='space-between'
          padding={"8px 16px"}
          marginTop={"16px"}
        >
            <Grid 
                item
                display={"grid"}
                gap={"8px"}
                sx={{color: "#222222"}}
            
                >
                    <Typography 
                        variant="h4"
                        sx={{height: "24px",lineHeight: "25px",fontWeight: 600, fontSize:"18px"}}
                        fontFamily={"Nunito"}
                        fontSize={18}
                        xs={8}
                        >
                        {title}
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{height:"16px",fontWeight: 600, fontSize:"14px"}}
                        fontFamily={"Nunito"}
                        textAlign={"left"}
                    >
                        {creationDate}
                    </Typography>
            
            </Grid>
            <Grid 
                item
                sx={{color: "#4E169D", display:"grid", gridTemplateColumns:"repeat(2, 1fr)", alignItems:"center", gap:"8px", width:"64px"}}
            >
                <VisibilityOutlinedIcon/>
                
                <Typography variant="h5" 
                sx={{fontSize: "18px", fontWeight: 600, marginLeft:-2}}
                >
                {numberOfViews}
                </Typography>
            </Grid>
        </Grid>
    )
}

PublicationCard.propTypes = {
    provider: PropTypes.string,
    creationDate: PropTypes.string,
    numberOfViews: PropTypes.number
}


PublicationCard.defaultProps = {
    provider: "Upcycling",
    creationDate: "17/04/2024",
    numberOfViews: 50
}