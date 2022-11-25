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
    { text: "무선 인터넷", icon: <WifiIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "TV", icon: <LiveTvIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "주방", icon: <CountertopsIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "세탁기", icon: <LocalLaundryServiceIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "건물 내 무료 주차", icon: <DirectionsCarFilledIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "건물 내 유료 주차", icon: <LocalAtmIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "에어컨", icon: <AirIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "업무 전용 공간", icon: <DeskIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
];

const secondMenu = [
    { text: "수영장", icon: <PoolIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "온수 욕조", icon: <HotTubIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "파티오", icon: <DeckIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "바비큐 그릴", icon: <OutdoorGrillIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "야외 식사 공간", icon: <TableRestaurantIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "화로", icon: <LocalFireDepartmentIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "당구대", icon: <SportsBaseballIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "실내 벽난로", icon: <FireplaceIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "피아노", icon: <PianoIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "운동 기구", icon: <FitnessCenterIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "호수로 연결됨", icon: <WavesIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "해변과 인접", icon: <SurfingIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "스키를 탄 채로 출입 가능", icon: <DownhillSkiingIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "야외 샤워 시설", icon: <ShowerIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
];

const thirdMenu = [
    { text: "화재경보기", icon: <BlurCircularIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "구급 상자", icon: <MedicationIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "소화기", icon: <FireExtinguisherIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
    { text: "일산화탄소 경보기", icon: <CrisisAlertIcon style={{ fontSize: 80, padding: 20, color: "black" }} /> },
];

function AmenitiesMenu(props: Props) {

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80%" }}>
            <div>
                <Typography style={{ fontSize: 30 }}>
                    <b>숙소 편의시설 정보를 추가하세요</b>
                </Typography>
                <Typography style={{ fontSize: 18 }}>
                    <a>여기에 추가하려는 편의시설이 보이지 않더라도 걱정하지 마세요! 숙소를 등록한 후에 편의시설을 추가할 수 있습니다.</a>
                </Typography>
            </div>
            <div style={{marginTop:20}}>
                {firstMenu.map((one) => <AmenitiesFirstCard key={one.text} data={one} setFirstMenu={props.setFirstMenu} firstMenu={props.firstMenu} />)}
            </div>
            <div style={{marginTop: 30}}>
                <Typography style={{ fontSize: 20 }}>
                    <b>특별히 내세울 만한 편의시설이 있나요?</b>
                </Typography>
            </div>
            <div>
                {secondMenu.map((one) => <AmenitiesSecondCard key={one.text} data={one} setSecondMenu={props.setSecondMenu} secondMenu={props.secondMenu}/>)}
            </div>
            <div style={{marginTop: 30}}>
                <Typography style={{ fontSize: 20 }}>
                    <b>다음과 같은 안전 관련 물품이 있나요?</b>
                </Typography>
            </div>
            <div>
                {thirdMenu.map((one) => <AmenitiesThirdCard key={one.text} data={one} setThirdMenu={props.setThirdMenu} thirdMenu={props.thirdMenu}/>)}
            </div>
        </div>
    );
}

export default AmenitiesMenu;