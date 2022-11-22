import { Checkbox, Button, FormHelperText, Link, TextField, Typography } from "@mui/joy";
import FormControl from "@mui/joy/FormControl";
import { useRef, useState } from "react";
import RegisterAgree from "./registerAgree";

type Props = {
    handleClose: () => void;
};

export default function Register(props: Props) {
    const [firstNameError, setFirstNameError] = useState<string>("");
    const [lastNameError, setLastNameError] = useState<string>("");
    const [dateError, setDateError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [check1Error, setCheck1Error] = useState<string>("");

    const [firstNameError2, setFirstNameError2] = useState<boolean>(false);
    const [lastNameError2, setLastNameError2] = useState<boolean>(false);
    const [dateError2, setDateError2] = useState<boolean>(false);
    const [emailError2, setEmailError2] = useState<boolean>(false);
    const [passwordError2, setPasswordError2] = useState<boolean>(false);
    const [check1Error2, setCheck1Error2] = useState<boolean>(false);

    const [continues, setContinues] = useState<boolean>(false);

    interface Data {
        email: string;
        firstname: string;
        lastname: string;
        birthday: Date;
        password: string;
        marketingDate: any;
        agreeDate: Date;
    }

    const [data, setData] = useState<Data>({
        email: "",
        firstname: "",
        lastname: "",
        birthday: new Date(),
        password: "",
        marketingDate: new Date() || undefined,
        agreeDate: new Date()
    });

    const check1Ref = useRef<any>();
    const check2Ref = useRef<any>();

    const submitHandle = async (evt: any) => {
        evt.preventDefault();

        const checked1 = check1Ref.current.checked;
        const checked2 = check2Ref.current.checked;

        const data = new FormData(evt.currentTarget);
        const datas = {
            firstName: data.get("firstName") as string,
            lastName: data.get("lastName") as string,
            date: data.get("date") as any,
            email: data.get("email") as string,
            password: data.get("password") as string,
        };
        const { firstName, lastName, date, email, password } = datas;
        const firstNameRegex = /^[가-힣a-zA-Z]+$/;
        const lastNameRegex = /^[가-힣a-zA-Z]+$/;
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        const year = date.split("-")[0];
        const month = date.split("-")[1];
        const day = date.split("-")[2];

        const today = new Date();
        const birthDate = new Date(year, month, day); // 2000년 8월 10일

        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (!firstNameRegex.test(firstName) || firstName?.length < 1) {
            setFirstNameError("올바른 이름을 입력해주세요.");
        } else {
            setFirstNameError("");
            setFirstNameError2(true);
        }

        if (!lastNameRegex.test(lastName) || lastName?.length < 1) {
            setLastNameError("올바른 성을 입력해주세요.");
        } else {
            setLastNameError("");
            setLastNameError2(true);
        }

        if (age >= 18) {
            setDateError("");
            setDateError2(true);
        } else {
            setDateError("18세 이상 회원만 가입할 수 있습니다.")
        }

        if (!emailRegex.test(email)) {
            setEmailError("올바른 이메일 형식이 아닙니다.");
        } else {
            setEmailError("");
            setEmailError2(true);
        }

        if (!passwordRegex.test(password)) {
            setPasswordError("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
        } else {
            setPasswordError("");
            setPasswordError2(true);
        }

        if (checked1) {
            setCheck1Error("");
            setCheck1Error2(true);
        } else {
            setCheck1Error("개인정보 수집 및 이용에 동의해주세요.");
        }

        if (firstNameError2 === true && lastNameError2 === true && dateError2 === true && emailError2 === true && passwordError2 === true && check1Error2 === true) {
            let marketingDate;

            if (checked1 === true) {
                marketingDate = new Date();
            } else {
                marketingDate = undefined;
            }
            setContinues(true);
            setData({
                email: email,
                firstname: firstName,
                lastname: lastName,
                birthday: date,
                password: password,
                marketingDate: marketingDate,
                agreeDate: new Date(),
            });
        } else {
            setContinues(false);
        }
    };

    return (
        <div>
            {
                continues === false ?
                    <form onSubmit={submitHandle}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Typography level="body2">회원 가입 완료하기</Typography>
                        </div><hr />
                        <FormControl>
                            <TextField
                                name="firstName"
                                type="text"
                                placeholder="이름(예:길동)"
                                error={firstNameError === "" ? false : true}
                            />
                            <FormHelperText style={{ color: "red" }}>{firstNameError}</FormHelperText>
                            <TextField
                                name="lastName"
                                type="text"
                                placeholder="성(예:홍)"
                                error={lastNameError === "" ? false : true}
                            />
                            <FormHelperText style={{ color: "red" }}>{lastNameError}</FormHelperText>
                            <Typography
                                fontSize="sm"
                                sx={{ alignSelf: 'center' }}
                            >
                                정부 발급 신분증에 표시된 이름과 일치하는지 확인하세요.
                            </Typography>
                            <TextField
                                name="date"
                                type="date"
                                placeholder="생년월일"
                                error={dateError === "" ? false : true}
                            />
                            <FormHelperText style={{ color: "red" }}>{dateError}</FormHelperText>
                            <Typography
                                fontSize="sm"
                                sx={{ alignSelf: 'center' }}
                            >
                                만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 에어비앤비의 다른 회원에게 공개되지 않습니다.
                            </Typography>
                            <TextField
                                name="email"
                                placeholder="이메일"
                                error={emailError === "" ? false : true}
                            />
                            <FormHelperText style={{ color: "red" }}>{emailError}</FormHelperText>
                            <Typography
                                fontSize="sm"
                                sx={{ alignSelf: 'center' }}
                            >
                                예약 확인과 영수증을 이메일로 보내드립니다.
                            </Typography>
                            <TextField
                                name="password"
                                placeholder="비밀번호"
                                error={passwordError === "" ? false : true}
                            />
                            <FormHelperText style={{ color: "red" }}>{passwordError}</FormHelperText>
                            <hr />
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Typography
                                    fontSize="sm"
                                    sx={{ alignSelf: 'center' }}
                                >
                                    <p>개인정보 수집 및 이용에 동의합니다.</p>
                                    <p>1. 에어비앤비가 수집하는 개인 정보 에어비앤비 플랫폼을 이용하는 데 필요한 정보 당사는 회원님이 에어비앤비 플랫폼을 이용할 때 회원님의 개인 정보를 수집합니다. 그렇지 않은 경우, 에어비앤비는 요청하신 서비스를 회원님께 제공하지 못할 수 있습니다. 이러한 정보에는 다음이 포함됩니다.</p>
                                    <Link href="/privacyPolicy"><b>더보기</b></Link>
                                </Typography>
                                <input type={"checkbox"} ref={check1Ref} />
                            </div>
                            <div>
                                {check1Error !== "" ? <p style={{ color: "red"}}>{check1Error}</p> : <></>}
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Typography
                                    fontSize="sm"
                                    sx={{ alignSelf: 'center' }}
                                >
                                    <p>마케팅 이메일 수신을 원합니다(선택).</p>
                                    <p>에어비앤비 회원 전용 할인, 추천 여행 정보, 마케팅 이메일, 푸시 알림을 보내드립니다. 계정 설정 또는 마케팅 알림에서 언제든지 수신을 거부할 수 있습니다.</p>
                                    <Link href="/privacyPolicy"><b>더보기</b></Link>
                                </Typography>
                                <input type={"checkbox"} ref={check2Ref} />
                            </div><hr />
                            <Typography
                                fontSize="sm"
                                sx={{ alignSelf: 'center' }}
                            >
                                동의 및 계속하기를 선택하여 에어비앤비 서비스 약관, 결제 서비스 약관, 위치기반서비스 이용약관, 차별 금지 정책, 개인정보 처리방침에 동의합니다.
                            </Typography>
                            <Button type="submit" sx={{ mt: 1 /* margin top */ }} style={{ backgroundColor: "red", width: "100%" }} ><b>동의 및 계속하기</b></Button>
                        </FormControl>
                    </form>
                    :
                    <RegisterAgree data={data} handleClose={props.handleClose} />
            }
        </div>
    );
}