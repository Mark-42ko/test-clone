import { Modal, Box, Button, Typography } from "@mui/material";
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Fragment, useEffect, useState } from "react";

type Props = {
    setCalendarOpen: Function;
    calendarOpen: boolean;
    value: DateRange<any>;
    setValue: Function;
    startDate: Date;
    setStartDate: Function;
    endDate: Date;
    setEndDate: Function;
}

export default function Calendar(props: Props) {
    
    const sdate = props.startDate.toLocaleString("ko-kr").split(".");
    const edate = props.endDate.toLocaleString("ko-kr").split(".");

    useEffect(()=>{
        if(props.value[0] !== null && props.value[1] !== null){
            props.setStartDate(props.value[0].$d);
            props.setEndDate(props.value[1].$d);
        }
    },[props.value]);

    const closeButton = () => {
        props.setCalendarOpen(false);
    };

    return (
        <Modal
            open={props.calendarOpen}
            onClose={() => props.setCalendarOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Box sx={{ display: "flex", backgroundColor: "white", flexDirection: "column", borderRadius: 2, padding: 3 }}>
                <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <Typography style={{ fontSize: 30 }}>{Math.ceil((props.endDate.getTime() - props.startDate.getTime())/(24*60*60*1000))}박</Typography>
                        <Typography style={{ fontSize: 15 }}>{sdate[0]}년 {sdate[1]}월 {sdate[2]}일 ~ {edate[0]}년 {edate[1]}월 {edate[2]}일</Typography>
                    </div>
                    <div style={{display:"flex", flexDirection:"row", border:"1px solid", borderRadius:5, height:52}}>
                        <Button onClick={() => props.setCalendarOpen(true)} style={{ display: "flex", flexDirection: "row", width: "100%", color: "black", height: "100%" }}>
                            <div style={{ display: "flex", flexDirection: "column", width: 120, height: 50, padding: 8, alignItems: "start" }}>
                                <Typography style={{ fontSize: 8 }}>체크인</Typography>
                                <Typography style={{ fontSize: 14 }}>{sdate[0]}. {sdate[1]}. {sdate[2]}.</Typography>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", width: 120, borderLeft: "1px solid", padding: 8, alignItems: "start" }}>
                                <Typography style={{ fontSize: 8 }}>체크아웃</Typography>
                                <Typography style={{ fontSize: 14 }}>{edate[0]}. {edate[1]}. {edate[2]}.</Typography>
                            </div>
                        </Button>
                    </div>
                </div>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateRangePicker
                            displayStaticWrapperAs="desktop"
                            value={props.value}
                            minDate={new Date()}
                            onChange={(newValue:any) => {
                                props.setValue(newValue)
                            }}
                            renderInput={(startProps, endProps) => (
                                <Fragment>
                                    <TextField {...startProps} />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField {...endProps} />
                                </Fragment>
                            )}
                        />
                    </LocalizationProvider>
                </div>
                <Button onClick={closeButton} style={{backgroundColor:"black", color:"white", width:"10%"}}>닫기</Button>
            </Box>
        </Modal>
    )
}