import { state } from '../models/state.enum';

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
    State:state,
    IsDeleted:boolean
}

export class FamilyInfo implements IFamilyInfo {
    IsDeleted: boolean;
    State: state;
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

    constructor() {
     }
} 