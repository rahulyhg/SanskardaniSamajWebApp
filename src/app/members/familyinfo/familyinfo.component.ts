import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FamilyInfo, IFamilyInfo } from '../familyinfo';

@Component({
  selector: 'app-familyinfo',
  templateUrl: './familyinfo.component.html',
  styleUrls: ['./familyinfo.component.css']
})
export class FamilyinfoComponent implements OnInit {
  pageTitle: string;
  member: IFamilyInfo;

  constructor(
    public dialogRef: MatDialogRef<FamilyinfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(this.data);
     }

  ngOnInit() {
    
    if (this.data instanceof FamilyInfo) {
      this.member = this.data as FamilyInfo;
    }
    else {      
      this.member = new FamilyInfo();
      this.member.IsMarried = false;      
    }
  }

  add() {
    this.dialogRef.close(this.member);
  }

  close() {
    this.dialogRef.close();
  }
}
