import { Button, Typography } from "@mui/joy";

type Props = {
    data: {
        email: string;
        firstname: string;
        lastname: string;
        birthday: Date;
        password: string;
        marketingDate: any;
        agreeDate: Date;
    };
    handleClose: ()=>void;
};

export default function RegisterLast(props: Props) {

    const accessHandle = async() => {
        props.handleClose();
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Typography level="body2">회원가입 완료</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center", flexDirection:"column", alignItems: "center" }}>
                <Typography level="body2" style={{ fontSize: 25, marginTop: 25 }}><b>에어비앤비에 오신 것을 환영합니다.</b></Typography>
                <Typography level="body2" style={{ fontSize: 20, marginTop: 10 }}>전 세계 숙소, 현지 레스토랑 및 독특한 체험을 찾아보세요.</Typography>
            </div>
            <Button sx={{ mt: 4 /* margin top */ }} style={{ fontSize: 17, backgroundColor: "red", width: "100%" }} onClick={accessHandle}><b>완료</b></Button>
        </div>
    );
}