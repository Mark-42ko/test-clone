import KeyIcon from '@mui/icons-material/Key';
import LandscapeIcon from '@mui/icons-material/Landscape';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import SnowshoeingIcon from '@mui/icons-material/Snowshoeing';
import WheelchairPickupIcon from '@mui/icons-material/WheelchairPickup';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import DeskIcon from '@mui/icons-material/Desk';
import BalconyIcon from '@mui/icons-material/Balcony';
import BungalowIcon from '@mui/icons-material/Bungalow';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PoolIcon from '@mui/icons-material/Pool';
import AttractionsIcon from '@mui/icons-material/Attractions';
import CabinIcon from '@mui/icons-material/Cabin';
import CastleIcon from '@mui/icons-material/Castle';
import ChaletIcon from '@mui/icons-material/Chalet';
import ForestIcon from '@mui/icons-material/Forest';
import TextFormatSharpIcon from '@mui/icons-material/TextFormatSharp';
import DirectionsBoatFilledSharpIcon from '@mui/icons-material/DirectionsBoatFilledSharp';
import SurfingSharpIcon from '@mui/icons-material/SurfingSharp';
import PianoSharpIcon from '@mui/icons-material/PianoSharp';
import SoupKitchenSharpIcon from '@mui/icons-material/SoupKitchenSharp';
import CoffeeMakerSharpIcon from '@mui/icons-material/CoffeeMakerSharp';
import HouseboatSharpIcon from '@mui/icons-material/HouseboatSharp';
import SportsGolfSharpIcon from '@mui/icons-material/SportsGolfSharp';
import LocalShippingSharpIcon from '@mui/icons-material/LocalShippingSharp';
import BedroomChildSharpIcon from '@mui/icons-material/BedroomChildSharp';
import FenceSharpIcon from '@mui/icons-material/FenceSharp';
import HotTubSharpIcon from '@mui/icons-material/HotTubSharp';
import PanoramaPhotosphereSharpIcon from '@mui/icons-material/PanoramaPhotosphereSharp';
import FireplaceSharpIcon from '@mui/icons-material/FireplaceSharp';
import AgricultureSharpIcon from '@mui/icons-material/AgricultureSharp';
import WbShadeSharpIcon from '@mui/icons-material/WbShadeSharp';
import { Box, Button, Tab, Tabs } from "@mui/material";
import { useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';

const menu = [
    { text: "신규", icon: <KeyIcon /> },
    { text: "세상의 꼭대기", icon: <LandscapeIcon /> },
    { text: "인기 급상승", icon: <WhatshotIcon /> },
    { text: "무장애", icon: <WheelchairPickupIcon /> },
    { text: "키즈", icon: <SportsCricketIcon /> },
    { text: "한옥", icon: <OtherHousesIcon /> },
    { text: "개인실", icon: <DeskIcon /> },
    { text: "최고의 전망", icon: <BalconyIcon /> },
    { text: "한적한 시골", icon: <BungalowIcon /> },
    { text: "해변 바로 앞", icon: <BeachAccessIcon /> },
    { text: "국립공원", icon: <AttractionsIcon /> },
    { text: "기상천외한 숙소", icon: <PanoramaPhotosphereSharpIcon /> },
    { text: "료칸", icon: <HotTubSharpIcon /> },
    { text: "캠핑장", icon: <FireplaceSharpIcon /> },
    { text: "통나무집", icon: <CabinIcon /> },
    { text: "멋진 수영장", icon: <PoolIcon /> },
    { text: "농장", icon: <AgricultureSharpIcon /> },
    { text: "초소형 주택", icon: <WbShadeSharpIcon /> },
    { text: "캐슬", icon: <CastleIcon /> },
    { text: "저택", icon: <FenceSharpIcon /> },
    { text: "스키", icon: <DownhillSkiingIcon /> },
    { text: "스키를 탄 채로 출입 가능", icon: <SnowshoeingIcon /> },
    { text: "상징적 도시", icon: <AccountBalanceIcon /> },
    { text: "북극", icon: <ChaletIcon /> },
    { text: "트리하우스", icon: <ForestIcon /> },
    { text: "그랜드 피아노", icon: <PianoSharpIcon /> },
    { text: "전문가급 주방", icon: <SoupKitchenSharpIcon /> },
    { text: "B&B", icon: <CoffeeMakerSharpIcon /> },
    { text: "보트", icon: <DirectionsBoatFilledSharpIcon /> },
    { text: "A자형 주택", icon: <TextFormatSharpIcon /> },
    { text: "하우스보트", icon: <HouseboatSharpIcon /> },
    { text: "골프장", icon: <SportsGolfSharpIcon /> },
    { text: "컨테이너하우스", icon: <BedroomChildSharpIcon /> },
    { text: "캠핑카", icon: <LocalShippingSharpIcon /> },
    { text: "서핑", icon: <SurfingSharpIcon /> },
    { text: "해변근처", icon: <BeachAccessIcon /> },
];

export default function Nav() {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" scrollButtons={true} variant={"scrollable"}>
                {menu.map((one) => <Tab icon={one.icon} label={one.text} key={one.text}/>)}
            </Tabs>
            <Button style={{border:"1px solid", borderRadius:10, width: 180, color:"#D8D8D8"}}>
                <TuneIcon style={{color:"black"}}/>
                <b style={{fontSize:20, color:"black"}}>필터</b>
            </Button>
        </Box>
    );
}