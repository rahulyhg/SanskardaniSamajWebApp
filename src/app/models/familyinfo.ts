export interface IFamilyInfo {
    _id: string,
    Name: string,
    IsMember: boolean,
    MembershipNumber: string,
    Relationship: string,
    DOB: string,
    Gender: string,
    IsDependent: boolean,
    Occupation: string,
    IsMarried: boolean,
    IsEdited: boolean,
    IsDeleted:boolean,
    IsOtherRelationship:boolean,
    OtherRelationship:string
}

export class FamilyInfo implements IFamilyInfo {
    IsOtherRelationship: boolean;
    OtherRelationship: string;
    IsDeleted: boolean;
    IsEdited: boolean;
    _id: string;
    Name: string;
    IsMember: boolean;
    MembershipNumber: string;
    Relationship: string;
    DOB: string;
    Gender: string;
    IsDependent: boolean;
    Occupation: string;
    IsMarried: boolean;

    constructor() {
        this.IsDeleted = false;
        this.IsEdited = false;
        this.IsOtherRelationship = false;
     }
} 