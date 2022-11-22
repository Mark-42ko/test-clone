import { Button } from "@mui/joy";
import { useRouter } from "next/router";

export default function Home () {
    const router = useRouter();

    const startButton = () => {
        router.push("become-a-host/property-type-group");
    };

    return (
        <div>
            <h2>ddfe</h2>
            <Button style={{color:"white", backgroundColor:"pink"}} onClick={startButton}>시작하기</Button>
        </div>
    )
}