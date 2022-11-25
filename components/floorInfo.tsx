import { IconButton, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

type Props = {
    guestCount: number;
    setGuestCount: Function;
    bedCount: number;
    setBedCount: Function;
    bathroomCount: number;
    setBathroomCount: Function;
}

export default function FloorInfo(props: Props) {
    const {guestCount, setGuestCount, bedCount, setBedCount, bathroomCount, setBathroomCount} = props as Props

    return (
        <div style={{ width: "50%" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Typography component="div" variant="h5" style={{ fontSize: 30 }}>
                    <b>게스트</b>
                </Typography>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    {guestCount === 1 ?
                        <IconButton>
                            <RemoveCircleOutlineIcon style={{ color: "#E6E6E6", fontSize: 40 }} />
                        </IconButton>
                        :
                        <IconButton onClick={() => setGuestCount((guestCount:number) => guestCount - 1)} >
                            <RemoveCircleOutlineIcon style={{ fontSize: 40 }} />
                        </IconButton>
                    }
                    <Typography component="div" variant="h5" style={{ fontSize: 20 }}>
                        <a>{guestCount}</a>
                    </Typography>
                    <IconButton onClick={() => setGuestCount((guestCount:number) => guestCount + 1)} >
                        <AddCircleOutlineIcon style={{ fontSize: 40 }} />
                    </IconButton>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 15 }}>
                <Typography component="div" variant="h5" style={{ fontSize: 30 }}>
                    <b>침대</b>
                </Typography>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    {bedCount === 1 ?
                        <IconButton>
                            <RemoveCircleOutlineIcon style={{ color: "#E6E6E6", fontSize: 40 }} />
                        </IconButton>
                        :
                        <IconButton onClick={() => setBedCount((bedCount:number) => bedCount - 1)} >
                            <RemoveCircleOutlineIcon style={{ fontSize: 40 }} />
                        </IconButton>
                    }
                    <Typography component="div" variant="h5" style={{ fontSize: 20 }}>
                        <a>{bedCount}</a>
                    </Typography>
                    <IconButton onClick={() => setBedCount((bedCount:number) => bedCount + 1)} >
                        <AddCircleOutlineIcon style={{ fontSize: 40 }} />
                    </IconButton>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 15 }}>
                <Typography component="div" variant="h5" style={{ fontSize: 30 }}>
                    <b>욕실</b>
                </Typography>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    {bathroomCount === 0.5 ?
                        <IconButton>
                            <RemoveCircleOutlineIcon style={{ color: "#E6E6E6", fontSize: 40 }} />
                        </IconButton>
                        :
                        <IconButton onClick={() => setBathroomCount((bathroomCount:number) => bathroomCount - 0.5)}  >
                            <RemoveCircleOutlineIcon style={{ fontSize: 40 }} />
                        </IconButton>
                    }
                    <Typography component="div" variant="h5" style={{ fontSize: 20 }}>
                        <a>{bathroomCount}</a>
                    </Typography>
                    <IconButton onClick={() => setBathroomCount((bathroomCount:number) => bathroomCount + 0.5)} >
                        <AddCircleOutlineIcon style={{ fontSize: 40 }} />
                    </IconButton>
                </div>
            </div>
        </div >
    );
}