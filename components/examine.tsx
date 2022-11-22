import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import { useSession } from 'next-auth/react';
import Hostings from '../interface/hostings';
import GradingIcon from '@mui/icons-material/Grading';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreateIcon from '@mui/icons-material/Create';
import ExamineModal from './examineModal';

export default function Examine() {
    const { data: session, status } = useSession();
    const [data, setData] = React.useState<Hostings | undefined>();
    const [open, setOpen] = React.useState<boolean>(false);

    const nick = session?.user?.email?.split("@")[0];
    // const nick ="bbb";
    React.useEffect(() => {
        !async function () {
            const response = await fetch("/api/hosting/examine", {
                method: "POST",
                body: JSON.stringify({
                    user: session?.user?.email,
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })
            const json = await response.json();
            console.log(json.data);
            setData(json.data);
        }()
    }, [])

    const cardModalHandle = () => {
        setOpen(true);
    };

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Card sx={{ width: "90%", maxWidth: 530 }} onClick={cardModalHandle}>
                {data &&
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="300"
                            image={`${data.imageUrl[0]}`}
                            alt="숙소 대표 이미지"
                            sx={{ borderRadius: 5, padding: 1 }}
                        />
                        <CardContent style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Typography style={{ fontSize: 20 }}>
                                    <b>{data.name}</b>
                                </Typography>
                                <Typography style={{ fontSize: 15 }}>
                                    ${data.price} 박
                                </Typography>
                            </div>
                            <Typography style={{ fontSize: 15 }}>
                                신규★
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                }
            </Card>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 25, padding: 25 }}>
                <Typography style={{ fontSize: 25 }}><b>다음 단계</b></Typography>
                <div style={{ display: "flex", flexDirection: "row", marginTop: 15, alignItems: "center" }}>
                    <GradingIcon style={{ fontSize: 45 }} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Typography><b>세부 정보를 확인하고 숙소를 등록하세요</b></Typography>
                        <Typography style={{ fontSize: 12 }}>본인 인증이 필요하거나 현지 정부에 등록해야 하는 경우 안내해드리겠습니다.</Typography>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", marginTop: 15, alignItems: "center" }}>
                    <CalendarMonthIcon style={{ fontSize: 45 }} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Typography><b>달력 설정하기</b></Typography>
                        <Typography style={{ fontSize: 12 }}>숙소 예약 가능일을 선택해주세요. 숙소는 등록 완료 후 24시간이 지나면 일반에 공개됩니다.</Typography>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", marginTop: 15, alignItems: "center" }}>
                    <CreateIcon style={{ fontSize: 45 }} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Typography><b>설정 변경하기</b></Typography>
                        <Typography style={{ fontSize: 12 }}>숙소 이용규칙 설정, 환불 정책 선택, 게스트의 예약 방식 선택 등 필요한 작업을 하세요.</Typography>
                    </div>
                </div>
            </div>
            <ExamineModal open={open} setOpen={setOpen} data={data} nick={nick} />
        </Box>
    );
}