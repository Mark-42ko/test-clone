import { Box, Checkbox, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Link from "next/link";

type Props = {
    price: number;
    setPrice: Function;
}

function PriceTag(props: Props) {

    return (
        <Box sx={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <div style={{ padding: 25, width: "80%", backgroundColor: "#E6E6E6", borderRadius: 8, border: "1px solid", borderColor: "#BDBDBD", display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    {
                        props.price <= 15 ?
                            <IconButton>
                                <RemoveCircleOutlineIcon style={{ color: "#E6E6E6", fontSize: 40, backgroundColor: "white", borderRadius: 50 }} />
                            </IconButton>
                            :
                            <IconButton onClick={() => props.setPrice((price: number) => price - 15)} >
                                <RemoveCircleOutlineIcon style={{ fontSize: 40, backgroundColor: "white", borderRadius: 50 }} />
                            </IconButton>
                    }
                    <TextField type={"number"} style={{ backgroundColor: "white", fontSize:30 }} onChange={(evt) => props.setPrice(Number(evt.currentTarget.value))} value={props.price} InputProps={{startAdornment: <InputAdornment position="start"><b style={{fontSize:30}}>$</b></InputAdornment>,}}></TextField>
                    <IconButton onClick={() => props.setPrice((price: number) => price + 15)} >
                        <AddCircleOutlineIcon style={{ fontSize: 40, backgroundColor: "white", borderRadius: 50 }} />
                    </IconButton>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography style={{ fontSize: 18, marginTop: 15 }}>/???</Typography>
                    <Typography style={{ fontSize: 22, marginTop: 12 }}>??? ???????????? ????????? ????????? ????????? ??????</Typography>
                    <Typography>$87 ~ $145 ???????????????.</Typography>
                </div>
            </div>
            <div style={{ marginTop: 35, width: "90%", padding: 15, display: "flex", borderRadius: 8, backgroundColor: "#E6E6E6", border: "1px solid", borderColor: "#BDBDBD", flexDirection: "row" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography style={{ fontSize: 22 }}><b>???????????? ???????????? ????????? ???</b></Typography>
                    <Typography style={{ fontSize: 18, marginTop: 5 }}>??? ????????? 3????????? 20% ?????? ????????? ???????????? ??? ?????? ????????? ???????????????.</Typography>
                    <Link href={"/privacyPolicy"}><u>????????? ????????????</u></Link>
                </div>
                <Checkbox />
            </div>
        </Box>
    );
}

export default PriceTag;