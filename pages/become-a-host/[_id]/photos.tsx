import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, ButtonBase } from '@mui/material';
import { useRouter } from 'next/router';
import DataBar from '../../../components/dataBar';
import PhotoPlace from '../../../components/photoPlace';
import UploadPhotos from '../../../components/uploadPhotos';

const theme = createTheme();

export default function Photos() {
    const router = useRouter();
    const [files, setFiles] = React.useState<File[]>([]);

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
                            <a><b>숙소 사진을 추가해주세요.</b></a>
                            <a style={{fontSize: 20, marginTop:30}}>숙소 등록을 시작하려면 사진 5장을 제출하셔야 합니다. 나중에 추가하거나 변경하실 수 있습니다</a>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }} overflow={"auto"}>
                    <>
                        <div style={{ margin: 30, display: "flex", flexDirection: "row", justifyContent: "right" }}>
                            <Button style={{ borderRadius: 30, height: 30, backgroundColor: "#F2F2F2", color: "black" }}><b>도움말</b></Button>
                            <Button style={{ borderRadius: 30, height: 30, backgroundColor: "#F2F2F2", marginLeft: 15, color: "black" }}><b>저장 및 나가기</b></Button>
                        </div>
                        <div style={{display:"flex", alignItems:"center", width:"100%", flexDirection:"column"}}>
                            {files.length !== 0 ?
                                <UploadPhotos setFiles={setFiles} files={files}/>
                                :
                                <PhotoPlace setFiles={setFiles}/>
                            }
                        </div>
                        <div>
                            <DataBar text={undefined} price={undefined} files={files} target={undefined} property={undefined} privacy={undefined} place={undefined} lat={undefined} lng={undefined} guestCount={undefined} bedCount={undefined} bathroomCount={undefined} firstMenu={undefined} secondMenu={undefined} thirdMenu={undefined}/>
                        </div>
                    </>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}