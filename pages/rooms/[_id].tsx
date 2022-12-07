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
    { text: "무선 인터넷", icon: <WifiIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "TV", icon: <LiveTvIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "주방", icon: <CountertopsIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "세탁기", icon: <LocalLaundryServiceIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "건물 내 무료 주차", icon: <DirectionsCarFilledIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "건물 내 유료 주차", icon: <LocalAtmIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "에어컨", icon: <AirIcon style={{ fontSize: 70, padding: 70, color: "black" }} /> },
    { text: "업무 전용 공간", icon: <DeskIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
];

const secondMenu = [
    { text: "수영장", icon: <PoolIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "온수 욕조", icon: <HotTubIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "파티오", icon: <DeckIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "바비큐 그릴", icon: <OutdoorGrillIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "야외 식사 공간", icon: <TableRestaurantIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "화로", icon: <LocalFireDepartmentIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "당구대", icon: <SportsBaseballIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "실내 벽난로", icon: <FireplaceIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "피아노", icon: <PianoIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "운동 기구", icon: <FitnessCenterIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "호수로 연결됨", icon: <WavesIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "해변과 인접", icon: <SurfingIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "스키를 탄 채로 출입 가능", icon: <DownhillSkiingIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "야외 샤워 시설", icon: <ShowerIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
];

const thirdMenu = [
    { text: "화재경보기", icon: <BlurCircularIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "구급 상자", icon: <MedicationIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "소화기", icon: <FireExtinguisherIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
    { text: "일산화탄소 경보기", icon: <CrisisAlertIcon style={{ fontSize: 70, padding: 20, color: "black" }} /> },
];

export default function Home({ _id, data, productData }: { _id: string, data: Hostings, productData: Array<Reservation> }) {
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
            alert("로그인 후 이용해주세요.")
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
                                <Button style={{ fontSize: 15, color: "black" }}><IosShareIcon style={{ fontSize: 15 }} /><u><b>공유하기</b></u></Button>
                                <Button style={{ fontSize: 15, color: "black" }}>♡<u><b>저장</b></u></Button>
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
                                    <Typography style={{ fontSize: 25 }}><b>{data.user.split("@")[0]} 님이 호스팅하는 집 {data.privacy}</b></Typography>
                                    <Typography>최대 인원 {data.guest}명, 침대 {data.bed}개, 욕실 {data.bathroom}개</Typography>
                                </div>
                                <hr />
                                <div>
                                    <Typography style={{ display: "flex", alignItems: "center" }}>
                                        <EventBusyIcon style={{ fontSize: 35 }} /><b>{date[1]}월 {Number(date[2]) + 1}일 {date[3]} 전까지 무료로 취소하실 수 있습니다.</b>
                                    </Typography>
                                </div>
                                <hr />
                                <div>
                                    <Typography style={{ fontSize: 30 }}><b style={{ color: "red" }}>에어</b><b>커버</b></Typography>
                                    <Typography style={{ fontSize: 15 }}>
                                        모든 예약에는 호스트가 예약을 취소하거나 숙소 정보가 정확하지 않은 경우 또는 체크인에 문제가 있는 상황에 대비한 무료 보호 프로그램이 포함됩니다.
                                    </Typography>
                                    <Link href={"/privacyPolicy"}><u>더 알아보기</u></Link>
                                </div>
                                <hr />
                                <div>
                                    <Typography style={{ display: "flex", alignItems: "center", justifyContent: "row" }}>
                                        <AbcIcon style={{ fontSize: 35 }} /> 일부 정보는 원어로 표시됩니다. <Button style={{ color: "black", fontSize: 15 }}><u><b>번역</b></u></Button>
                                    </Typography>
                                    <Typography>숙소 설명...</Typography>
                                    <Button style={{ color: "black" }}><u><b>더 보기</b></u></Button>
                                </div>
                                <hr />
                                <div>
                                    <Typography style={{ fontSize: 30 }}><b>숙소 편의시설</b></Typography>
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
                                    <Typography style={{ fontSize: 25 }}><b>{data.name}에서 {Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000))}박</b></Typography>
                                    <Typography style={{ fontSize: 15 }}>{fdate[0]}년 {fdate[1]}월 {fdate[2]}일 ~ {sdate[0]}년 {sdate[1]}월 {sdate[2]}일</Typography>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <StaticDateRangePicker
                                            displayStaticWrapperAs="desktop"
                                            value={value}
                                            minDate={new Date()}
                                            onChange={(newValue: any) => {
                                                if (productData && newValue[0] !== null && newValue[1] !== null) {
                                                    for (let one of productData) {
                                                        if (new Date(newValue[0].$d) < new Date(one.checkIn) && new Date(one.checkOut) < new Date(newValue[1].$d)) {
                                                            alert("이미 예약된 일정입니다. 다시 확인해주세요.");
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
                                    <Typography><b style={{ fontSize: 25 }}>${data.price}</b> /박</Typography>
                                    <div style={{ display: "flex", flexDirection: "column", border: "1px solid", borderRadius: 10, marginTop: 15 }}>
                                        <div style={{ borderBottom: "1px solid" }}>
                                            <Button onClick={() => setCalendarOpen(true)} style={{ display: "flex", flexDirection: "row", width: "100%", color: "black", height: 50 }}>
                                                <div style={{ display: "flex", flexDirection: "column", width: "50%", height: 50, padding: 8, alignItems: "start" }}>
                                                    <Typography style={{ fontSize: 8 }}>체크인</Typography>
                                                    <Typography style={{ fontSize: 14 }}>{fdate[0]}. {fdate[1]}. {fdate[2]}.</Typography>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "column", width: "50%", borderLeft: "1px solid", padding: 8, alignItems: "start" }}>
                                                    <Typography style={{ fontSize: 8 }}>체크아웃</Typography>
                                                    <Typography style={{ fontSize: 14 }}>{sdate[0]}. {sdate[1]}. {sdate[2]}.</Typography>
                                                </div>
                                            </Button>
                                            <Calendar productData={productData} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} setCalendarOpen={setCalendarOpen} calendarOpen={calendarOpen} value={value} setValue={setValue} />
                                        </div>
                                        <ListItemButton onClick={handleClick} sx={{ height: 50 }}>
                                            <ListItemText>
                                                <Typography style={{ fontSize: 8 }}>인원</Typography>
                                                <Typography style={{ fontSize: 14 }}>게스트 {adultCount + childCount}명{babyCount !== 0 && <a>, 유아 {babyCount} 명</a>}</Typography>
                                            </ListItemText>
                                            {guestOpen ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={guestOpen} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                <ListItem sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                                        <Typography style={{ fontSize: 18 }}><b>성인</b></Typography>
                                                        <Typography style={{ fontSize: 14 }}>만 13세 이상</Typography>
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
                                                        <Typography style={{ fontSize: 18 }}><b>어린이</b></Typography>
                                                        <Typography style={{ fontSize: 14 }}>만 2~12세</Typography>
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
                                                        <Typography style={{ fontSize: 18 }}><b>유아</b></Typography>
                                                        <Typography style={{ fontSize: 14 }}>만 2세 미만</Typography>
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
                                                <Button onClick={handleClick} style={{ color: "black", float: "right" }}><u><b>닫기</b></u></Button>
                                            </List>
                                        </Collapse>
                                    </div>
                                    <Button disabled={startDate?.toString() === endDate?.toString() ? true : false} onClick={reservationHandle} style={{ color: "white", backgroundColor: "red", width: "100%", fontSize: 20, marginTop: 15, borderRadius: 10 }}><b>{startDate.toString() === endDate.toString() ? "일정을 선택해주세요." : "예약하기"}</b></Button>
                                    <Typography style={{ fontSize: 14, width: "100%", alignItems: "center", justifyContent: "center", display: "flex", marginTop: 15 }}>예약 확정 전에는 요금이 청구되지 않습니다.</Typography>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <Typography style={{ fontSize: 17 }}>${data.price} x {Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000))}박</Typography>
                                        <Typography style={{ fontSize: 17 }}>${data.price * (Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)))}</Typography>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <Typography style={{ fontSize: 17 }}><u>서비스 수수료</u></Typography>
                                        <Typography style={{ fontSize: 17 }}>${((data.price * (Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)))) * 0.1).toFixed(1)}</Typography>
                                    </div>
                                    <hr />
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                                        <Typography style={{ fontSize: 17 }}><u>총 합계</u></Typography>
                                        <Typography style={{ fontSize: 17 }}>${data.price * (Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000))) + (data.price * (Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)))) * 0.1}</Typography>
                                    </div>
                                </Box>
                            </Grid>
                        </Grid><hr style={{ width: "100%" }} />
                        <Box style={{ marginTop: 20 }}>
                            <Typography style={{ fontSize: 30 }}><b>호스팅 지역</b></Typography>
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
    const _id = props.query._id;
    const reponse = await fetch(`https://test-clone.vercel.app/api/hosting/target?_id=${_id}`);
    const json = await reponse.json();
    const reservationData = await fetch("https://test-clone.vercel.app/api/findByproductIdReservation", {
        method: "POST",
        body: JSON.stringify({
            productId: _id
        }),
        headers: {
            "Content-type": "application/json"
        }
    });
    const jsonData = await reservationData.json();
    return {
        props: {
            _id: _id,
            data: json.data,
            productData: jsonData.data
        }
    };
}