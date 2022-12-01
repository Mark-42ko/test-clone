import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Hostings from '../interface/hostings';
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
import Grid from "@mui/material/Grid";
import BlurCircularIcon from '@mui/icons-material/BlurCircular';
import MedicationIcon from '@mui/icons-material/Medication';
import FireExtinguisherIcon from '@mui/icons-material/FireExtinguisher';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import Link from 'next/link';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    maxWidth: 1100,
    backgroundColor: "white",
    boxShadow: 24,
    p: 2,
    borderRadius: 5,
    maxHeight: 900
};

type Props = {
    open: boolean;
    setOpen: Function;
    data: Hostings | undefined;
    nick: string | undefined;
};

const firstMenu = [
    { text: "무선 인터넷", icon: <WifiIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "TV", icon: <LiveTvIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "주방", icon: <CountertopsIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "세탁기", icon: <LocalLaundryServiceIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "건물 내 무료 주차", icon: <DirectionsCarFilledIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "건물 내 유료 주차", icon: <LocalAtmIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "에어컨", icon: <AirIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "업무 전용 공간", icon: <DeskIcon style={{ fontSize: 35, color: "black" }} /> },
];

const secondMenu = [
    { text: "수영장", icon: <PoolIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "온수 욕조", icon: <HotTubIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "파티오", icon: <DeckIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "바비큐 그릴", icon: <OutdoorGrillIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "야외 식사 공간", icon: <TableRestaurantIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "화로", icon: <LocalFireDepartmentIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "당구대", icon: <SportsBaseballIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "실내 벽난로", icon: <FireplaceIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "피아노", icon: <PianoIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "운동 기구", icon: <FitnessCenterIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "호수로 연결됨", icon: <WavesIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "해변과 인접", icon: <SurfingIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "스키를 탄 채로 출입 가능", icon: <DownhillSkiingIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "야외 샤워 시설", icon: <ShowerIcon style={{ fontSize: 35, color: "black" }} /> },
];
const thirdMenu = [
    { text: "화재경보기", icon: <BlurCircularIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "구급 상자", icon: <MedicationIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "소화기", icon: <FireExtinguisherIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "일산화탄소 경보기", icon: <CrisisAlertIcon style={{ fontSize: 35, color: "black" }} /> },
];

export default function ExamineModal(props: Props) {
    return (
        <div>
            <Modal
                open={props.open}
                onClose={() => props.setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height: 40 }}>
                        <IconButton onClick={() => props.setOpen(false)} style={{ position: "absolute", left: 5 }}>
                            <CloseIcon />
                        </IconButton>
                        <Typography >
                            <b>미리보기 전체</b>
                        </Typography>
                    </div>
                    <hr />
                    <Grid container>
                        <Grid item md={6} sm={12} sx={{ padding: 2 }} style={{ height: "40vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <img src={`${props.data?.imageUrl[0]}`} style={{ width: "100%", borderRadius: 5, maxHeight: 680, minWidth: 335, height:"100%" }} />
                        </Grid>
                        <Grid item md={6} sm={12} sx={{ overflow: "auto", maxHeight: "90%", height: "45vh" }}>
                            <div >
                                <div style={{ padding: 10, height: 850 }}>
                                    <Typography style={{ fontSize: 25, marginTop: 15 }}><b>{props.data?.name}</b></Typography>
                                    <Typography style={{ fontSize: 20, marginTop: 15 }}><b>{props.nick} 님이 호스팅하는 {props.data?.type}</b></Typography>
                                    <Typography style={{ fontSize: 15, marginTop: 15 }}>최대인원 {props.data?.guest}명, 침대 {props.data?.bed}개, 욕실{props.data?.bathroom}개 </Typography>
                                    <Typography style={{ fontSize: 17, marginTop: 15 }}><b>편의시설</b></Typography>
                                    {props.data?.firstMenu.map((one) => {
                                        return (
                                            <div key={one} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                                <>
                                                    <Typography style={{ fontSize: 15, marginTop: 15 }}>{one}</Typography>
                                                    {firstMenu.find((e) => e.text === one)?.icon}

                                                </>
                                            </div>)
                                    })}
                                    <hr />
                                    {props.data?.secondMenu.map((one) => {
                                        return (
                                            <div key={one} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                                <>
                                                    <Typography style={{ fontSize: 15, marginTop: 15 }}>{one}</Typography>
                                                    {secondMenu.find((e) => e.text === one)?.icon}

                                                </>
                                            </div>)
                                    })}
                                    <hr />
                                    {props.data?.thirdMenu.map((one) => {
                                        return (
                                            <div key={one} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                                <>
                                                    <Typography style={{ fontSize: 15, marginTop: 15 }}>{one}</Typography>
                                                    {thirdMenu.find((e) => e.text === one)?.icon}

                                                </>
                                            </div>)
                                    })}
                                    <hr />
                                    <Typography style={{ fontSize: 17, marginTop: 15 }}><b>위치</b></Typography>
                                    <Typography style={{ fontSize: 15, marginTop: 8 }}>{props.data?.place}</Typography>
                                    <Typography style={{ fontSize: 12, marginTop: 8 }}>숙소 주소는 에어비앤비 <Link href={"/privacyPolicy"}><u>개인정보 처리방침</u></Link>에 따라 예약을 완료한 게스트에게만 공개됩니다.</Typography>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}