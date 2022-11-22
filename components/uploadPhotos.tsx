import { Box, Button, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import PreviewPhotoItem from "./previewPhotoItem";
import MainPhotoItem from "./mainPhotoItem";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { useRef, useState } from "react";

type Props = {
    files: Array<File | undefined>;
    setFiles: Function;
};

function UploadPhotos(props: Props) {
    const ref = useRef<HTMLInputElement>(null);
    const [draging, setDraging] = useState<boolean>(false);

    const removeHandle = (val: File) => {
        for (var i = 0; i < props.files.length; i++) {
            if (props.files[i] === val) {
                props.files.splice(i, 1);
                break;
            }
        }
        props.setFiles([...props.files]);
    };

    const filePlusHandle: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        if (evt.target.files) {
            const t = Array.from(evt.target.files!);
            props.setFiles([...props.files, ...t]);
        }
    };

    const dropHandle: React.DragEventHandler = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        const t = Array.from(evt.dataTransfer.files);
        setDraging(false);
        props.setFiles([...props.files, ...t]);
    };

    const coverChange = (val: File) => {
        for (var i = 0; i < props.files.length; i++) {
            if (props.files[i] === val) {
                const target = props.files[i];
                props.files.splice(i, 1);
                props.files.unshift(target);
                break;
            }
        }
        props.setFiles([...props.files]);
    };

    return (
        <Box sx={{ display: "flex", width: "90%", height: "90%", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom:20 }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography style={{ fontSize: 25 }}>
                        <b>5장 이상의 사진을 선택하세요.</b>
                    </Typography>
                </div>
                <div>
                    <Button onClick={() => ref.current?.click()} style={{ border: "1px solid", borderRadius: 30, borderColor: "#D8D8D8", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <AddIcon style={{ fontSize: 25, color: "black" }} />
                        <Typography style={{ fontSize: 18, marginLeft: 5, color: "black", marginTop: 3 }}>
                            <a>추가</a>
                        </Typography>
                    </Button>
                    <input type="file" ref={ref} style={{ display: "none" }} accept="image/*" multiple onChange={filePlusHandle} />
                </div>
            </div>
            <div style={{ width: "100%", height: 400, position: "relative", display: "flex", flexWrap: "wrap" }}>
                <MainPhotoItem target={props.files[0]} removeHandle={removeHandle} />
            </div>
            <Box style={{ marginTop: 5, width: "100%", height: "100%", position: "relative", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                {props.files.map((one) => {
                    if (one === props.files[0]) {
                        return <div key={one?.name}></div>;
                    } else {
                        return <PreviewPhotoItem target={one} key={one?.name} removeHandle={removeHandle} coverChange={coverChange}/>
                    }
                })}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "49%", border: "1px dashed", height: 390, borderColor: "black", marginLeft: 5, marginTop: 5 }}
                    onDragOver={(evt) => { evt.preventDefault(); evt.stopPropagation(); }}
                    onDrop={dropHandle}
                    onDragEnter={() => setDraging(true)}
                    onDragLeave={() => setDraging(false)}
                >
                    {draging ?
                        <Typography style={{ fontSize: 30 }}>
                            <a>추가</a>
                        </Typography>
                        :
                        <PermMediaIcon style={{ fontSize: 50 }} />
                    }
                </div>
            </Box>
        </Box>
    );
}

export default UploadPhotos;