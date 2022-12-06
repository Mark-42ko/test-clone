import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LoginModal from './login/loginModal';

type props = {
    anchorEl: HTMLElement | null;
    open: boolean;
    handleClose: () => void;
}

export default function HeaderMenu(props: props) {
    const [open, setOpen] = useState<boolean>(false);
    const { data: session, status } = useSession();
    const router = useRouter();
    const makeHost = () => {
        router.push("/host/homes");
    };

    return (
        <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={props.anchorEl}
            open={props.open}
            onClose={props.handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            {
                session ?
                    <div>
                        <MenuItem onClick={props.handleClose}><b>메시지</b></MenuItem>
                        <MenuItem onClick={props.handleClose}><b>알림</b></MenuItem>
                        <MenuItem onClick={()=>router.push("/trips")}><b>여행</b></MenuItem>
                        <MenuItem onClick={props.handleClose}><b>위시리스트</b></MenuItem><hr />
                        <MenuItem onClick={makeHost}>숙소 호스트 되기</MenuItem>
                        <MenuItem onClick={props.handleClose}>체험 호스팅 하기</MenuItem>
                        <MenuItem onClick={props.handleClose}>호스트 추천하기</MenuItem>
                        <MenuItem onClick={props.handleClose}>계정</MenuItem><hr />
                        <MenuItem onClick={props.handleClose}>도움말</MenuItem>
                        <MenuItem onClick={()=>signOut()}>로그아웃</MenuItem>
                    </div>
                    :
                    <div>
                        <MenuItem onClick={() => setOpen(true)}><b>회원가입</b></MenuItem>
                        <MenuItem onClick={() => setOpen(true)}>로그인</MenuItem><hr />
                        <MenuItem onClick={() => alert("로그인 후 이용해주세요")}>숙소호스트 되기</MenuItem>
                        <MenuItem onClick={() => alert("로그인 후 이용해주세요")}>체험호스팅 하기</MenuItem>
                        <MenuItem onClick={props.handleClose}>도움말</MenuItem>
                        <LoginModal open={open} setOpen={setOpen} handleClose={props.handleClose} />
                    </div>
            }
        </Menu>
    )
}