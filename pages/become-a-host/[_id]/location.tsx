import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button, ButtonBase, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import DataBar from '../../../components/dataBar';
import SearchMap from '../../../components/map/searchMap';
import MapModal from '../../../components/map/mpaModal';
import Room from '@mui/icons-material/Room';
import MapLocation from '../../../components/map/mapLocation';
import PlaceIcon from '@mui/icons-material/Place';

const theme = createTheme();

export default function Location() {
    const router = useRouter();
    const [open, setOpen] = React.useState<boolean>(false);
    const [mapData, setMapData] = React.useState<string | undefined>("");
    const mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
    const mapUri = `https://maps.googleapis.com/maps/api/staticmap?center=37.5666805,126.9784147&zoom=12&size=640x600&key=${mapKey}`
    const [backgroundMap, setBackgroundMap] = React.useState<string>(mapUri);
    const [mapTarget, setmapTarget] = React.useState<any>();
    const [mapCheck, setMapCheck] = React.useState<boolean>(false);
    const [place, setPlace] = React.useState<string>("");
    const [totalLat, setTotalLat] = React.useState<number>(0);
    const [totalLng, setTotalLng] = React.useState<number>(0);

    const clickHandle = () => {
        setOpen(true);
    };

    const homeButton = () => {
        router.push("/");
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={6}
                    sx={{
                        background: "linear-gradient(#FF0080, #7401DF)",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div style={{ padding: 50, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                        <ButtonBase style={{ width: 50 }} onClick={homeButton}>
                            <img src="/image/airbnb.png" style={{ width: 50, height: 50 }} />
                        </ButtonBase>
                        <div style={{ display: "flex", fontSize: 50, color: "white", flexDirection: "column", alignItems: "start", justifyContent: "center", height: "100%", marginBottom: 100 }}>
                            {mapCheck ?
                                <a><b>핀이 놓인 위치가 정확한가요?</b></a>
                                :
                                <a><b>숙소 위치는 어디인가요?</b></a>
                            }
                        </div>
                    </div>
                </Grid>
                {
                    mapCheck ?
                        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative" }}>
                            <div>
                                <MapLocation mapData={mapTarget} setTotalLat={setTotalLat} setTotalLng={setTotalLng}/>
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "200px",
                                        width: "100%"
                                    }}
                                    style={{
                                        display:"flex",
                                        justifyContent:"center"
                                    }}
                                >
                                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ width: 450, height: 70, backgroundColor: "white", borderRadius: 40, display: "flex", alignItems: "center" }}>
                                        <Room style={{ marginLeft: 25, marginRight: 15 }} />
                                        <b style={{ fontSize: 15 }}>{mapTarget.result.formatted_address}</b>
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: "2px",
                                        width: "100%"
                                    }}
                                >
                                    <DataBar text={undefined} price={undefined} files={undefined} target={undefined} privacy={undefined} property={undefined} place={place} lat={totalLat} lng={totalLng} guestCount={undefined} bedCount={undefined} bathroomCount={undefined} firstMenu={undefined} secondMenu={undefined} thirdMenu={undefined}/>
                                </Box>
                                <Box
                                    sx={{
                                        position: "absolute",
                                        left: "47%",
                                        top: "43%"
                                    }}
                                    style={{
                                        
                                        justifyContent:"center",
                                        alignItems:"center"
                                    }}
                                >
                                    <PlaceIcon style={{fontSize: 50, color: "red"}}/>
                                </Box>
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "30px",
                                        right: "20px",

                                    }}
                                >
                                    <Button style={{ borderRadius: 30, height: 30, backgroundColor: "black", color: "white" }}><b>도움말</b></Button>
                                    <Button style={{ borderRadius: 30, height: 30, backgroundColor: "black", marginLeft: 15, color: "white" }}><b>저장 및 나가기</b></Button>
                                </Box>
                            </div>
                        </Grid>
                        :
                        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square sx={{ width:"100%", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundImage: `url('${backgroundMap}')`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                            <>
                                <div style={{ margin: 30, display: "flex", flexDirection: "row", justifyContent: "right" }}>
                                    <Button style={{ borderRadius: 30, height: 30, backgroundColor: "black", color: "white" }}><b>도움말</b></Button>
                                    <Button style={{ borderRadius: 30, height: 30, backgroundColor: "black", marginLeft: 15, color: "white" }}><b>저장 및 나가기</b></Button>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", flexDirection: "column", width:"100%", justifyContent:"center" }}>
                                    <Box sx={{ position: "absolute", top: "200px" }}>
                                        {
                                            open ?
                                                <MapModal setOpen={setOpen} open={open} mapData={mapData} setmapTarget={setmapTarget} setMapCheck={setMapCheck} setBackgroundMap={setBackgroundMap} setPlace={setPlace}/>
                                                :
                                                <SearchMap clickHandle={clickHandle} setMapData={setMapData} />
                                        }
                                    </Box>
                                </div>
                                <div>
                                    <DataBar text={undefined} price={undefined} files={undefined} target={undefined} privacy={undefined} property={undefined} place={undefined} lat={undefined} lng={undefined} guestCount={undefined} bedCount={undefined} bathroomCount={undefined} firstMenu={undefined} secondMenu={undefined} thirdMenu={undefined}/>
                                </div>
                            </>
                        </Grid>
                }
            </Grid>
        </ThemeProvider>
    );
}