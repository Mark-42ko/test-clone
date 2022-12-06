import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, ButtonBase } from '@mui/material';
import { useRouter } from 'next/router';
import PropetiesCard from '../../../components/card/propetiesCard';
import Propeties from '../../../interface/propeties';
import DataBar from '../../../components/dataBar';

const theme = createTheme();

export default function PropertyTypeGroup() {
    const router = useRouter();
    const [data, setData] = React.useState<[Propeties]>();
    const [target, setTarget] = React.useState<Propeties | undefined>();

    React.useEffect(() => {
        !async function () {
            const datas = await fetch("/api/propeties/propeties");
            const result = await datas.json();
            setData(result.data)
        }()
    }, [])

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
                            <a><b>호스팅할 숙소</b></a>
                            <a><b>유형을</b></a>
                            <a><b>알려주세요.</b></a>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <>
                        <div style={{ margin: 30, display: "flex", flexDirection: "row", justifyContent: "right" }}>
                            <Button style={{ borderRadius: 30, height: 30, backgroundColor: "#F2F2F2", color: "black" }}><b>도움말</b></Button>
                            <Button style={{ borderRadius: 30, height: 30, backgroundColor: "#F2F2F2", marginLeft: 15, color: "black" }}><b>저장 및 나가기</b></Button>
                        </div>
                        {
                            data && data!.map(one => {
                                return (
                                    <div style={{ display: "flex", justifyContent: "center", margin: 10 }} key={one._id}>
                                        <PropetiesCard data={one} setTarget={setTarget}/>
                                    </div>
                                )
                            })
                        }
                        <div>
                            <DataBar text={undefined} price={undefined} files={undefined} target={target} property={undefined} privacy={undefined} place={undefined} lat={undefined} lng={undefined} guestCount={undefined} bedCount={undefined} bathroomCount={undefined} firstMenu={undefined} secondMenu={undefined} thirdMenu={undefined}/>
                        </div>
                    </>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}