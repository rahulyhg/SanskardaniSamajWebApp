import {Component} from '@angular/core';
import { IMember } from './member';
import { Router } from '@angular/router';

@Component({
    selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})

export class MembersComponent{

    constructor(
        private router: Router) {
      }

    members: IMember[] = [
        {      
			"Name" : "Rahul Sonone",
			"FatherName": "Ashok Rao Sonone",
			"Gender": "Male",
			"DOB": "1989-05-11",
			"IsMarried": false,
			"MarriageDate": null,
			"ContactNo": 7795061002,
			"EmailId": "rsonone42@gmail.com",
			"Occupation": "Salaried Employee",
			"MembershipNumber": 10001110589,
			"IdentifierName": "",
			"IdentifierMembershipNumber": "",
			"MembershipAppliedDate": "20190124",
			"MembershipDate": "20190124",
			"MembershipAmount": 200,
			"ReceiptNumber": 1242
},
{      
    "Name" : "Rahul Sonone",
    "FatherName": "Ashok Rao Sonone",
    "Gender": "Male",
    "DOB": "1989-05-11",
    "IsMarried": false,
    "MarriageDate": null,
    "ContactNo": 7795061002,
    "EmailId": "rsonone42@gmail.com",
    "Occupation": "Salaried Employee",
    "MembershipNumber": 10001110589,
    "IdentifierName": "",
    "IdentifierMembershipNumber": "",
    "MembershipAppliedDate": "20190124",
    "MembershipDate": "20190124",
    "MembershipAmount": 200,
    "ReceiptNumber": 1242
}
    ];

    onViewCLick(): void {
        this.router.navigate(['/members',1]);
      }
}