//import { Address } from 'cluster';
import { IMemberAddress, MemberAddress } from './memberaddress';

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
    ContactNo: number,
    MembershipNumber: number,
    IdentifierName: string,
    IdentifierMembershipNumber: string,
    MembershipAppliedDate: string,
    MembershipDate: string,
    MembershipAmount: number,
    ReceiptNumber: number,
    Address?: object | IMemberAddress,
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
    ContactNo: number;
    MembershipNumber: number;
    IdentifierName: string;
    IdentifierMembershipNumber: string;
    MembershipAppliedDate: string;
    MembershipDate: string;
    MembershipAmount: number;
    ReceiptNumber: number;
    Address?: object | IMemberAddress;

    constructor() {
        this.Address = new MemberAddress();
     }

}