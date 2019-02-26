import { state } from '../models/state.enum';

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
    IsDeleted:boolean
}

export class FamilyInfo implements IFamilyInfo {
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
     }
} 