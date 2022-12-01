type Hostings = {
    _id: string;
    user: string;
    property: string;
    type: string;
    privacy: string;
    lat: number;
    lng: number;
    place: string;
    guest: number;
    bed: number;
    bathroom: number;
    firstMenu: [string];
    secondMenu: [string];
    thirdMenu: [string];
    imageUrl: [string];
    name: string;
    price: number;
    step: string;
    publishing: boolean;
};

export default Hostings;