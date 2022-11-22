import { Button } from "@mui/joy";
import { useRouter } from "next/router";

export default function Homes () {
    const router = useRouter();

    const hostingStart = () => {
        router.push("/become-a-host");
    };

    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <div style={{backgroundColor:"black", display:"flex", flexDirection:"row"}}>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <a>호스팅을 시작해보세요</a>
                    <Button style={{color:"white", backgroundColor:"pink"}} onClick={hostingStart}>
                        호스팅 시작하기
                    </Button>
                </div>

            </div>
        </div>
    )
}