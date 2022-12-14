import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Hostings from '../../interface/hostings';
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
    { text: "?????? ?????????", icon: <WifiIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "TV", icon: <LiveTvIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "??????", icon: <CountertopsIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "?????????", icon: <LocalLaundryServiceIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "?????? ??? ?????? ??????", icon: <DirectionsCarFilledIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "?????? ??? ?????? ??????", icon: <LocalAtmIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "?????????", icon: <AirIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "?????? ?????? ??????", icon: <DeskIcon style={{ fontSize: 35, color: "black" }} /> },
];

const secondMenu = [
    { text: "?????????", icon: <PoolIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "?????? ??????", icon: <HotTubIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "?????????", icon: <DeckIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "????????? ??????", icon: <OutdoorGrillIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "?????? ?????? ??????", icon: <TableRestaurantIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "??????", icon: <LocalFireDepartmentIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "?????????", icon: <SportsBaseballIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "?????? ?????????", icon: <FireplaceIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "?????????", icon: <PianoIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "?????? ??????", icon: <FitnessCenterIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "????????? ?????????", icon: <WavesIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "????????? ??????", icon: <SurfingIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "????????? ??? ?????? ?????? ??????", icon: <DownhillSkiingIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "?????? ?????? ??????", icon: <ShowerIcon style={{ fontSize: 35, color: "black" }} /> },
];
const thirdMenu = [
    { text: "???????????????", icon: <BlurCircularIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "?????? ??????", icon: <MedicationIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "?????????", icon: <FireExtinguisherIcon style={{ fontSize: 35, color: "black" }} /> },
    { text: "??????????????? ?????????", icon: <CrisisAlertIcon style={{ fontSize: 35, color: "black" }} /> },
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
                            <b>???????????? ??????</b>
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
                                    <Typography style={{ fontSize: 20, marginTop: 15 }}><b>{props.nick} ?????? ??????????????? {props.data?.type}</b></Typography>
                                    <Typography style={{ fontSize: 15, marginTop: 15 }}>???????????? {props.data?.guest}???, ?????? {props.data?.bed}???, ??????{props.data?.bathroom}??? </Typography>
                                    <Typography style={{ fontSize: 17, marginTop: 15 }}><b>????????????</b></Typography>
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
                                    <Typography style={{ fontSize: 17, marginTop: 15 }}><b>??????</b></Typography>
                                    <Typography style={{ fontSize: 15, marginTop: 8 }}>{props.data?.place}</Typography>
                                    <Typography style={{ fontSize: 12, marginTop: 8 }}>?????? ????????? ??????????????? <Link href={"/privacyPolicy"}><u>???????????? ????????????</u></Link>??? ?????? ????????? ????????? ?????????????????? ???????????????.</Typography>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}