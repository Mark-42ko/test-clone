import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, ButtonBase, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import DataBar from '../../../components/dataBar';
import PriceTag from '../../../components/price/priceTag';

const theme = createTheme();

export default function Price() {
    const router = useRouter();
    const [price, setPrice] = React.useState<number>(0);

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
                            <a><b>이제 요금을 설정하세요</b></a>
                            <a style={{fontSize: 35}}>언제든지 변경하실 수 있습니다.</a>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }} overflow={"auto"}>
                    <>
                        <div style={{ margin: 30, display: "flex", flexDirection: "row", justifyContent: "right" }}>
                            <Button style={{ borderRadius: 30, height: 30, backgroundColor: "#F2F2F2", color: "black" }}><b>도움말</b></Button>
                            <Button style={{ borderRadius: 30, height: 30, backgroundColor: "#F2F2F2", marginLeft: 15, color: "black" }}><b>저장 및 나가기</b></Button>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: 50 }}>
                            <PriceTag price={price} setPrice={setPrice}/>                                          
                        </div>
                        <div>
                            <DataBar files={undefined} target={undefined} property={undefined} privacy={undefined} place={undefined} lat={undefined} lng={undefined} guestCount={undefined} bedCount={undefined} bathroomCount={undefined} firstMenu={undefined} secondMenu={undefined} thirdMenu={undefined} text={undefined} price={price}/>
                        </div>
                    </>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}