import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Room from '@mui/icons-material/Room';
import { Box, ButtonBase, List, ListItem, Typography } from '@mui/material';
import NearMeIcon from '@mui/icons-material/NearMe';
import SearchList from './searchList';
import { ConstructionOutlined } from '@mui/icons-material';

type Props = {
    clickHandle: () => void;
    setMapData: Function;
};

export default function CustomizedInputBase(props: Props) {

    const [check, setCheck] = React.useState<boolean>(false);
    const [inputValue, setInputValue] = React.useState<string>("");
    const mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
    const [predictions, setPredictions] = React.useState<any>();

    React.useEffect(() => {
        const timerId = setTimeout(async () => {
            const endPoint = `/google/autocompelte?input=${inputValue}&language=ko&key=${mapKey}`;
            if (inputValue.trim().length === 0) {
                setPredictions(null);
            } else {
                const response = await fetch(endPoint);
                const json = await response.json();
                setPredictions(json.predictions);
            }
        }, 1000);
        return () => {
            console.log(timerId + "... cancled");
            clearTimeout(timerId)
        };
    }, [inputValue])

    const handleClick = (event: React.MouseEvent<any>) => {
        setCheck(true);
    };

    const currentPositionHandle = () => {
        navigator.geolocation.getCurrentPosition((rst) => {
            console.log(rst.coords.latitude);
        });
    };
    
    return (
        <div>
            {check ?
                <div>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', flexDirection: "column", alignItems: 'start', width: "100%", borderRadius: 5, padding: 3 }}
                        onClick={handleClick}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Room />
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="주소를 입력하세요."
                                inputProps={{ 'aria-label': 'search google maps' }}
                                onChange={(evt) => setInputValue(evt.currentTarget.value)}
                                value={inputValue}
                            />
                        </div><hr style={{ width: 450 }} />
                            { predictions &&
                                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    <nav aria-label="main mailbox folders">
                                        <List>
                                            <ListItem disablePadding style={{display:"flex", flexDirection:"column"}}>
                                                {predictions.map(() => { return <SearchList key={predictions[0].place_id} predictions={predictions} clickHandle={props.clickHandle} setMapData={props.setMapData}/> })}
                                            </ListItem>
                                        </List>
                                    </nav>
                                </Box>
                            }
                        <div style={{ display: "flex", alignItems: "center", marginTop: 30, width: "100%", height: 50 }}>
                            <ButtonBase sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "left" }} onClick={props.clickHandle}>
                                <NearMeIcon style={{ backgroundColor: "#F2F2F2", borderRadius: 50, fontSize: 40, padding: 10 }} />
                                <Typography style={{ marginLeft: 12 }}>현재 위치 사용</Typography>
                            </ButtonBase>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", marginTop: 20, width: "100%", height: 50 }}>
                            <ButtonBase sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "left" }} onClick={props.clickHandle}>
                                <Typography style={{ marginLeft: 8 }}><u>주소를 직접 입력하세요</u></Typography>
                            </ButtonBase>
                        </div>
                    </Paper>
                </div>
                :
                <div>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500, height: 65, borderRadius: 5, padding: 3 }}
                        onClick={handleClick}
                    >
                        <Room />
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="주소를 입력하세요."
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                    </Paper>
                </div>
            }
        </div>
    );
}