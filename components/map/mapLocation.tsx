import { Wrapper } from "@googlemaps/react-wrapper";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

type Props = {
    mapData: any;
    setTotalLat: Function;
    setTotalLng: Function;
}

function MapComponent(props: Props) {
    const ref = useRef<HTMLElement>();
    let map: google.maps.Map;
    
    useEffect(() => {
        map = new window.google.maps.Map(ref.current!, {
            center: { lat: props.mapData.result.geometry.location.lat, lng: props.mapData.result.geometry.location.lng },
            zoom: 17,
            zoomControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false
        });
        props.setTotalLat(props.mapData.result.geometry.location.lat);
        props.setTotalLng(props.mapData.result.geometry.location.lng);
        map.addListener("center_changed", ()=> {
            const center = map.getCenter();
            props.setTotalLat(center?.lat());
            props.setTotalLng(center?.lng());
            console.log(center?.lat(), center?.lng());
        });
    }, []);
    return (
        <Box ref={ref} sx={{ height: "100vh" }}>
        </Box>
    )
}

export default function MapLocation(props: Props) {
    const mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string;

    return (
        <Wrapper apiKey={mapKey}>
            <MapComponent mapData={props.mapData} setTotalLat={props.setTotalLat} setTotalLng={props.setTotalLng}/>
        </Wrapper>
    )
}