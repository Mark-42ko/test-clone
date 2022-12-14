import { Typography } from "@mui/material";
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
import AmenitiesFirstCard from "./amenitiesFirstCard";
import AmenitiesSecondCard from "./amenitiesSecondCard";
import AmenitiesThirdCard from "./amenitiesThirdCard";

type Props = {
    setFirstMenu: Function;
    setSecondMenu: Function;
    setThirdMenu: Function;
    firstMenu: Array<string | undefined>;
    secondMenu: Array<string | undefined>;
    thirdMenu: Array<string | undefined>;
}

const firstMenu = [
    { text: "?????? ?????????", icon: <WifiIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "TV", icon: <LiveTvIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "??????", icon: <CountertopsIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "?????????", icon: <LocalLaundryServiceIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "?????? ??? ?????? ??????", icon: <DirectionsCarFilledIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "?????? ??? ?????? ??????", icon: <LocalAtmIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "?????????", icon: <AirIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "?????? ?????? ??????", icon: <DeskIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
];

const secondMenu = [
    { text: "?????????", icon: <PoolIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "?????? ??????", icon: <HotTubIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "?????????", icon: <DeckIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "????????? ??????", icon: <OutdoorGrillIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "?????? ?????? ??????", icon: <TableRestaurantIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "??????", icon: <LocalFireDepartmentIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "?????????", icon: <SportsBaseballIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "?????? ?????????", icon: <FireplaceIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "?????????", icon: <PianoIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "?????? ??????", icon: <FitnessCenterIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "????????? ?????????", icon: <WavesIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "????????? ??????", icon: <SurfingIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "????????? ??? ?????? ?????? ??????", icon: <DownhillSkiingIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "?????? ?????? ??????", icon: <ShowerIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
];

const thirdMenu = [
    { text: "???????????????", icon: <BlurCircularIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "?????? ??????", icon: <MedicationIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "?????????", icon: <FireExtinguisherIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "??????????????? ?????????", icon: <CrisisAlertIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
];

function AmenitiesMenu(props: Props) {

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80%" }}>
            <div>
                <Typography style={{ fontSize: 30 }}>
                    <b>?????? ???????????? ????????? ???????????????</b>
                </Typography>
                <Typography style={{ fontSize: 18 }}>
                    <a>????????? ??????????????? ??????????????? ????????? ???????????? ???????????? ?????????! ????????? ????????? ?????? ??????????????? ????????? ??? ????????????.</a>
                </Typography>
            </div>
            <div style={{marginTop:20}}>
                {firstMenu.map((one) => <AmenitiesFirstCard key={one.text} data={one} setFirstMenu={props.setFirstMenu} firstMenu={props.firstMenu} />)}
            </div>
            <div style={{marginTop: 30}}>
                <Typography style={{ fontSize: 20 }}>
                    <b>????????? ????????? ?????? ??????????????? ??????????</b>
                </Typography>
            </div>
            <div>
                {secondMenu.map((one) => <AmenitiesSecondCard key={one.text} data={one} setSecondMenu={props.setSecondMenu} secondMenu={props.secondMenu}/>)}
            </div>
            <div style={{marginTop: 30}}>
                <Typography style={{ fontSize: 20 }}>
                    <b>????????? ?????? ?????? ?????? ????????? ??????????</b>
                </Typography>
            </div>
            <div>
                {thirdMenu.map((one) => <AmenitiesThirdCard key={one.text} data={one} setThirdMenu={props.setThirdMenu} thirdMenu={props.thirdMenu}/>)}
            </div>
        </div>
    );
}

export default AmenitiesMenu;