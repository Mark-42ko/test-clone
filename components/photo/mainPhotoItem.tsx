import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type Props = {
    target: File | undefined;
    removeHandle: (val: File) => void;
};

function MainPhotoItem(props: Props) {
    const [imageUri, setImageUri] = useState<string | null>(null);

    useEffect(() => {
        const fileReader = new FileReader();
        fileReader.onload = (rst) => {
            setImageUri(rst.target!.result as string);
        }
        fileReader.readAsDataURL(props.target!);
    }, [props.target!]);

    return (
        <Box sx={{ width: "100%", border: "1px soild black", height: "80%" }}>
            {imageUri !== null ?
                <div style={{ width: "100%", height: 400 , position :  "relative"}}>
                    <img src={imageUri} style={{ width: "100%", height: "100%",}} />
                    <div style={{  position: "absolute", padding: 5, zIndex:2 , 
                    display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", top: 0, left:0, width:"100%" }}>
                        <Typography style={{ backgroundColor: "black", borderRadius: 10, fontSize: 15, padding:5, marginLeft:7, color:"white" }}>
                            <b>커버사진</b>
                        </Typography>
                        <IconButton onClick={() => props.removeHandle(props.target!)}>
                            <DeleteForeverIcon style={{ fontSize: 40, color: "black", backgroundColor: "white", borderRadius: 50, padding: 7 }} />
                        </IconButton>
                    </div>
                </div>
                :
                <Typography>서비스준비중</Typography>
            }
        </Box>
    );
}

export default MainPhotoItem;