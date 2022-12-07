import { Box, Button, Grid, IconButton, RadioGroup, Typography, Radio } from "@mui/material";
import Layout from "../../../components/layout";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter } from "next/router";
import { useState, useEffect } from "react"
import Hostings from "../../../interface/hostings";
import Link from "next/link";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

function Stays({query}:any) {
    const PAYPAL_KEY = process.env.NEXT_PUBLIC_PAYPAL_KEY as string;
    const router = useRouter();
    const [data, setData] = useState<Hostings>();
    const sdate = query.checkin! as string;
    const edate = query.checkout! as string;
    const totalCharge = data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000))) + (data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000)))) * 0.1;
    const halfCharge = (data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000))) + (data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000)))) * 0.1) * 0.5
    const [value, setValue] = useState<string>(totalCharge.toString());
    const { data: session, status } = useSession();
    useEffect(() => {
        !async function () {
            const reponse = await fetch(`/api/hosting/target?_id=${query._id}`);
            const json = await reponse.json();
            setData(json.data);
        }()
    }, []);

    const backHandle = () => {
        router.back();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <Layout>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                <Box style={{ padding: 5, maxWidth: 1200, display: "flex", flexDirection: "column", width: "80%" }}>
                    <Grid container>
                        <Grid item md={7} sm={12} sx={{ padding: 5 }}>
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
                                    <Typography style={{ fontSize: 15 }}>게스트 {query.numberOfGuest!}명 {query.numberOfInfants && <a>, 유아 {query.numberOfInfants!}명</a>}</Typography>
                                </div>
                                <Button style={{ color: "black", fontSize: 18 }}><u><b>수정</b></u></Button>
                            </div><hr style={{ marginTop: 30 }} />
                            <Typography style={{ fontSize: 25, marginTop: 20 }}><b>결제 방식 선택하기</b></Typography>
                            <Box style={{ border: "1px solid", borderRadius: 5, padding: 15, borderColor: "#D8D8D8", marginBottom: 25 }}>
                                <RadioGroup value={totalCharge} onChange={handleChange}>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid" }}>
                                        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                                <Typography style={{ fontSize: 20 }}><b>전액 결제</b></Typography>
                                                <Typography style={{ fontSize: 20 }}><b>$ {totalCharge.toLocaleString()}</b><Radio value={totalCharge} /></Typography>
                                            </div>
                                            <Typography style={{ marginBottom: 10 }}>총액을 결제하시면 모든 절차가 완료됩니다.</Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                                <Typography style={{ fontSize: 20 }}><b>요금 일부는 지금 결제, 나머지는 나중에 결제</b></Typography>
                                                <Typography style={{ fontSize: 20 }}><b>$ {halfCharge.toLocaleString()}</b><Radio value={halfCharge} /></Typography>
                                            </div>
                                            <Typography>지금 $ {((data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000))) + (data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000)))) * 0.1) * 0.5).toLocaleString()}을(를) 결제하시면, 나머지 금액 $ {((data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000))) + (data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000)))) * 0.1) * 0.5).toLocaleString()}은 동일한 결제수단으로 2023년 3월 3일 자동 청구됩니다. 추가 수수료는 없습니다.</Typography>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </Box><hr />
                            <Typography style={{ fontSize: 25, marginTop: 25 }}><b>환불 정책</b></Typography>
                            <Typography style={{ marginTop: 15, marginBottom: 25 }}><b>{sdate.split("-")[1]}월 {Number(sdate.split("-")[2]) - 1}일 전까지 무료로 취소하실 수 있습니다. </b>체크인 날짜인 4월 3일 전에 취소하면 부분 환불을 받으실 수 있습니다. <Link href={"/privacyPolicy"}><u><b>자세히 알아보기</b></u></Link></Typography>
                            <hr />
                            <Typography style={{ fontSize: 12, marginTop: 25, marginBottom:25 }}>아래 버튼을 선택하면 <Link href={"/privacyPolicy"}><u><b>호스트가 설정한 숙소 이용규칙</b></u></Link>, <Link href={"/privacyPolicy"}><u><b>에어비앤비 재예약 및 환불 정책</b></u></Link>에 동의하며, 피해에 대한 책임이 본인에게 있을 경우 에어비앤비가 <Link href={"/privacyPolicy"}><u><b>결제 수단으로 청구</b></u></Link>의 조치를 취할 수 있다는 사실에 동의하는 것입니다.</Typography>
                            <PayPalScriptProvider options={{ "client-id": PAYPAL_KEY, intent: "authorize" }}>
                                <PayPalButtons style={{ layout: "horizontal" }} forceReRender={[value]}
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    description: "숙소 예약금",
                                                    amount: {
                                                        value: value.toString(),
                                                    },
                                                },
                                            ],
                                        });
                                    }}
                                    onApprove={async (datas, actions) => {
                                        const response = await fetch("/api/valid", {
                                            method: "POST",
                                            body: JSON.stringify({
                                                productId: query.productId,
                                                checkIn: new Date(sdate),
                                                checkOut: new Date(edate)
                                            }),
                                            headers: {
                                                "Content-type": "application/json"
                                            }
                                        });
                                        const json = await response.json();
                                        console.log(json.result);

                                        if(json.result) {
                                            const authorized = await actions.order?.authorize();
                                            console.log(authorized);
                                            await fetch("/api/reservation", {
                                                method: "POST",
                                                body: JSON.stringify({
                                                    hostingId: data?.user,
                                                    guestId: session?.user?.email,
                                                    orderId: datas.orderID,
                                                    payId: datas.payerID,
                                                    checkIn: sdate,
                                                    checkOut: edate,
                                                    numberOfGuest: query.numberOfGuest,
                                                    numberOfAdults: query.numberOfAdults,
                                                    numberOfChildren: query.numberOfChildren,
                                                    numberOfInfants: query.numberOfInfants,
                                                    productId: query.productId,
                                                    productInfo: data
                                                }),
                                                headers: {
                                                    "Content-type": "application/json"
                                                }
                                            });
                                            router.push("/trips");
                                        } else{
                                            alert("이미 예약된 일정입니다. 다시 확인해주세요.");
                                            router.back();
                                        }

                                    }}
                                />
                            </PayPalScriptProvider>
                        </Grid>
                        <Grid item md={5} sm={12} sx={{ padding: 5 }}>
                            <Box style={{ border: "1px solid", borderRadius: 20, width: "100%", padding: 15, borderColor: "#D8D8D8" }} position={"sticky"} top={"100px"}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <img src={data?.imageUrl[0]} style={{ width: 150, height: 120, borderRadius: 15 }} />
                                    <div>
                                        <Typography style={{ fontSize: 18, marginLeft: 15 }}><b>{data?.name} {data?.type} {data?.privacy}</b></Typography>
                                        {/* 설명추가예정 */}
                                    </div>
                                </div><hr />
                                <Typography style={{ marginTop: 15, marginBottom: 15 }}><b><a style={{ color: "red" }}>에어</a>커버</b> 를 통한 예약 보호</Typography><hr />
                                <Typography style={{ fontSize: 20, marginTop: 15 }}>요금 세부정보</Typography>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
                                    <Typography>${data?.price} x {(Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000))).toLocaleString()}박</Typography>
                                    <Typography>${(data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000)))).toLocaleString()}</Typography>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 15 }}>
                                    <Typography>서비스 수수료</Typography>
                                    <Typography>${((data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000)))) * 0.1).toLocaleString()}</Typography>
                                </div><hr />
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 15, marginBottom: 15 }}>
                                    <Typography>총합계</Typography>
                                    <Typography>${totalCharge.toLocaleString()}</Typography>
                                </div><hr />
                                <Typography style={{ marginTop: 15, marginBottom: 15 }}>
                                    해외에서 결제가 처리되기 때문에 카드 발행사에서 추가 수수료를 부과할 수 있습니다.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </Layout>
    );
}

export default Stays;

export function getServerSideProps(props: GetServerSidePropsContext){
    const query = props.query;
    return {
        props : {
            query: query
        }
    }
}