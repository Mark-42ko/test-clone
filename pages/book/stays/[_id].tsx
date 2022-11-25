import { Box, Button, Grid, IconButton, RadioGroup, Typography, Radio } from "@mui/material";
import Layout from "../../../components/layout";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter } from "next/router";
import { useState, useEffect } from "react"
import Hostings from "../../../interface/hostings";

function Stays() {
    const router = useRouter();
    const [data, setData] = useState<Hostings>();
    const sdate = router.query.checkin! as string;
    const edate = router.query.checkout! as string;

    useEffect(() => {
        !async function () {
            const reponse = await fetch(`/api/hosting/target?_id=${router.query._id}`);
            const json = await reponse.json();
            setData(json.data);
        }()
    }, []);

    const backHandle = () => {
        router.back();
    };

    const [value, setValue] = useState('all');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue((event.target as HTMLInputElement).value);
    };

    return (
        <Layout>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                <Box style={{ padding: 5, maxWidth: 1200, display: "flex", flexDirection: "column", width: "80%" }}>
                    <Grid container>
                        <Grid item md={7} sm={12}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <IconButton onClick={backHandle}>
                                    <ChevronLeftIcon style={{ fontSize: 35, color: "black" }} />
                                </IconButton>
                                <Typography style={{ fontSize: 35, marginLeft: 25 }}><b>예약 요청</b></Typography>
                            </div>
                            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", border: "1px solid", borderRadius: 2, padding: 3, marginTop: 5, borderColor: "#D8D8D8" }}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <Typography><b>흔치 않은 기회입니다.</b></Typography>
                                    <Typography>{data?.user.split("@")[0]}님의 숙소는 보통 예약이 가득 차 있습니다.</Typography>
                                </div>
                                <img src="/image/diamond.png" style={{ width: 40, height: 40 }} />
                            </Box>
                            <Typography style={{ fontSize: 25, marginTop: 20 }}><b>예약 정보</b></Typography>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <Typography style={{ fontSize: 20 }}><b>날짜</b></Typography>
                                    <Typography style={{ fontSize: 15 }}>{sdate.split("-")[0]}년 {sdate.split("-")[1]}월 {sdate.split("-")[2]}일 ~ {edate.split("-")[0]}년 {edate.split("-")[1]}월 {edate.split("-")[2]}일</Typography>
                                </div>
                                <Button style={{ color: "black", fontSize: 18 }}><u><b>수정</b></u></Button>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <Typography style={{ fontSize: 20 }}><b>게스트</b></Typography>
                                    <Typography style={{ fontSize: 15 }}>게스트 {router.query.numberOfGuest!}명 {router.query.numberOfInfants && <a>, 유아 {router.query.numberOfInfants!}명</a>}</Typography>
                                </div>
                                <Button style={{ color: "black", fontSize: 18 }}><u><b>수정</b></u></Button>
                            </div><hr style={{ marginTop: 30 }} />
                            <Typography style={{ fontSize: 25, marginTop: 20 }}><b>결제 방식 선택하기</b></Typography>
                            <Box style={{ border: "1px solid", borderRadius: 5, padding: 15 }}>
                                <RadioGroup value={value} onChange={handleChange}>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottom:"1px solid" }}>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <Typography>전액 결제</Typography>
                                            <Typography>총액을 결제하시면 모든 절차가 완료됩니다.</Typography>
                                        </div>
                                        <Typography style={{ fontSize: 20 }}><b>$ {data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000))) + (data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000)))) * 0.1}</b><Radio value={"all"}/></Typography>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <Typography>요금 일부는 지금 결제, 나머지는 나중에 결제</Typography>
                                            <Typography>지금 $ {(data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000))) + (data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000)))) * 0.1)*0.5}을(를) 결제하시면, 나머지 금액 $ {(data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000))) + (data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000)))) * 0.1)*0.5}은 동일한 결제수단으로 2023년 3월 3일 자동 청구됩니다. 추가 수수료는 없습니다.</Typography>
                                        </div>
                                        <Typography style={{ fontSize: 20 }}><b>$ {data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000))) + (data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000)))) * 0.1}</b><Radio value={"half"}/></Typography>
                                    </div>
                                </RadioGroup>
                            </Box>
                        </Grid>
                        <Grid item md={5} sm={12}>

                        </Grid>
                    </Grid>
                </Box>
            </div>
        </Layout>
    );
}

export default Stays;