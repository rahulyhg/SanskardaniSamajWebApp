//import { Address } from 'cluster';
import { IMemberAddress, MemberAddress } from './memberaddress';
import { FamilyInfo, IFamilyInfo } from './familyinfo';


export interface IMember {
    _id: string,
    Name: string,
    FatherName: string,
    Gender: string,
    DOB: string,
    IsMarried: boolean,
    MarriageDate: string,
    EmailId: string,
    Occupation: string,
    ContactNo: string,
    MembershipNumber: number,
    IdentifierName: string,
    IdentifierMembershipNumber: string,
    MembershipAppliedDate: string,
    MembershipDate: string,
    MembershipAmount: number,
    ReceiptNumber: number,
    Address: IMemberAddress,
    FamilyInfo : IFamilyInfo[],
}

export class Member implements IMember {
    _id: string;
    Name: string;
    FatherName: string;
    Gender: string;
    DOB: string;
    IsMarried: boolean;
    MarriageDate: string;
    EmailId: string;
    Occupation: string;
    ContactNo: string;
    MembershipNumber: number;
    IdentifierName: string;
    IdentifierMembershipNumber: string;
    MembershipAppliedDate: string;
    MembershipDate: string;
    MembershipAmount: number;
    ReceiptNumber: number;
    Address: IMemberAddress;
    FamilyInfo : FamilyInfo[];

    constructor() {
        this.Address = new MemberAddress();
     }

}