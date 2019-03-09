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

  constructor(public dialogRef: MatDialogRef<AdvanceSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
    console.log(this.data);
    }

  ngOnInit() {
    this.searchCreiteria = new SearchCriteria();
  }

  applySearch() {
    this.dialogRef.close(this.searchCreiteria);
  }

  close() {
    this.dialogRef.close();
  }
}
