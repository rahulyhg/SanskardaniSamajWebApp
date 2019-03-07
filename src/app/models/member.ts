//import { Address } from 'cluster';
import { IMemberAddress, MemberAddress } from './memberaddress';
import { FamilyInfo, IFamilyInfo } from './familyinfo';
import {formatDate } from '@angular/common';

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
    MembershipAppliedDate: string;
    MembershipDate: string;
    MembershipAmount: number;
    ReceiptNumber: number;
    Address: IMemberAddress;
    FamilyInfo : FamilyInfo[];

    constructor() {
        this.Address = new MemberAddress();
        this.Address.Country = "India";
        this.Address.State = "Madhya Pradesh";
        this.Address.District = "Jabalpur";
     }

}