import * as React from 'react';
import Typography from '@mui/material/Typography';
import { ToggleButton } from '@mui/material';

type Props = {
    data: string;
    setPrivacy: Function
}

export default function PrivacyCard(props: Props) {
    const [buttonCheck, setButtonCheck] = React.useState<boolean>(false);
    const [border, setBorder] = React.useState<number>(1);
    const [borderCheck, setBorderCheck] = React.useState<boolean>(false);

    const partButton = () => {
        if (buttonCheck === false) {
            props.setPrivacy(props.data);
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
        if (borderCheck === true) {
            setBorder(3);
        } else {
            setBorder(1);
        }
    };

    return (
        <ToggleButton
            sx={{ width: "70%", height: " 5rem", px: 2, borderRadius: 5, border: border, marginBottom: 3 }}
            value
            selected={buttonCheck}
            onClick={partButton}
        >
            <div onMouseEnter={mouseEnterEvent} onMouseOut={mouseOutEvent} style={{ display: "flex", width: "100%", alignItems: "center" }}>
                <Typography component="div" variant="h5" style={{ fontSize: 20, marginLeft: 15, color: "black" }}>
                    <b>{props.data}</b>
                </Typography>
            </div>
        </ToggleButton>
    );
}