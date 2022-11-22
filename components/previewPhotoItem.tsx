import { Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StarIcon from '@mui/icons-material/Star';

type Props = {
    target: File | undefined;
    removeHandle: (val: File) => void;
    coverChange: (val: File) => void;
};

function PreviewPhotoItem(props: Props) {
    const [imageUri, setImageUri] = useState<string | null>(null);

    useEffect(() => {
        const fileReader = new FileReader();
        fileReader.onload = (rst) => {
            setImageUri(rst.target!.result as string);
        }
        fileReader.readAsDataURL(props.target!);
    }, []);

    return (
        <div style={{ width: "50%", border: "1px soild black" }}>
            {imageUri !== null ?
                <div style={{ width: "100%", height: 400, position: "relative" }}>
                    <img src={imageUri} style={{ width: "100%", height: 400, padding: 5, position: "absolute" }} />
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 10, alignItems: "center" }}>
                        <Button onClick={() => props.coverChange(props.target!)} style={{ backgroundColor: "white", color: "black", height: 35, marginLeft: 5 }}><b>커버변경</b></Button>
                        <IconButton onClick={() => props.removeHandle(props.target!)}>
                            <DeleteForeverIcon style={{ fontSize: 40, color: "black", backgroundColor: "white", borderRadius: 50, padding: 7 }} />
                        </IconButton>
                    </div>
                </div>
                :
                <Typography>서비스준비중</Typography>
            }
        </div>
    );
}

export default PreviewPhotoItem;