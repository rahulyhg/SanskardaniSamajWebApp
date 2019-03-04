import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FamilyInfo, IFamilyInfo } from '../familyinfo';
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
    this.dialogRef.close(this.familyInfo);
  }

  close() {
    this.dialogRef.close();
  }

  onGenderSelected(event){
    console.log(event); //option value will be sent as event
    console.log(this.familyInfo.Gender);
   }
}
