import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, ButtonBase } from '@mui/material';
import { useRouter } from 'next/router';
import DataBar from '../../../components/dataBar';
import Data from '../../../interface/propetiesType';
import PropetiesTypeCard from '../../../components/propetiesTypeCard';
import Propeties from '../../../interface/propeties';
import { useSession } from 'next-auth/react';

const theme = createTheme();

export default function PropertyType() {
    const router = useRouter();
    const [data, setData] = React.useState<[Data]>();
    const [datas, setDatas] = React.useState<Propeties>();
    const [property, setProperty] = React.useState();
    const { data: session, status } = useSession();

    React.useEffect(() => {
        !async function () {
            const response = await fetch("/api/hosting/hostingGroup", {
                method: "POST",
                body: JSON.stringify({
                    _id: router.query._id,
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await response.json();

            const datas = await fetch("/api/propeties/propetiesType", {
                method: "POST",
                body: JSON.stringify({
                    type: json.data.property
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            const result = await datas.json();
            setData(result.data?.types);
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
                            <a><b>다음 중 숙소를 가장 잘 설명하는 문구는 무엇인가요?</b></a>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }} overflow={"auto"}>
                    <>
                        <div style={{ margin: 30, display: "flex", flexDirection: "row", justifyContent: "right" }}>
                            <Button style={{ borderRadius: 30, height: 30, backgroundColor: "#F2F2F2", color: "black" }}><b>도움말</b></Button>
                            <Button style={{ borderRadius: 30, height: 30, backgroundColor: "#F2F2F2", marginLeft: 15, color: "black" }}><b>저장 및 나가기</b></Button>
                        </div>
                        {
                            data && data!.map((one) => {
                                return (
                                    <div style={{ display: "flex", justifyContent: "center", margin: 10 }} key={one.description} >
                                        <PropetiesTypeCard data={one} setProperty={setProperty}/>
                                    </div>
                                )
                            })
                        }
                        <div>
                            <DataBar text={undefined} price={undefined} files={undefined} target={datas} property={property} privacy={undefined} place={undefined} lat={undefined} lng={undefined} guestCount={undefined} bedCount={undefined} bathroomCount={undefined} firstMenu={undefined} secondMenu={undefined} thirdMenu={undefined}/>
                        </div>
                    </>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}