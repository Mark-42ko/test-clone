import { Box, Button, Collapse, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState, Fragment } from "react";
import Layout from "../../components/layout";
import Hostings from "../../interface/hostings";
import IosShareIcon from '@mui/icons-material/IosShare';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import Link from "next/link";
import AbcIcon from '@mui/icons-material/Abc';
import PoolIcon from '@mui/icons-material/Pool';
import HotTubIcon from '@mui/icons-material/HotTub';
import DeckIcon from '@mui/icons-material/Deck';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PianoIcon from '@mui/icons-material/Piano';
import WavesIcon from '@mui/icons-material/Waves';
import SurfingIcon from '@mui/icons-material/Surfing';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import ShowerIcon from '@mui/icons-material/Shower';
import WifiIcon from '@mui/icons-material/Wifi';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import CountertopsIcon from '@mui/icons-material/Countertops';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AirIcon from '@mui/icons-material/Air';
import DeskIcon from '@mui/icons-material/Desk';
import BlurCircularIcon from '@mui/icons-material/BlurCircular';
import MedicationIcon from '@mui/icons-material/Medication';
import FireExtinguisherIcon from '@mui/icons-material/FireExtinguisher';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import Calendar from "../../components/hostingItem/calendar";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { DateRange, LocalizationProvider, StaticDateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import MapHostingIndex from "../../components/map/mapHostingIndex";
import Reservation from "../../interface/reservation";
import { useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

const firstMenu = [
    { text: "?????? ?????????", icon: <WifiIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "TV", icon: <LiveTvIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "??????", icon: <CountertopsIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "?????????", icon: <LocalLaundryServiceIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "?????? ??? ?????? ??????", icon: <DirectionsCarFilledIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "?????? ??? ?????? ??????", icon: <LocalAtmIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "?????????", icon: <AirIcon style={{ fontSize: 70, padding: 70, color: "black" }} /> },
    { text: "?????? ?????? ??????", icon: <DeskIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
];

const secondMenu = [
    { text: "?????????", icon: <PoolIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "?????? ??????", icon: <HotTubIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "?????????", icon: <DeckIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "????????? ??????", icon: <OutdoorGrillIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "?????? ?????? ??????", icon: <TableRestaurantIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "??????", icon: <LocalFireDepartmentIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "?????????", icon: <SportsBaseballIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "?????? ?????????", icon: <FireplaceIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "?????????", icon: <PianoIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "?????? ??????", icon: <FitnessCenterIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "????????? ?????????", icon: <WavesIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "????????? ??????", icon: <SurfingIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "????????? ??? ?????? ?????? ??????", icon: <DownhillSkiingIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "?????? ?????? ??????", icon: <ShowerIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
];

const thirdMenu = [
    { text: "???????????????", icon: <BlurCircularIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "?????? ??????", icon: <MedicationIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "?????????", icon: <FireExtinguisherIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "??????????????? ?????????", icon: <CrisisAlertIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
];

export default function Home({ _id, data, productData }: { _id: string, data: Hostings, productData: Array<Reservation> }) {
    console.log("????????? ??????");
    const router = useRouter();
    const date = new Date().toLocaleString("ko-kr").split(".");
    const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
    const [guestOpen, setGuestOpen] = useState<boolean>(false);
    const [adultCount, setAultCount] = useState<number>(1);
    const [childCount, setChildCount] = useState<number>(0);
    const [babyCount, setBabyCount] = useState<number>(0);
    const [value, setValue] = useState<DateRange<any>>([null, null]);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const fdate = startDate?.toLocaleString("ko-kr").split(".");
    const sdate = endDate?.toLocaleString("ko-kr").split(".");
    const { data: session, status } = useSession();

    useEffect(() => {
        if (value[0] !== null && value[1] !== null) {
            setStartDate(value[0].$d);
            setEndDate(value[1].$d);
        }
    }, [value]);

    const handleClick = () => {
        setGuestOpen(!guestOpen);
    };

    const reservationHandle = () => {
        if (session?.user?.email) {
            router.push(`/book/stays/${_id}?numberOfAdults=${adultCount}&checkin=${fdate[0]}-${fdate[1]}-${fdate[2]}&numberOfGuest=${adultCount + childCount}&checkout=${sdate[0]}-${sdate[1]}-${sdate[2]}&guestCurrency=$&productId=${_id}&isWorkTrip=false&numberOfChildren=${childCount}&numberOfInfants=${babyCount}`);
        } else {
            alert("????????? ??? ??????????????????.")
        }
    };

    return (
        <Layout>
            {data &&
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Box sx={{ padding: 5, maxWidth: 1200, display: "flex", flexDirection: "column" }}>
                        <Typography style={{ fontSize: 35 }}><b>{data.name}</b></Typography>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Button style={{ fontSize: 15, color: "black" }}><u>{data.place}</u></Button>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <Button style={{ fontSize: 15, color: "black" }}><IosShareIcon style={{ fontSize: 15 }} /><u><b>????????????</b></u></Button>
                                <Button style={{ fontSize: 15, color: "black" }}>???<u><b>??????</b></u></Button>
                            </div>
                        </div>
                        <Grid container style={{ width: "100%", height: "100%" }}>
                            <Grid item md={6} sm={12} sx={{ padding: 1, height: 500 }}>
                                <img src={data.imageUrl[0]} style={{ width: "100%", height: "100%", borderRadius: 20 }} />
                            </Grid>
                            <Grid item md={6} sm={12} container sx={{ width: "100%", height: 500, flexWrap: "wrap" }}>
                                {data.imageUrl.map((one, idx) => {
                                    if (data.imageUrl[0] !== one) {
                                        return <img src={one} style={{ width: "50%", height: "50%", borderRadius: 20, padding: 5 }} key={idx} />
                                    }
                                })}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item md={7} sm={12} sx={{ marginTop: 5 }}>
                                <div>
                                    <Typography style={{ fontSize: 25 }}><b>{data.user.split("@")[0]} ?????? ??????????????? ??? {data.privacy}</b></Typography>
                                    <Typography>?????? ?????? {data.guest}???, ?????? {data.bed}???, ?????? {data.bathroom}???</Typography>
                                </div>
                                <hr />
                                <div>
                                    <Typography style={{ display: "flex", alignItems: "center" }}>
                                        <EventBusyIcon style={{ fontSize: 35 }} /><b>{date[1]}??? {Number(date[2]) + 1}??? {date[3]} ????????? ????????? ???????????? ??? ????????????.</b>
                                    </Typography>
                                </div>
                                <hr />
                                <div>
                                    <Typography style={{ fontSize: 30 }}><b style={{ color: "red" }}>??????</b><b>??????</b></Typography>
                                    <Typography style={{ fontSize: 15 }}>
                                        ?????? ???????????? ???????????? ????????? ??????????????? ?????? ????????? ???????????? ?????? ?????? ?????? ???????????? ????????? ?????? ????????? ????????? ?????? ?????? ??????????????? ???????????????.
                                    </Typography>
                                    <Link href={"/privacyPolicy"}><u>??? ????????????</u></Link>
                                </div>
                                <hr />
                                <div>
                                    <Typography style={{ display: "flex", alignItems: "center", justifyContent: "row" }}>
                                        <AbcIcon style={{ fontSize: 35 }} /> ?????? ????????? ????????? ???????????????. <Button style={{ color: "black", fontSize: 15 }}><u><b>??????</b></u></Button>
                                    </Typography>
                                    <Typography>?????? ??????...</Typography>
                                    <Button style={{ color: "black" }}><u><b>??? ??????</b></u></Button>
                                </div>
                                <hr />
                                <div>
                                    <Typography style={{ fontSize: 30 }}><b>?????? ????????????</b></Typography>
                                    <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
                                        {data.firstMenu.map((one) =>
                                            <Typography key={one} style={{ display: "flex", alignItems: "center", width: "50%" }}>{firstMenu.find((e) => e.text === one)?.icon} {one}</Typography>)}
                                        {data.secondMenu.map((one) =>
                                            <Typography key={one} style={{ display: "flex", alignItems: "center", width: "50%" }}>{secondMenu.find((e) => e.text === one)?.icon} {one}</Typography>)}
                                        {data.thirdMenu.map((one) =>
                                            <Typography key={one} style={{ display: "flex", alignItems: "center", width: "50%" }}>{thirdMenu.find((e) => e.text === one)?.icon} {one}</Typography>)}
                                    </div>
                                </div>
                                <div>
                                    <Typography style={{ fontSize: 25 }}><b>{data.name}?????? {Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000))}???</b></Typography>
                                    <Typography style={{ fontSize: 15 }}>{fdate[0]}??? {fdate[1]}??? {fdate[2]}??? ~ {sdate[0]}??? {sdate[1]}??? {sdate[2]}???</Typography>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <StaticDateRangePicker
                                            displayStaticWrapperAs="desktop"
                                            value={value}
                                            minDate={new Date()}
                                            onChange={(newValue: any) => {
                                                if (productData && newValue[0] !== null && newValue[1] !== null) {
                                                    for (let one of productData) {
                                                        if (new Date(newValue[0].$d) < new Date(one.checkIn) && new Date(one.checkOut) < new Date(newValue[1].$d)) {
                                                            alert("?????? ????????? ???????????????. ?????? ??????????????????.");
                                                            return setValue([newValue[0], null]);
                                                        }
                                                    }
                                                }
                                                setValue(newValue);
                                            }}
                                            shouldDisableDate={
                                                (date) => {
                                                    let result = false
                                                    if (productData) {
                                                        for (let one of productData) {
                                                            if (new Date(one.checkIn) <= new Date(date) && new Date(date) <= new Date(one.checkOut)) {
                                                                result = true
                                                                break;
                                                            }
                                                        }
                                                    }
                                                    return result;
                                                }
                                            }
                                            renderInput={(startProps, endProps) => {
                                                return (
                                                    <Fragment>
                                                        <TextField {...startProps} />
                                                        <Box sx={{ mx: 2 }}> to </Box>
                                                        <TextField {...endProps} />
                                                    </Fragment>)
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </Grid>
                            <Grid item md={5} sm={12} sx={{ padding: 5 }} >
                                <Box style={{ border: "1px solid", borderRadius: 20, width: "100%", padding: 15 }} boxShadow={""} position={"sticky"} top={"100px"}>
                                    <Typography><b style={{ fontSize: 25 }}>${data.price}</b> /???</Typography>
                                    <div style={{ display: "flex", flexDirection: "column", border: "1px solid", borderRadius: 10, marginTop: 15 }}>
                                        <div style={{ borderBottom: "1px solid" }}>
                                            <Button onClick={() => setCalendarOpen(true)} style={{ display: "flex", flexDirection: "row", width: "100%", color: "black", height: 50 }}>
                                                <div style={{ display: "flex", flexDirection: "column", width: "50%", height: 50, padding: 8, alignItems: "start" }}>
                                                    <Typography style={{ fontSize: 8 }}>?????????</Typography>
                                                    <Typography style={{ fontSize: 14 }}>{fdate[0]}. {fdate[1]}. {fdate[2]}.</Typography>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "column", width: "50%", borderLeft: "1px solid", padding: 8, alignItems: "start" }}>
                                                    <Typography style={{ fontSize: 8 }}>????????????</Typography>
                                                    <Typography style={{ fontSize: 14 }}>{sdate[0]}. {sdate[1]}. {sdate[2]}.</Typography>
                                                </div>
                                            </Button>
                                            <Calendar productData={productData} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} setCalendarOpen={setCalendarOpen} calendarOpen={calendarOpen} value={value} setValue={setValue} />
                                        </div>
                                        <ListItemButton onClick={handleClick} sx={{ height: 50 }}>
                                            <ListItemText>
                                                <Typography style={{ fontSize: 8 }}>??????</Typography>
                                                <Typography style={{ fontSize: 14 }}>????????? {adultCount + childCount}???{babyCount !== 0 && <a>, ?????? {babyCount} ???</a>}</Typography>
                                            </ListItemText>
                                            {guestOpen ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={guestOpen} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                <ListItem sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                                        <Typography style={{ fontSize: 18 }}><b>??????</b></Typography>
                                                        <Typography style={{ fontSize: 14 }}>??? 13??? ??????</Typography>
                                                    </div>
                                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                        {adultCount === 1 ?
                                                            <IconButton>
                                                                <RemoveCircleOutlineIcon style={{ color: "#E6E6E6", fontSize: 30 }} />
                                                            </IconButton>
                                                            :
                                                            <IconButton onClick={() => setAultCount((adultCount: number) => adultCount - 1)} >
                                                                <RemoveCircleOutlineIcon style={{ fontSize: 30 }} />
                                                            </IconButton>
                                                        }
                                                        <Typography component="div" variant="h5" style={{ fontSize: 20 }}>
                                                            <a>{adultCount}</a>
                                                        </Typography>
                                                        <IconButton onClick={() => setAultCount((adultCount: number) => adultCount + 1)} >
                                                            <AddCircleOutlineIcon style={{ fontSize: 30 }} />
                                                        </IconButton>
                                                    </div>
                                                </ListItem>
                                                <ListItem sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                                        <Typography style={{ fontSize: 18 }}><b>?????????</b></Typography>
                                                        <Typography style={{ fontSize: 14 }}>??? 2~12???</Typography>
                                                    </div>
                                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                        {childCount === 0 ?
                                                            <IconButton>
                                                                <RemoveCircleOutlineIcon style={{ color: "#E6E6E6", fontSize: 30 }} />
                                                            </IconButton>
                                                            :
                                                            <IconButton onClick={() => setChildCount((childCount: number) => childCount - 1)} >
                                                                <RemoveCircleOutlineIcon style={{ fontSize: 30 }} />
                                                            </IconButton>
                                                        }
                                                        <Typography component="div" variant="h5" style={{ fontSize: 20 }}>
                                                            <a>{childCount}</a>
                                                        </Typography>
                                                        <IconButton onClick={() => setChildCount((childCount: number) => childCount + 1)} >
                                                            <AddCircleOutlineIcon style={{ fontSize: 30 }} />
                                                        </IconButton>
                                                    </div>
                                                </ListItem>
                                                <ListItem sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                                        <Typography style={{ fontSize: 18 }}><b>??????</b></Typography>
                                                        <Typography style={{ fontSize: 14 }}>??? 2??? ??????</Typography>
                                                    </div>
                                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                        {babyCount === 0 ?
                                                            <IconButton>
                                                                <RemoveCircleOutlineIcon style={{ color: "#E6E6E6", fontSize: 30 }} />
                                                            </IconButton>
                                                            :
                                                            <IconButton onClick={() => setBabyCount((babyCount: number) => babyCount - 1)} >
                                                                <RemoveCircleOutlineIcon style={{ fontSize: 30 }} />
                                                            </IconButton>
                                                        }
                                                        <Typography component="div" variant="h5" style={{ fontSize: 20 }}>
                                                            <a>{babyCount}</a>
                                                        </Typography>
                                                        <IconButton onClick={() => setBabyCount((babyCount: number) => babyCount + 1)} >
                                                            <AddCircleOutlineIcon style={{ fontSize: 30 }} />
                                                        </IconButton>
                                                    </div>
                                                </ListItem>
                                                <Button onClick={handleClick} style={{ color: "black", float: "right" }}><u><b>??????</b></u></Button>
                                            </List>
                                        </Collapse>
                                    </div>
                                    <Button disabled={startDate?.toString() === endDate?.toString() ? true : false} onClick={reservationHandle} style={{ color: "white", backgroundColor: "red", width: "100%", fontSize: 20, marginTop: 15, borderRadius: 10 }}><b>{startDate.toString() === endDate.toString() ? "????????? ??????????????????." : "????????????"}</b></Button>
                                    <Typography style={{ fontSize: 14, width: "100%", alignItems: "center", justifyContent: "center", display: "flex", marginTop: 15 }}>?????? ?????? ????????? ????????? ???????????? ????????????.</Typography>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <Typography style={{ fontSize: 17 }}>${data.price} x {Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000))}???</Typography>
                                        <Typography style={{ fontSize: 17 }}>${data.price * (Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)))}</Typography>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <Typography style={{ fontSize: 17 }}><u>????????? ?????????</u></Typography>
                                        <Typography style={{ fontSize: 17 }}>${((data.price * (Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)))) * 0.1).toFixed(1)}</Typography>
                                    </div>
                                    <hr />
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                                        <Typography style={{ fontSize: 17 }}><u>??? ??????</u></Typography>
                                        <Typography style={{ fontSize: 17 }}>${data.price * (Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000))) + (data.price * (Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)))) * 0.1}</Typography>
                                    </div>
                                </Box>
                            </Grid>
                        </Grid><hr style={{ width: "100%" }} />
                        <Box style={{ marginTop: 20 }}>
                            <Typography style={{ fontSize: 30 }}><b>????????? ??????</b></Typography>
                            <MapHostingIndex lat={data.lat} lng={data.lng} />
                            <Typography style={{ fontSize: 20, marginTop: 15 }}><b>{data.place}</b></Typography>
                        </Box>
                    </Box>
                </div>
            }
        </Layout>
    );
}

export async function getServerSideProps(props: GetServerSidePropsContext) {
    console.log("STart");
    const URI = process.env.NEXT_PUBLIC_URI
    const _id = props.query._id;
    const reponse = await fetch(`${URI}/api/hosting/target?_id=${_id}`);
    const json = await reponse.json();
    const reservationData = await fetch(`${URI}/api/findByproductIdReservation`, {
        method: "POST",
        body: JSON.stringify({
            productId: _id
        }),
        headers: {
            "Content-type": "application/json"
        }
    });
    console.log(".............");
    const jsonData = await reservationData.json();
    console.log("End");
    return {
        props: {
            _id: _id,
            data: json.data,
            productData: jsonData.data
        }
    };
}