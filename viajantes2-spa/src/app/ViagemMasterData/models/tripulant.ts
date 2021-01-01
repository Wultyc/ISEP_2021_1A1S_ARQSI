import { TripulantType } from "../../RedeMasterData/models/tripulant-type";

export class Tripulant {
    id: string;  
    name: string;
    birthDate: Date;
    licenceNumber: string;
    licenseExpires: Date;
    tripulantTypes: string[];
}

export class TripulantPost {
    Name: string;
    BirthDate: Date;
    LicenceNr: string;
    LicenceExpires: Date;
    TripulantTypes: string[];
}

export class TripulantFilled {
    id: string;  
    name: string;
    birthDate: Date;
    licenceNumber: string;
    licenseExpires: Date;
    tripulantTypes: TripulantType[];
}