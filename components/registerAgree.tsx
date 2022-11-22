import { Button, Link, Typography } from "@mui/joy";
import { useState } from "react";
import RegisterLast from "./registerLast";

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
    handleClose: () => void;
};

export default function RegisterAgree(props: Props) {
    const [agree, setAgree] = useState<boolean>(false);

    const agreeHndle = async () => {
        const registerData = await fetch("/api/account/register", {
            method: "POST",
            body: JSON.stringify({
                email: props.data.email,
                firstname: props.data.firstname,
                lastname: props.data.lastname,
                birthday: props.data.birthday,
                password: props.data.password,
                marketingDate: props.data.marketingDate,
                agreeDate: props.data.agreeDate
            }),
            headers: {
                "Content-type": "application/json"
            }
        });
        setAgree(true);
    };

    return (
        <div>
            {
                agree === false ?
                    <div>
                        <div style={{ display: "flex", marginTop: 30 }}>
                            <Typography level="body2" style={{ fontSize: 14 }}><b>에어비앤비 커뮤니티 차별반대 서약</b></Typography>
                        </div>
                        <Typography level="body2" style={{ fontSize: 25, marginTop: 15 }}><b>에어비앤비는 누구나 어디에서나 우리 집처럼 편안함을 느낄 수 있는 커뮤니티를 지향합니다.</b></Typography>
                        <Typography level="body2" style={{ fontSize: 16, marginTop: 20 }}>이를 위해 다음에 동의해 주실 것을 부탁드립니다.</Typography>
                        <Typography level="body2" style={{ fontSize: 18, marginTop: 20 }}>인종, 종교, 출신 국가, 민족, 피부색, 장애, 성별, 성 정체성, 성적 지향, 연령 등과 관계없이 에어비앤비 커뮤니티의 모든 사람을 존중하며 편견이나 선입견 없이 대하는 것에 동의합니다.</Typography>
                        <Link style={{ marginTop: 15 }}>더알아보기{">"}</Link>
                        <div>
                            <Button sx={{ mt: 4 /* margin top */ }} style={{ fontSize: 17, backgroundColor: "red", width: "100%" }} onClick={agreeHndle}><b>동의 및 가입하기</b></Button>
                            <Button sx={{ mt: 2 /* margin top */ }} style={{ fontSize: 17, backgroundColor: "white", width: "100%", color: "black" }} variant="outlined" color="neutral" onClick={props.handleClose}><b>거절하기</b></Button>
                        </div>
                    </div>
                    :
                    <RegisterLast handleClose={props.handleClose} data={props.data} />
            }
        </div>
    )
};