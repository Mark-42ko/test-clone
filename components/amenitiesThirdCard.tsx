import { ToggleButton, Typography } from "@mui/material";
import { useState } from "react";

type Props = {
    data: {
        text: string;
        icon: any;
    }
    setThirdMenu: Function;
    thirdMenu: Array<string |undefined>;
}

function AmenitiesThirdCard(props: Props) {

    const [buttonCheck, setButtonCheck] = useState<boolean>(false);
    const [border, setBorder] = useState<number>(1);
    const [borderColor, setBorderColor] = useState<string>("#F2F2F2");
    const [borderCheck, setBorderCheck] = useState<boolean>(false);

    const partButton = () => {
        if (buttonCheck === false) {
            props.setThirdMenu([...props.thirdMenu, props.data.text]);
            setBorderColor("black");
            setBorderCheck(true);
            setBorder(3);
            setButtonCheck(true);
        } else {
            for(var i = 0; i < props.thirdMenu.length; i++){ 
                if (props.thirdMenu[i] === props.data.text) { 
                    props.thirdMenu.splice(i, 1); 
                  i--; 
                }
            }
            setBorderColor("#F2F2F2");
            setBorderCheck(false);
            setBorder(1);
            setButtonCheck(false);
            props.setThirdMenu(props.thirdMenu);
        }
    };

    const mouseEnterEvent = () => {
        setBorderColor("black");
        setBorder(3);
    };

    const mouseOutEvent = () => {
        if (borderCheck === true) {
            setBorderColor("black");
            setBorder(3);
        } else {
            setBorderColor("#F2F2F2");
            setBorder(1);
        }
    };

    return (
        <ToggleButton
            sx={{ width: "10rem", height: " 10rem", px: 2, borderRadius: 5, border: border, borderColor: borderColor, margin:1 }}
            value
            selected={buttonCheck}
            onClick={partButton}
        >
            <div onMouseEnter={mouseEnterEvent} onMouseOut={mouseOutEvent} style={{ display: "flex", flexDirection:"column", width: "100%", height:"100%", alignItems: "center" }}>
                {props.data.icon}
                <Typography style={{ color: "black" }}><b>{props.data.text}</b></Typography>
            </div>
        </ToggleButton>
    );
}

export default AmenitiesThirdCard;