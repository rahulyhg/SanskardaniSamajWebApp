import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SearchCriteria } from 'src/app/models/SearchCriteria';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css']
})
export class AdvanceSearchComponent implements OnInit {

  searchCreiteria: SearchCriteria;
  amtError:string;
  dobError:string;
  nameError:string;

  constructor(public dialogRef: MatDialogRef<AdvanceSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
    console.log(this.data);
    }

  ngOnInit() {
    this.searchCreiteria = new SearchCriteria();
  }

  applySearch() {
    this.amtError="";
    this.dobError="";
    this.nameError="";

    if(this.searchCreiteria.IsAmountRange)
    {
      this.amtError= this.amountValidation();
    }

    if(this.searchCreiteria.IsName){
this.nameError = this.searchCreiteria.Name.length==0?"Please provide a valid name.":"";
    }

    if(this.searchCreiteria.IsDOBRange)
    {
this.dobError=this.dobValidation();
    }

    if (this.amtError.length > 0 || this.dobError.length > 0 || this.nameError.length > 0) {
      return;
    }
    this.dialogRef.close(this.searchCreiteria);
  }

  close() {
    this.dialogRef.close();
  }

  amountValidation(): string {
    if (this.searchCreiteria.AmountFrom > this.searchCreiteria.AmountTo)
      return "'Max should be greater than 'Min'.";
    return "";
  }

  dobValidation(): string {
    if (this.searchCreiteria.StartDOB == undefined || this.searchCreiteria.EndDOB == undefined) {
      return "Please provide 'Min' and 'Max' DOB.";
    }
    return "";
  }
}
