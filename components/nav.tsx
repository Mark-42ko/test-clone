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
    { text: "??????", icon: <KeyIcon /> },
    { text: "????????? ?????????", icon: <LandscapeIcon /> },
    { text: "?????? ?????????", icon: <WhatshotIcon /> },
    { text: "?????????", icon: <WheelchairPickupIcon /> },
    { text: "??????", icon: <SportsCricketIcon /> },
    { text: "??????", icon: <OtherHousesIcon /> },
    { text: "?????????", icon: <DeskIcon /> },
    { text: "????????? ??????", icon: <BalconyIcon /> },
    { text: "????????? ??????", icon: <BungalowIcon /> },
    { text: "?????? ?????? ???", icon: <BeachAccessIcon /> },
    { text: "????????????", icon: <AttractionsIcon /> },
    { text: "??????????????? ??????", icon: <PanoramaPhotosphereSharpIcon /> },
    { text: "??????", icon: <HotTubSharpIcon /> },
    { text: "?????????", icon: <FireplaceSharpIcon /> },
    { text: "????????????", icon: <CabinIcon /> },
    { text: "?????? ?????????", icon: <PoolIcon /> },
    { text: "??????", icon: <AgricultureSharpIcon /> },
    { text: "????????? ??????", icon: <WbShadeSharpIcon /> },
    { text: "??????", icon: <CastleIcon /> },
    { text: "??????", icon: <FenceSharpIcon /> },
    { text: "??????", icon: <DownhillSkiingIcon /> },
    { text: "????????? ??? ?????? ?????? ??????", icon: <SnowshoeingIcon /> },
    { text: "????????? ??????", icon: <AccountBalanceIcon /> },
    { text: "??????", icon: <ChaletIcon /> },
    { text: "???????????????", icon: <ForestIcon /> },
    { text: "????????? ?????????", icon: <PianoSharpIcon /> },
    { text: "???????????? ??????", icon: <SoupKitchenSharpIcon /> },
    { text: "B&B", icon: <CoffeeMakerSharpIcon /> },
    { text: "??????", icon: <DirectionsBoatFilledSharpIcon /> },
    { text: "A?????? ??????", icon: <TextFormatSharpIcon /> },
    { text: "???????????????", icon: <HouseboatSharpIcon /> },
    { text: "?????????", icon: <SportsGolfSharpIcon /> },
    { text: "?????????????????????", icon: <BedroomChildSharpIcon /> },
    { text: "?????????", icon: <LocalShippingSharpIcon /> },
    { text: "??????", icon: <SurfingSharpIcon /> },
    { text: "????????????", icon: <BeachAccessIcon /> },
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
                <b style={{fontSize:20, color:"black"}}>??????</b>
            </Button>
        </Box>
    );
}