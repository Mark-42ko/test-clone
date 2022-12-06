import { Wrapper } from "@googlemaps/react-wrapper";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

type Props = {
    lat: number;
    lng: number;
}



function MapComponent(props: Props) {
    const ref = useRef<HTMLElement>();
    let map: google.maps.Map;

    useEffect(() => {
        map = new window.google.maps.Map(ref.current!, {
            center: { lat: props.lat, lng: props.lng },
            zoom: 17,
            zoomControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false
        });
        map.addListener("center_changed", () => {
            const center = map.getCenter();
        });
        const marker = new google.maps.Marker({
            position: {
                lat: props.lat,
                lng: props.lng
            },
            map:map
        });
    }, []);
    return (
        <Box ref={ref} sx={{ height: 400 }}>
            
        </Box>
    )
}

export default function MapHostingIndex(props: Props) {
    const mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string;

    return (
        <Wrapper apiKey={mapKey}>
            
            <MapComponent lat={props.lat} lng={props.lng} />
        </Wrapper>
    )
}
