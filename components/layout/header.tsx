import { ButtonBase, IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HeaderMenu from "../headerMenu";
import { MouseEvent, useState } from "react";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/router";

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

    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", margin: 30, height: 15 }}>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="home"
                sx={{ mr: 2 }}
                onClick={()=>router.push("/")}
            >
                <HomeIcon />
            </IconButton>
            <ButtonBase>
                <div style={{ border: "1px solid gray", borderRadius: 40, display: "flex", flexDirection: "row", height: 40, alignItems: "center", width: 300, justifyContent: "space-between" }}>
                    <a style={{ marginLeft: 15, fontSize: 15 }}>어디든지</a>
                    <a style={{ fontSize: 24, marginBottom: 5, color: "gray" }}> | </a>
                    <a style={{ fontSize: 15 }}>일주일</a>
                    <a style={{ fontSize: 24, marginBottom: 5, color: "gray" }}> | </a>
                    <a style={{ fontSize: 15, color: "gray" }}>게스트추가</a>
                    <SearchIcon style={{ marginRight: 15, color: "white", backgroundColor: "red", borderRadius: 50, fontSize: 25 }} />
                </div>
            </ButtonBase>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <h3 style={{ fontSize: 15 }}>호스트 되기</h3>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
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