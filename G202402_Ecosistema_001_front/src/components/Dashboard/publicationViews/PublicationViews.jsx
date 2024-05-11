import { Grid, Typography } from "@mui/material"
import { PublicationCard } from "../../Reusable/PublicationCard"
import { useEffect, useState } from "react"
import { getPostsActives } from "../../../utils/services/productService"

export const PublicationViews = () => {
     const [data, setdata] = useState([])
    
    useEffect(() => {
        getPostsActives().then(res => setdata(res))
   },[])

    return (

        <Grid
            container
            direction={"column"}
            marginTop={2}
            marginBottom={4}
        >
            <Typography 
                        variant="h2"
                        sx={{color: "#222", height: "24px",lineHeight: "30px",fontWeight: 700, fontSize:"20px"}}
                        margin={"30px auto 16px"}
                        fontFamily={"Nunito"}
                        >
                        Visualizaciones por Publicación
            </Typography>
            
            <Grid 
                item
            >
                {data?.map(publication => (
                    <PublicationCard key={publication.id} title={publication.title} creationDate={publication.creationDate} numberOfViews={publication.numberOfViews}/>
                ))}
            
            </Grid>
            
        </Grid>
    )
  
}

