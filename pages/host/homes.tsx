import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, ButtonBase } from '@mui/material';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Hostings from '../../interface/hostings';

const theme = createTheme();

export default function PropertyTypeGroup() {
    const router = useRouter();
    const [data, setData] = React.useState<Hostings[]>();
    const {data: session, status} = useSession();

    React.useEffect(() => {
        !async function () {
            const response = await fetch("/api/hosting/findHostings", {
                method: "POST",
                body: JSON.stringify({
                    user: session?.user?.email
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await response.json();
            setData(json.data);
        }()
    }, [session])

    const homeButton = () => {
        router.push("/");
    };

    const newHostingButton = async() => {
        const response = await fetch("/api/hosting/create", {
            method: "POST",
                body: JSON.stringify({
                    user: session?.user?.email
                }),
                headers: {
                    "Content-type": "application/json"
                }
        });
        const json = await response.json();
        router.push(`/become-a-host/${json.data._id}/property-type-group`);
    }

    const buttonTitle : {[key:string] : string}= {
        "property-type-group" : "숙소 유형 선택",
        "property-type" : "숙소 타입 선택",
        "privacy-type" : "숙소 종류 선택",
        "location" : "숙소 위치 선택",
        "floor-plan" : "최대 인원 선택",
        "amenities" : "숙소 편의시설 선택",
        "photos" : "숙소 사진 선택",
        "title" : "숙소 이름 선택",
        "price" : "숙소 요금 선택",
        "receipt" : "숙소 등록 확인"
    }

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
                            <a><b>호스팅할 숙소를 생성해주세요.</b></a>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square sx={{ display: "flex", flexDirection: "column" }}>
                    <>
                        <div style={{ margin: 30, display: "flex", flexDirection: "row", justifyContent: "right" }}>
                            <Button style={{ borderRadius: 30, height: 30, backgroundColor: "#F2F2F2", color: "black" }}><b>도움말</b></Button>
                            <Button style={{ borderRadius: 30, height: 30, backgroundColor: "#F2F2F2", marginLeft: 15, color: "black" }}><b>저장 및 나가기</b></Button>
                        </div>
                        <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center", marginTop:100}}>
                            { data && data.map((one)=> {
                                return(
                                    !one.publishing &&
                                    <div style={{marginTop:15, width:"100%", alignItems:"center", display:"flex", flexDirection:"column"}}  key={one._id}>
                                <Button key={one._id} onClick={()=> one.step === "//property-type-group" ? router.push(`/become-a-host/${one._id}/property-type-group`) : router.push(one.step)} style={{fontSize: 30, color:"black", borderRadius:5, border:"1px solid", width:"70%"}}>
                                    "{ one.step === "/become-a-host/property-type-group" ? buttonTitle[one.step.split("/")[2]] : buttonTitle[one.step.split("/")[3]] }"이어서 만들기
                                    {/* <Button>삭제</Button> */}
                                </Button></div>)
                            }
                            )}
                            <Button onClick={newHostingButton} style={{fontSize: 35, color:"black", borderRadius:5, border:"3px solid", width:"70%", marginTop:15}}> + NEW HOSTING</Button>
                        </div>
                    </>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}