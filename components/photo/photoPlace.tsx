import { Box, Button, Typography } from "@mui/material";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { useRef, useState } from "react";

type Props = {
    setFiles: Function;
};

function PhotoPlace(props: Props) {
    const ref = useRef<HTMLInputElement>(null);
    const [draging, setDraging] = useState<boolean>(false);

    const dropHandle: React.DragEventHandler = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        console.log(evt.dataTransfer.files);
        const t = Array.from(evt.dataTransfer.files);
        props.setFiles(t);
    };

    const fileSelectHandle: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        console.log(evt.target.files);
        if (evt.target.files) {
            const t = Array.from(evt.target.files!);
            props.setFiles(t);
        }
    };

    return (
        <Box onDragOver={(evt) => { evt.preventDefault(); evt.stopPropagation(); }}
            onDrop={dropHandle}
            onDragEnter={() => setDraging(true)}
            onDragLeave={() => setDraging(false)}
            sx={{ border: "1px solid", borderRadius: 10, width: "70%", height: 500, borderColor: "#D8D8D8" }} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <PermMediaIcon style={{ fontSize: 80 }} onDragEnter={() => setDraging(true)}/>
            {draging ?
                <Typography style={{ fontSize: 25, marginTop: 20 }} onDragEnter={() => setDraging(true)}>
                    <b>업로드하려면 사진을 끌어서 놓으세요</b>
                </Typography>
                :
                <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
                    <Typography style={{ fontSize: 25, marginTop: 20 }}>
                        <b>여기로 사진을 끌어다 놓으세요.</b>
                    </Typography>
                    <Typography style={{ fontSize: 20 }}>
                        <b>5장 이상의 사진을 선택하세요.</b>
                    </Typography>
                    <Button style={{ marginTop: 60 }} onClick={() => { ref.current?.click() }}>
                        <Typography style={{ fontSize: 15, color: "black" }}>
                            <u><b>기기에서 업로드</b></u>
                        </Typography>
                        <input type="file" ref={ref} style={{ display: "none" }} accept="image/*" multiple onChange={fileSelectHandle} />
                    </Button>
                </div>
            }
        </Box>
    );
}

export default PhotoPlace;