import { Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Hostings from "../interface/hostings";
import FavoriteIcon from '@mui/icons-material/Favorite';
import SimpleImageSlider from "react-simple-image-slider/dist/ImageSlider";
// datefns
function HostingList() {
    const [data, setData] = useState<[Hostings]>();

    useEffect(() => {
        !async function () {
            const response = await fetch("/api/hosting/publishing");
            const json = await response.json();
            setData(json.data);
        }()
    }, []);

    return (
        <Grid container>
            {data && data.map((one) =>
                <Grid item md={2} sm={12} sx={{ padding: 2 }}>
                    <Card sx={{ width: "100%", maxWidth: 530, position: "relative" }} key={one._id} >
                        <IconButton style={{ position: "absolute", top: 5, right: 5, zIndex: 10 }} onClick={() => console.log("버튼")}>
                            <FavoriteIcon />
                        </IconButton>
                        <CardActionArea onClick={() => console.log("카드")}>
                            <CardMedia
                                component="img"
                                height={300}
                                image={`${one.imageUrl}`}
                                alt="숙소 대표 이미지"
                                sx={{ borderRadius: 5, padding: 1 }}
                            />
                            {/* <SimpleImageSlider
                                width={896}
                                height={504}
                                images={one.imageUrl}
                                showBullets={true}
                                showNavs={true}
                            /> */}
                            <CardContent style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <Typography style={{ fontSize: 15 }}>
                                        <b>{one.name}</b>
                                    </Typography>
                                    <Typography style={{ fontSize: 12 }}>
                                        ${one.price} 박
                                    </Typography>
                                </div>
                                <Typography style={{ fontSize: 12 }}>
                                    신규★
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            )}

        </Grid>
    );
}

export default HostingList;