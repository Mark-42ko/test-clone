import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, ButtonBase, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import DataBar from '../../../components/dataBar';
import Data from '../../../interface/propetiesType';
import Propeties from '../../../interface/propeties';

const theme = createTheme();

export default function Title() {
    const router = useRouter();
    const [text, setText] = React.useState<string>("");


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
                            <a><b>이제 숙소에 이름을 지⁠어⁠주⁠세⁠요.</b></a>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <>
                        <div style={{ margin: 30, display: "flex", flexDirection: "row", justifyContent: "right" }}>
                            <Button style={{ borderRadius: 30, height: 30, backgroundColor: "#F2F2F2", color: "black" }}><b>도움말</b></Button>
                            <Button style={{ borderRadius: 30, height: 30, backgroundColor: "#F2F2F2", marginLeft: 15, color: "black" }}><b>저장 및 나가기</b></Button>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: 50 }}>
                            <Typography style={{ fontSize: 35 }}>
                                <b>숙소 이름은 짧을수록 효과적입니다.</b>
                            </Typography>
                            <Typography style={{ fontSize: 20 }}>
                                <a>나중에 언제든지 변경할 수 있으니, 너무 걱정하지마세요.</a>
                            </Typography>
                            <TextField style={{ borderRadius: 10, width: "80%", marginTop: 20 }} error={text.length > 32 ? true : false} multiline rows={10} onChange={(evt) => setText(evt.currentTarget.value)} />
                            <Typography style={{marginTop:20}}><a>{text.length}/32</a></Typography>
                            { text.length > 32 && <Typography style={{ color: "red" }}><a>! 32까지 입력하실 수 있습니다.</a></Typography> }
                        </div>
                        <div>
                            <DataBar price={undefined} files={undefined} target={undefined} property={undefined} privacy={undefined} place={undefined} lat={undefined} lng={undefined} guestCount={undefined} bedCount={undefined} bathroomCount={undefined} firstMenu={undefined} secondMenu={undefined} thirdMenu={undefined} text={text}/>
                        </div>
                    </>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}