export interface IMemberAddress {
    HouseNumber: string,
    Address: string,
    PIN: number,
    District: string,
    State: string,
    Country: string,
    Landmark: string
}

export class MemberAddress implements IMemberAddress {
    HouseNumber: string;
    Address: string;
    PIN: number;
    District: string;
    State: string;
    Country: string;
    Landmark: string;

    constructor() { }
}