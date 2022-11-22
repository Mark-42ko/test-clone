import { TextField, Button, CssVarsProvider, Link, Option, Select, Sheet, Typography, Box, FormHelperText } from "@mui/joy";
import FormControl from "@mui/joy/FormControl"
import { MailOutline } from "@mui/icons-material";
import { useState } from "react";
import Register from "./register";
import { signIn, useSession } from "next-auth/react";
import { compare } from "bcryptjs";

type Props = {
    handleClose: () => void;
};

type Data = {
    email: string;
    firstname: string;
    lastname: string;
    birthday: Date;
    password: string;
    marketingDate: any;
    agreeDate: Date;
};

export default function Login(props: Props) {
    const [loginCheck, setloginCheck] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>("");
    const [register, setRegister] = useState<boolean>(true);
    const [emailCheck, setEmailCheck] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<string>("");
    const [loginData, setLoginData] = useState<Data>({
        email: "",
        firstname: "",
        lastname: "",
        birthday: new Date(),
        password: "",
        marketingDate: new Date() || undefined,
        agreeDate: new Date()
    });
    const { data: session, status } = useSession();

    const submitHandle = async (evt: any) => {
        evt.preventDefault();
        const data = new FormData(evt.currentTarget);
        const emailData = { email: data.get("email") as string };
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

        if (!emailRegex.test(emailData.email)) {
            setEmailError("올바른 이메일 형식이 아닙니다.");
        } else {
            const data = await fetch("/api/account/login", {
                method: "POST",
                body: JSON.stringify({
                    email: emailData.email
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            const results = await data.json();
            if (results.result === true) {
                setLoginData(results.data[0]);
                setEmailCheck(true);
            } else {
                setEmailCheck(false);
                setEmailError("");
                setRegister(false);
            }
        }
    };

    const loginSubmitHandle = async (evt: any) => {
        evt.preventDefault();
        const datas = new FormData(evt.currentTarget);
        const passwordData = { password: datas.get("password") as string };
        if (await compare(passwordData.password, loginData.password)) {
            const result = await signIn("credentials", {
                redirect: false,
                email: loginData.email,
                password: passwordData.password
            });
            console.log("결과물", result);
            if (status === "loading") {
                console.log("데이터 확인중")
            }
            if (status === "authenticated") {
                console.log("로그인완료")
            }
            props.handleClose();
        } else {
            setPasswordError("비밀번호가 일치하지 않습니다.");
        }
    };
    
    console.log("세션", session);
    return (
        <CssVarsProvider>
            <main>
                <Sheet
                    sx={{
                        width: 450,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        borderRadius: 'sm',
                    }}
                >
                    {
                        register ?
                            <div>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <Typography level="body2">로그인 또는 회원가입</Typography>
                                </div>
                                <div>
                                    <Typography level="h4" component="h1">
                                        <b>에어비앤비에 오신 것을 환영합니다.</b>
                                    </Typography>
                                </div>
                                {
                                    loginCheck ?
                                        <div>
                                            {
                                                emailCheck ?
                                                    <form onSubmit={loginSubmitHandle}>
                                                        <FormControl>
                                                            <TextField
                                                                name="password"
                                                                placeholder="비밀번호"
                                                                type={"password"}
                                                                error={passwordError === "" ? false : true}
                                                            />
                                                            <FormHelperText style={{ color: "red" }}>{passwordError}</FormHelperText>
                                                            <Button type="submit" sx={{ mt: 1 }} style={{ backgroundColor: "red", width: "100%" }} ><b>로그인</b></Button>
                                                        </FormControl>
                                                    </form>
                                                    :
                                                    <form onSubmit={submitHandle}>
                                                        <FormControl>
                                                            <TextField
                                                                name="email"
                                                                placeholder="이메일"
                                                                error={emailError === "" ? false : true}
                                                            />
                                                            <FormHelperText style={{ color: "red" }}>{emailError}</FormHelperText>
                                                            <Button type="submit" sx={{ mt: 1 }} style={{ backgroundColor: "red", width: "100%" }} ><b>계속</b></Button>
                                                        </FormControl>
                                                    </form>
                                            }
                                        </div>
                                        :
                                        <div>
                                            <div>
                                                <Select placeholder="국가/지역">
                                                    <Option value={82}>한국 (+82)</Option>
                                                    <Option value={1}>미국 (+1)</Option>
                                                    <Option value={86}>중국 (+86)</Option>
                                                    <Option value={81}>일본 (+81)</Option>
                                                </Select>
                                            </div>
                                            <TextField
                                                name="password"
                                                type="tel"
                                                placeholder="전화번호"
                                            />
                                            <Typography
                                                fontSize="sm"
                                                sx={{ alignSelf: 'center' }}
                                            >
                                                전화나 문자로 전화번호를 확인하겠습니다. 일반 문자 메시지 요금 및 데이터 요금이 부과됩니다.
                                                <Link href="/privacyPolicy"><b>개인정보 처리방침</b></Link>
                                            </Typography>
                                            <Button sx={{ mt: 1 }} style={{ backgroundColor: "red", width: "100%" }} ><b>계속</b></Button>
                                        </div>
                                }
                                <Typography
                                    fontSize="sm"
                                    sx={{ alignSelf: 'center' }}
                                >또는</Typography>
                                <Button sx={{ mt: 1 }} style={{ backgroundColor: "white", justifyContent: "left", height: 48, width: "100%" }} color="neutral" variant="outlined">
                                    <img src="/image/facebook.png" style={{ width: 20, height: 20 }} />
                                    <b style={{ marginLeft: 110 }}>페이스북으로 로그인하기</b>
                                </Button>
                                <Button onClick={() => { signIn("google") }} sx={{ mt: 1 }} style={{ backgroundColor: "white", justifyContent: "left", height: 48, width: "100%" }} color="neutral" variant="outlined">
                                    <img src="/image/pngwing.com.png" style={{ width: 20, height: 20 }} />
                                    <b style={{ marginLeft: 125 }}>구글으로 로그인하기</b>
                                </Button>
                                <Button sx={{ mt: 1 }} style={{ backgroundColor: "white", justifyContent: "left", height: 48, width: "100%" }} color="neutral" variant="outlined">
                                    <img src="/image/pngwing.com (1).png" style={{ width: 20, height: 20 }} />
                                    <b style={{ marginLeft: 105 }}>Apple 계정으로 로그인하기</b>
                                </Button>
                                <Button sx={{ mt: 1 }} style={{ backgroundColor: "white", justifyContent: "left", height: 48, width: "100%" }} color="neutral" variant="outlined" onClick={() => setloginCheck(true)}>
                                    <MailOutline style={{ width: 20, height: 20 }} />
                                    <b style={{ marginLeft: 120 }}>이메일로 로그인하기</b>
                                </Button>
                            </div>
                            :
                            <Register handleClose={props.handleClose} />
                    }
                </Sheet>
            </main>
        </CssVarsProvider>
    )
}