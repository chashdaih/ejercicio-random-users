interface Name {
    title?: string;
    first?: string;
    last: string
}

interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
}

interface Street {
    number: number;
    name: string;
}

interface Location {
    country: string;
    street: Street;
    city: string;
}

interface Dob {
    age: number;
}

export interface User {
    id: number;
    email?: string;
    name: Name;
    picture: Picture;
    location: Location;
    phone: string;
    gender: string;
    nat: string;
    dob: Dob;
}