import * as React from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import Propeties from '../interface/propeties';
import { useSession } from 'next-auth/react';

type Props = {
    target: Propeties | undefined;
    property: string | undefined;
    privacy: string | undefined;
    place: string | undefined;
    lat: number | undefined;
    lng: number | undefined;
    guestCount: number | undefined;
    bedCount: number | undefined;
    bathroomCount: number | undefined;
    firstMenu: Array<string | undefined> | undefined;
    secondMenu: Array<string | undefined> | undefined;
    thirdMenu: Array<string | undefined> | undefined;
    files: File[] | undefined;
    text: string | undefined;
    price: number | undefined;
};

export default function ProgressMobileStepper(props: Props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const router = useRouter();
    const { data: session, status } = useSession();
    const [idUrl, setIdUrl] = React.useState<string>("");

    React.useEffect(() => {
        setIdUrl(router.query._id as string);
        if (router.pathname === "/become-a-host/property-type-group") {
            setActiveStep(0);
        } else if (router.pathname === "/become-a-host/[_id]/property-type") {
            setActiveStep(1);
        } else if (router.pathname === "/become-a-host/[_id]/privacy-type") {
            setActiveStep(2);
        } else if (router.pathname === "/become-a-host/[_id]/location") {
            setActiveStep(3);
        } else if (router.pathname === "/become-a-host/[_id]/floor-plan") {
            setActiveStep(4);
        } else if (router.pathname === "/become-a-host/[_id]/amenities") {
            setActiveStep(5);
        } else if (router.pathname === "/become-a-host/[_id]/photos") {
            setActiveStep(6);
        } else if (router.pathname === "/become-a-host/[_id]/title") {
            setActiveStep(7);
        } else if (router.pathname === "/become-a-host/[_id]/price") {
            setActiveStep(8);
        } else if (router.pathname === "/become-a-host/[_id]/receipt") {
            setActiveStep(9);
        }
    }, [])

    const handleNext = async () => {
        if (router.pathname === "/become-a-host/[_id]/property-type-group") {
            await fetch("/api/hosting/hostingGroup", {
                method: "POST",
                body: JSON.stringify({
                    _id: router.query._id,
                    property: props.target!.group,
                    step: `/become-a-host/${idUrl}/property-type-group`
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            router.push(`/become-a-host/${idUrl}/property-type`);
        } else if (router.pathname === "/become-a-host/[_id]/property-type") {
            console.log("sdafasfasdf")
            await fetch("/api/hosting/property", {
                method: "POST",
                body: JSON.stringify({
                    _id: idUrl,
                    property: props.property,
                    step: `/become-a-host/${idUrl}/property-type`
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            router.push(`/become-a-host/${idUrl}/privacy-type`)
        } else if (router.pathname === "/become-a-host/[_id]/privacy-type") {
            await fetch("/api/hosting/privacy", {
                method: "POST",
                body: JSON.stringify({
                    _id: idUrl,
                    privacy: props.privacy,
                    step: `/become-a-host/${idUrl}/privacy-type`
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            router.push(`/become-a-host/${idUrl}/location`);
        } else if (router.pathname === "/become-a-host/[_id]/location") {
            await fetch("/api/hosting/location", {
                method: "POST",
                body: JSON.stringify({
                    _id: idUrl,
                    place: props.place,
                    lat: props.lat,
                    lng: props.lng,
                    step: `/become-a-host/${idUrl}/location`
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            router.push(`/become-a-host/${idUrl}/floor-plan`);
        } else if (router.pathname === "/become-a-host/[_id]/floor-plan") {
            await fetch("/api/hosting/floorPlan", {
                method: "POST",
                body: JSON.stringify({
                    _id: idUrl,
                    guest: props.guestCount,
                    bed: props.bedCount,
                    bathroom: props.bathroomCount,
                    step: `/become-a-host/${idUrl}/floor-plan`
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            router.push(`/become-a-host/${idUrl}/amenities`);
        } else if (router.pathname === "/become-a-host/[_id]/amenities") {
            await fetch("/api/hosting/amenities", {
                method: "POST",
                body: JSON.stringify({
                    _id: idUrl,
                    firstMenu: props.firstMenu,
                    secondMenu: props.secondMenu,
                    thirdMenu: props.thirdMenu,
                    step: `/become-a-host/${idUrl}/amenities`
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            router.push(`/become-a-host/${idUrl}/photos`);
        } else if (router.pathname === "/become-a-host/[_id]/photos") {
            const formData = new FormData();
            formData.append("itemId", idUrl);
            props.files!.forEach((one) => {
                formData.append("photos", one);
                formData.append("user", idUrl as string);
                formData.append("url", `/become-a-host/${idUrl}/photos`);
            });
            const response = await fetch("/api/hosting/photos", {
                method: "POST",
                body: formData
            });
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            router.push(`/become-a-host/${idUrl}/title`)
        } else if (router.pathname === "/become-a-host/[_id]/title") {
            await fetch("/api/hosting/title", {
                method: "POST",
                body: JSON.stringify({
                    _id: idUrl,
                    name: props.text,
                    step: `/become-a-host/${idUrl}/title`
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            router.push(`/become-a-host/${idUrl}/price`);
        } else if (router.pathname === "/become-a-host/[_id]/price") {
            await fetch("/api/hosting/price", {
                method: "POST",
                body: JSON.stringify({
                    _id: idUrl,
                    price: props.price,
                    step:`/become-a-host/${idUrl}/price`
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            router.push(`/become-a-host/${idUrl}/receipt`);
        } else if (router.pathname === "/become-a-host/[_id]/receipt") {
            await fetch("/api/hosting/pub", {
                method: "POST",
                body: JSON.stringify({
                    _id: idUrl,
                    publishing: true,
                    step:`/become-a-host/${idUrl}/receipt`
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            router.push(`/become-a-host/${idUrl}/completion`);
        }
    };

    const handleBack = () => {
        if (router.pathname === "/become-a-host/[_id]/property-type") {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
            router.push("/become-a-host/property-type-group");
        } else if (router.pathname === "/become-a-host/[_id]/privacy-type") {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
            router.push(`/become-a-host/${idUrl}/property-type`)
        } else if (router.pathname === "/become-a-host/[_id]/location") {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
            router.push(`/become-a-host/${idUrl}/privacy-type`);
        } else if (router.pathname === "/become-a-host/[_id]/floor-plan") {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
            router.push(`/become-a-host/${idUrl}/location`);
        } else if (router.pathname === "/become-a-host/[_id]/amenities") {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
            router.push(`/become-a-host/${idUrl}/floor-plan`);
        } else if (router.pathname === "/become-a-host/[_id]/photos") {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
            router.push(`/become-a-host/${idUrl}/amenities`);
        } else if (router.pathname === "/become-a-host/[_id]/title") {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
            router.push(`/become-a-host/${idUrl}/photos`);
        } else if (router.pathname === "/become-a-host/[_id]/price") {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
            router.push(`/become-a-host/${idUrl}/title`);
        } else if (router.pathname === "/become-a-host/[_id]/receipt") {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
            router.push(`/become-a-host/${idUrl}/price`);
        }
    };

    return (
        <MobileStepper
            variant="progress"
            steps={10}
            position="static"
            activeStep={activeStep}
            sx={{ maxWidth: "100%", flexGrow: 1, margin: 5 }}
            nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === 11} style={{ fontSize: 20 }}>
                    다음
                </Button>
            }
            backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0} style={{ fontSize: 15 }}>
                    뒤로
                </Button>
            }
        />
    );
}