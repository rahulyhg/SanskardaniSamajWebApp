import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FamilyInfo, IFamilyInfo } from '../../models/familyinfo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-familyinfo',
  templateUrl: './familyinfo.component.html',
  styleUrls: ['./familyinfo.component.css']
})
export class FamilyinfoComponent implements OnInit {
  pageTitle: string;
  familyInfo: IFamilyInfo;
  familyForm: FormGroup;
  submitted = false;
  genders = ['Male', 'Female'];
  relationships = ['Father', 'Mother', 'Brother', 'Sister', 'Wife', 'Husband', 'Others'];

  constructor(
    public dialogRef: MatDialogRef<FamilyinfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
    console.log(this.data);
  }

  ngOnInit() {
    this.pageTitle = "Family Info";
    if (this.data != null) {
      this.familyInfo = this.data as FamilyInfo;
      var saveRelationShip =this.familyInfo.Relationship;
      var relationship = this.relationships.filter(function (data) {
        return data == saveRelationShip
    });
    if (relationship.length == 0) {
      this.familyInfo.OtherRelationship = this.familyInfo.Relationship;
      this.familyInfo.IsOtherRelationship =true;
      this.familyInfo.Relationship = "Others";
    }
  }
    else {
      this.familyInfo = new FamilyInfo();
      this.familyInfo.IsMarried = false;
    }

    this.familyForm = this.formBuilder.group({
      // name: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.familyForm.controls; }


  add() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.familyForm.invalid) {
      console.log(this.familyForm.errors);
      console.log(this.familyForm);
      return;
    }

    if (this.familyInfo.IsOtherRelationship == true) {
      console.log(this.familyInfo.IsOtherRelationship);
      this.familyInfo.Relationship = this.familyInfo.OtherRelationship;
    }

    this.dialogRef.close(this.familyInfo);
  }

  close() {
    this.dialogRef.close();
  }

  onGenderSelected(event) {
    console.log(event); //option value will be sent as event
    console.log(this.familyInfo.Gender);
  }

  onRelationSelected(event) {
    console.log(event); //option value will be sent as event
    if (event == "Others") {
      this.familyInfo.IsOtherRelationship = true;
    }
    else {
      this.familyInfo.IsOtherRelationship = false;
      this.familyInfo.OtherRelationship = "";
    }
  }
}
