import * as React from 'react';
import Typography from '@mui/material/Typography';
import Propites from "../interface/propeties"
import { ToggleButton } from '@mui/material';
import Data from '../interface/propetiesType';

type Props = {
    data: Data;
    setProperty: Function;
};

export default function PropetiesTypeCard(props: Props) {
    const [buttonCheck, setButtonCheck] = React.useState<boolean>(false);
    const [border, setBorder] = React.useState<number>(1);
    const [borderCheck, setBorderCheck] = React.useState<boolean>(false);

    const partButton = () => {
        if(buttonCheck === false) {
            props.setProperty(props.data.property);
            setBorderCheck(true);
            setBorder(3);
            setButtonCheck(true);
        } else {
            setBorderCheck(false);
            setBorder(1);
            setButtonCheck(false);
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
            <div onMouseEnter={mouseEnterEvent} onMouseOut={mouseOutEvent} style={{ display: "flex", flexDirection:"column", width: "100%", alignItems: "start", padding: 10 }}>
                <Typography component="div" variant="h5" style={{ fontSize: 20, color:"black" }}>
                    <b>{props.data.property}</b>
                </Typography>
                <Typography component="div" variant="h5" style={{ fontSize: 15 }}>
                    {props.data.description}
                </Typography>
            </div>
        </ToggleButton>
    );
}