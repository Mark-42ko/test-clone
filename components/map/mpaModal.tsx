import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, IconButton, Link, MenuItem, OutlinedInputProps, Select, SelectChangeEvent, styled, Switch, SwitchProps, TextField, TextFieldProps } from '@mui/material';
// import styled from "@mui/material/styles/styled"
import Image from 'next/image';

const style = {
    position: "absolute",
    top: '80px',
    right: '10%',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    height: "85%"
};

type Props = {
    setBackgroundMap: Function;
    setOpen: Function;
    open: boolean;
    mapData: string | undefined;
    setmapTarget: any;
    setMapCheck: Function;
    setPlace: Function;
}

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'black',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: 'black',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const RedditTextField = styled((props: TextFieldProps) => (
    <TextField
        InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: 'white',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: `black 0 0 0 2px`,
            borderColor: "black",
        },
    },
}));

export default function BasicModal(props: Props) {
    const [state, setState] = React.useState<string>("");
    const mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
    const [mapData, setMapData] = React.useState<any>();
    const [states, setStates] = React.useState<string>("");
    const [city, setCity] = React.useState<string>("");
    const [loadName, setLoadName] = React.useState<string>("");
    const [houseName, setHouseName] = React.useState<string>("");
    const [postNumber, setPostNumber] = React.useState<string>("");
    const [mapUri, setMapUri] = React.useState<string>("");

    React.useEffect(() => {
        !async function () {
            const endPoint = `/google/detail?place_id=${props.mapData}&language=ko&key=${mapKey}`
            const response = await fetch(endPoint);
            const json = await response.json();
            setMapData(json);
        }();
    }, [])

    React.useEffect(()=>{
        if (mapData) {
            setStates(mapData.result.address_components[3]?.long_name);
            setCity(mapData.result.address_components[2]?.long_name);
            setLoadName(mapData.result.address_components[1]?.long_name + " " + mapData.result.address_components[0]?.long_name);
            setPostNumber(mapData.result.address_components[5]?.long_name);
            setState(mapData.result.address_components[4]?.short_name);
            setMapUri(`https://maps.googleapis.com/maps/api/staticmap?center=${mapData.result.geometry.location.lat},${mapData.result.geometry.location.lng}&zoom=12&size=640x600&key=${mapKey}&languge=ko`);
            props.setBackgroundMap(`https://maps.googleapis.com/maps/api/staticmap?center=${mapData.result.geometry.location.lat},${mapData.result.geometry.location.lng}&zoom=12&size=640x600&key=${mapKey}&languge=ko`);
        } else{
            setMapUri(`https://maps.googleapis.com/maps/api/staticmap?center=37.5666805,126.9784147&zoom=12&size=640x600&key=${mapKey}`);
            props.setBackgroundMap(`https://maps.googleapis.com/maps/api/staticmap?center=37.5666805,126.9784147&zoom=12&size=640x600&key=${mapKey}`);
        }
    },[mapData])

    const stateHandle = (event: SelectChangeEvent) => {
        setState(event.target.value as string);
    };

    const okHandle = () => {
        props.setPlace(`${state} ${states} ${city} ${loadName} ${houseName} ${postNumber}`);
        props.setmapTarget(mapData);
        props.setMapCheck(true);
    };

    return (
        <div>
            <Modal
                open={props.open}
                onClose={() => props.setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} overflow={"auto"}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <IconButton onClick={() => props.setOpen(false)}>
                            <ArrowBackIosIcon style={{ color: "black" }} />
                        </IconButton>
                        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginLeft: 135, marginTop: 3 }}>
                            <b>주소 확인</b>
                        </Typography>
                    </div>
                    {mapData &&
                        <div style={{ marginTop: 20 }}>
                            <RedditTextField id="reddit-input" variant="filled" label="주/도" style={{ width: "100%" }} value={states} onChange={(evt) => setStates(evt.currentTarget.value)} />
                            <RedditTextField id="reddit-input" variant="filled" label="도시" style={{ width: "100%" }} value={city} onChange={(evt) => setCity(evt.currentTarget.value)} />
                            <RedditTextField id="reddit-input" variant="filled" label="도로명" style={{ width: "100%" }} value={loadName} onChange={(evt) => setLoadName(evt.currentTarget.value)} />
                            <RedditTextField id="reddit-input" variant="filled" label="아파트 이름, 동호수 등 (선택사항)" style={{ width: "100%" }} value={houseName} onChange={(evt) => setHouseName(evt.currentTarget.value)} />
                            <RedditTextField id="reddit-input" variant="filled" label="우편번호" style={{ width: "100%" }} value={postNumber} onChange={(evt) => setPostNumber(evt.currentTarget.value)} />
                            <Select
                                labelId="demo-simple-select-label"
                                id="reddit-input"
                                value={state}
                                label="국가/지역"
                                onChange={stateHandle}
                                style={{ width: "100%" }}
                            >
                                <MenuItem value={"KR"}>한국 - KR</MenuItem>
                                <MenuItem value={"US"}>미국 - US</MenuItem>
                                <MenuItem value={"CN"}>중국 - CN</MenuItem>
                            </Select>
                        </div>}<hr style={{ marginTop: 30 }} />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ fontSize: 18 }}>
                                <b>구체적인 위치 표시하기</b>
                            </Typography>
                            <Typography style={{ fontSize: 14 }}>
                                게스트에게 숙소 위치를 더욱 구체적으로 알려주실 수 있습니다.
                                <Link href="/privacyPolicy"><b> 숙소 주소는 예약이 확정된 후에만 공개됩니다.</b></Link>
                            </Typography>
                        </div>
                        <div>
                            <IOSSwitch sx={{ m: 1 }} onChange={(evt) => evt.target.checked === true ? setMapUri(`https://maps.googleapis.com/maps/api/staticmap?center=37.5666805,126.9784147&zoom=18&size=640x600&key=${mapKey}`) : setMapUri(`https://maps.googleapis.com/maps/api/staticmap?center=37.5666805,126.9784147&zoom=12&size=640x600&key=${mapKey}`)}/>
                        </div>
                    </div>
                    <div style={{marginTop: 10, display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Image src={mapUri} alt="gg" width={440} height={200}/>
                    </div>
                    <Button onClick={okHandle} style={{ backgroundColor: "black", color: "white", marginTop: 20, width: 80, height: 50, borderRadius: 10 }}><b>확인</b></Button>
                </Box>
            </Modal>
        </div>
    );
}