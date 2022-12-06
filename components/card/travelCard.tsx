import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import Reservation from "../../interface/reservation";

type Props = {
    data: Reservation;
}

function TravelCard(props: Props) {
    return (
        <Card sx={{ width: "80%", position: "relative" }}>
            <CardActionArea style={{ display: "flex", flexDirection: "row" }}>
                <CardMedia
                    component="img"
                    width={350}
                    height={300}
                    image={props.data.productInfo.imageUrl[0]}
                    alt="숙소 대표 이미지"
                    sx={{ borderRadius: 5, padding: 1, width:350, height:350 }}
                />
                <CardContent style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div style={{ marginLeft: 20 }}>
                        <Typography style={{ fontSize: 25 }}><b>예약 숙소</b></Typography>
                        <Typography style={{ fontSize: 20 }}>- {props.data.productInfo.name}</Typography>
                        <Typography style={{ fontSize: 25 }}><b>예약 일정</b></Typography>
                        <Typography style={{ fontSize: 20 }}>- {props.data.checkIn.toString().split("T")[0]} ~ {props.data.checkOut.toString().split("T")[0]} / {Math.ceil((new Date(props.data.checkOut).getTime() - new Date(props.data.checkIn).getTime()) / (24 * 60 * 60 * 1000))}박</Typography>
                        <Typography style={{ fontSize: 25 }}><b>예약 인원</b></Typography>
                        <Typography style={{ fontSize: 20 }}>- 게스트 : {props.data.numberOfGuest}명{props.data.numberOfInfants && `, 유아: ${props.data.numberOfInfants}명`}</Typography>
                        <Typography style={{ fontSize: 25 }}><b>위치</b></Typography>
                        <Typography style={{ fontSize: 20 }}>- {props.data.productInfo.place}</Typography>
                        <Typography style={{ fontSize: 25 }}><b>숙소 연락처</b></Typography>
                        <Typography style={{ fontSize: 20 }}>- {props.data.hostingId}</Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default TravelCard;