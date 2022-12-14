import { Button, ButtonBase, IconButton, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HeaderMenu from "../headerMenu";
import { MouseEvent, useState } from "react";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Header() {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (): void => {
        setAnchorEl(null);
    };
    const {data:session, status} = useSession();

    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", margin: 30, height: 15 }}>
            <ButtonBase onClick={()=>router.push("/")}>
                <img src="/image/homeButton.png" style={{width:120}}/>
            </ButtonBase>
            {/* <ButtonBase>
                <div style={{ border: "1px solid gray", borderRadius: 40, display: "flex", flexDirection: "row", height: 40, alignItems: "center", width: 300, justifyContent: "space-between" }}>
                    <a style={{ marginLeft: 15, fontSize: 15 }}>어디든지</a>
                    <a style={{ fontSize: 24, marginBottom: 5, color: "gray" }}> | </a>
                    <a style={{ fontSize: 15 }}>일주일</a>
                    <a style={{ fontSize: 24, marginBottom: 5, color: "gray" }}> | </a>
                    <a style={{ fontSize: 15, color: "gray" }}>게스트추가</a>
                    <SearchIcon style={{ marginRight: 15, color: "white", backgroundColor: "red", borderRadius: 50, fontSize: 25 }} />
                </div>
            </ButtonBase> 추가예정 */}
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Button onClick={()=> session?.user?.email ? router.push("/host/homes") : alert("로그인 후 이용해주세요.")} style={{ fontSize: 15, color:"black" }}><b>호스트 되기</b></Button>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={()=>alert("현재 한국어만 사용가능합니다.")}
                >
                    <LanguageIcon />
                </IconButton>
                <div style={{ border: "1px solid gray", borderRadius: 40, width: 80, display: "flex", flexDirection: "row", height: 50 }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleClick}
                        color="inherit"
                    >
                        <DensityMediumIcon style={{ fontSize: 18, marginRight: 8 }} />
                        <AccountCircle style={{ fontSize: 35 }} />
                    </IconButton>
                </div>
            </div>
            <HeaderMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
        </div >
    )
}