import Layout from "../../components/layout"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import Reservation from "../../interface/reservation";
import TravelCard from "../../components/card/travelCard";
import { Typography } from "@mui/material";

export default function Trips() {
    const { data: session, status } = useSession();
    const [data, setData] = useState<Reservation[]>();

    useEffect(() => {
        if(session?.user?.email) {
            !async function () {
                const response = await fetch("/api/findByGuestIdReservation", {
                    method: "POST",
                    body: JSON.stringify({
                        guestId: session?.user?.email
                    }),
                    headers: {
                        "Content-type": "application/json"
                    }
                });
                const json = await response.json();
                setData(json.data);
            }()
        }
    }, [session]);

    return (
        <Layout>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", padding:50, width:"80%", maxWidth:1200, position:"relative", margin:"auto"}}>
                <Typography style={{fontSize:40, width:"100%"}}><b>여행</b><a style={{fontSize:25}}>({session?.user?.email?.split("@")[0]}님 예약현황)</a></Typography>
                { data && data.map((one) => <TravelCard key={one._id} data={one} />)}
            </div>
        </Layout>
    );
}