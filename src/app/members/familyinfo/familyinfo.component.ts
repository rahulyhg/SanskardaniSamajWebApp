import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FamilyInfo } from '../familyinfo';

@Component({
  selector: 'app-familyinfo',
  templateUrl: './familyinfo.component.html',
  styleUrls: ['./familyinfo.component.css']
})
export class FamilyinfoComponent implements OnInit {

  member:FamilyInfo |undefined;

  constructor(
    public dialogRef: MatDialogRef<FamilyinfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.member = new FamilyInfo();
  }

  Add() {
    this.dialogRef.close(this.member);
}

close() {
    this.dialogRef.close();
}
}
