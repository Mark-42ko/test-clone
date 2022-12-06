import * as React from 'react';
import Typography from '@mui/material/Typography';
import Propites from "../../interface/propeties"
import { ToggleButton } from '@mui/material';

type Props = {
    data: Propites;
    setTarget: Function
};

export default function PropetiesCard(props: Props) {
    const [buttonCheck, setButtonCheck] = React.useState<boolean>(false);
    const [border, setBorder] = React.useState<number>(1);
    const [borderCheck, setBorderCheck] = React.useState<boolean>(false);

    const partButton = () => {
        if(buttonCheck === false) {
            setBorderCheck(true);
            setBorder(3);
            setButtonCheck(true);
            props.setTarget(props.data);
        } else {
            setBorderCheck(false);
            setBorder(1);
            setButtonCheck(false);
            props.setTarget(null);
        }
    };

    const mouseEnterEvent = () => {
        setBorder(3);
    };

    const mouseOutEvent = () => {
        if(borderCheck === true) {
            setBorder(3);
        } else {
            setBorder(1);
        }
    };

    return (
        <ToggleButton
            sx={{ width: "70%", height: " 5rem", px: 2, borderRadius: 5, border: border}}
            value
            selected={buttonCheck}
            onClick={partButton}
        >
            <div onMouseEnter={mouseEnterEvent} onMouseOut={mouseOutEvent} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                <Typography component="div" variant="h5" style={{ fontSize: 20, marginLeft: 15 }}>
                    <b>{props.data.group}</b>
                </Typography>
                <img src={props.data.image} style={{ width: 60, height: "100%", borderRadius: 8 }} />
            </div>
        </ToggleButton>
    );
}