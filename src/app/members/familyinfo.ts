export interface IFamilyInfo {
    _id: number,
    Name: string,
    IsMember: boolean,
    MembershipNumber: string,
    Relationship: string,
    DOB: string,
    Gender: string,
    IsDependent: boolean,
    Occupation: string,
    IsMarried: boolean,
}

export class FamilyInfo implements IFamilyInfo {
    _id: number;
    Name: string;
    IsMember: boolean;
    MembershipNumber: string;
    Relationship: string;
    DOB: string;
    Gender: string;
    IsDependent: boolean;
    Occupation: string;
    IsMarried: boolean;

    constructor() { }
} 