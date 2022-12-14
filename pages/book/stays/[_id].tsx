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
                                <Typography style={{ fontSize: 35, marginLeft: 25 }}><b>?????? ??????</b></Typography>
                            </div>
                            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", border: "1px solid", borderRadius: 2, padding: 3, marginTop: 5, borderColor: "#D8D8D8" }}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <Typography><b>?????? ?????? ???????????????.</b></Typography>
                                    <Typography>{data?.user.split("@")[0]}?????? ????????? ?????? ????????? ?????? ??? ????????????.</Typography>
                                </div>
                                <img src="/image/diamond.png" style={{ width: 40, height: 40 }} />
                            </Box>
                            <Typography style={{ fontSize: 25, marginTop: 20 }}><b>?????? ??????</b></Typography>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <Typography style={{ fontSize: 20 }}><b>??????</b></Typography>
                                    <Typography style={{ fontSize: 15 }}>{sdate.split("-")[0]}??? {sdate.split("-")[1]}??? {sdate.split("-")[2]}??? ~ {edate.split("-")[0]}??? {edate.split("-")[1]}??? {edate.split("-")[2]}???</Typography>
                                </div>
                                <Button style={{ color: "black", fontSize: 18 }}><u><b>??????</b></u></Button>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <Typography style={{ fontSize: 20 }}><b>?????????</b></Typography>
                                    <Typography style={{ fontSize: 15 }}>????????? {query.numberOfGuest!}??? {query.numberOfInfants && <a>, ?????? {query.numberOfInfants!}???</a>}</Typography>
                                </div>
                                <Button style={{ color: "black", fontSize: 18 }}><u><b>??????</b></u></Button>
                            </div><hr style={{ marginTop: 30 }} />
                            <Typography style={{ fontSize: 25, marginTop: 20 }}><b>?????? ?????? ????????????</b></Typography>
                            <Box style={{ border: "1px solid", borderRadius: 5, padding: 15, borderColor: "#D8D8D8", marginBottom: 25 }}>
                                <RadioGroup value={totalCharge} onChange={handleChange}>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid" }}>
                                        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                                <Typography style={{ fontSize: 20 }}><b>?????? ??????</b></Typography>
                                                <Typography style={{ fontSize: 20 }}><b>$ {totalCharge.toLocaleString()}</b><Radio value={totalCharge} /></Typography>
                                            </div>
                                            <Typography style={{ marginBottom: 10 }}>????????? ??????????????? ?????? ????????? ???????????????.</Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                                <Typography style={{ fontSize: 20 }}><b>?????? ????????? ?????? ??????, ???????????? ????????? ??????</b></Typography>
                                                <Typography style={{ fontSize: 20 }}><b>$ {halfCharge.toLocaleString()}</b><Radio value={halfCharge} /></Typography>
                                            </div>
                                            <Typography>?????? $ {((data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000))) + (data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000)))) * 0.1) * 0.5).toLocaleString()}???(???) ???????????????, ????????? ?????? $ {((data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000))) + (data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000)))) * 0.1) * 0.5).toLocaleString()}??? ????????? ?????????????????? 2023??? 3??? 3??? ?????? ???????????????. ?????? ???????????? ????????????.</Typography>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </Box><hr />
                            <Typography style={{ fontSize: 25, marginTop: 25 }}><b>?????? ??????</b></Typography>
                            <Typography style={{ marginTop: 15, marginBottom: 25 }}><b>{sdate.split("-")[1]}??? {Number(sdate.split("-")[2]) - 1}??? ????????? ????????? ???????????? ??? ????????????. </b>????????? ????????? 4??? 3??? ?????? ???????????? ?????? ????????? ????????? ??? ????????????. <Link href={"/privacyPolicy"}><u><b>????????? ????????????</b></u></Link></Typography>
                            <hr />
                            <Typography style={{ fontSize: 12, marginTop: 25, marginBottom:25 }}>?????? ????????? ???????????? <Link href={"/privacyPolicy"}><u><b>???????????? ????????? ?????? ????????????</b></u></Link>, <Link href={"/privacyPolicy"}><u><b>??????????????? ????????? ??? ?????? ??????</b></u></Link>??? ????????????, ????????? ?????? ????????? ???????????? ?????? ?????? ?????????????????? <Link href={"/privacyPolicy"}><u><b>?????? ???????????? ??????</b></u></Link>??? ????????? ?????? ??? ????????? ????????? ???????????? ????????????.</Typography>
                            <PayPalScriptProvider options={{ "client-id": PAYPAL_KEY, intent: "authorize" }}>
                                <PayPalButtons style={{ layout: "horizontal" }} forceReRender={[value]}
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    description: "?????? ?????????",
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
                                            alert("?????? ????????? ???????????????. ?????? ??????????????????.");
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
                                        {/* ?????????????????? */}
                                    </div>
                                </div><hr />
                                <Typography style={{ marginTop: 15, marginBottom: 15 }}><b><a style={{ color: "red" }}>??????</a>??????</b> ??? ?????? ?????? ??????</Typography><hr />
                                <Typography style={{ fontSize: 20, marginTop: 15 }}>?????? ????????????</Typography>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
                                    <Typography>${data?.price} x {(Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000))).toLocaleString()}???</Typography>
                                    <Typography>${(data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000)))).toLocaleString()}</Typography>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 15 }}>
                                    <Typography>????????? ?????????</Typography>
                                    <Typography>${((data?.price! * (Math.ceil((new Date(edate).getTime() - new Date(sdate).getTime()) / (24 * 60 * 60 * 1000)))) * 0.1).toLocaleString()}</Typography>
                                </div><hr />
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 15, marginBottom: 15 }}>
                                    <Typography>?????????</Typography>
                                    <Typography>${totalCharge.toLocaleString()}</Typography>
                                </div><hr />
                                <Typography style={{ marginTop: 15, marginBottom: 15 }}>
                                    ???????????? ????????? ???????????? ????????? ?????? ??????????????? ?????? ???????????? ????????? ??? ????????????.
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