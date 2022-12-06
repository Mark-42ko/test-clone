import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

type Props = {
    predictions: any;
    clickHandle: () => void;
    setMapData: Function;
}

export default function BasicList(props: Props) {
    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={()=> {props.setMapData(props.predictions[0].place_id); props.clickHandle();}}>
                            <ListItemIcon>
                                <HomeWorkIcon style={{backgroundColor:"#F2F2F2", color:"black", fontSize:45, padding:10, borderRadius:50}}/>
                            </ListItemIcon>
                            <ListItemText primary={props.predictions[0].structured_formatting.main_text} secondary={props.predictions[0].structured_formatting.secondary_text}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    );
}