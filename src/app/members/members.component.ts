import { Component, OnInit } from '@angular/core';
import { IMember } from '../models/member';
import { Router } from '@angular/router';
import { MembersService } from './members.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule, Validator } from '@angular/forms';
import { AdvanceSearchComponent } from '../shared/advance-search/advance-search.component';
import { SpinnerOverlayService } from '../shared/spinner-overlay/spinner-overlay.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})

export class MembersComponent implements OnInit {
  pageTitle = 'Members List';
  errorMessage = '';
  members: IMember[];
  filteredMembers: IMember[] = [];

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredMembers = this.listFilter ? this.performFilter(this.listFilter) : this.members;
  }

  constructor(private router: Router,
    private memberService: MembersService,
    public dialog: MatDialog,        
    private spinnerOverlayService: SpinnerOverlayService) {
    this.getMembers();
  }

  ngOnInit(): void {
    //this.getMembers();
  }

  getMembers() {
    this.spinnerOverlayService.show();
    this.memberService.getMembers().subscribe(
      response => {
        if (response.StatusCode == 100) {
          this.members = <IMember[]>response.Data;
          this.filteredMembers = this.members;
        }
        else {
          alert(console.log(response.Message));
          console.log(response.Data);
        }
        this.spinnerOverlayService.hide();
      },
      error =>{ 
        this.errorMessage = <any>error;
        this.spinnerOverlayService.hide();      
       });
  }

  performFilter(filterBy: string): IMember[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.members.filter((member: IMember) =>
      member.Name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onDelete(id: string) {
    if (window.confirm('Are sure you want to delete this member ?')) {
      this.memberService.deleteMember(id);
      var mem = this.filteredMembers.find(x => x._id == id);
      if (mem != null) {
        this.filteredMembers.splice(this.filteredMembers.indexOf(mem), 1);
      }
    }
  }

  openAdvancedSearch() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';

    let dialogRef = this.dialog.open(AdvanceSearchComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.memberService.advancedSearch(result).subscribe(
          response => {
            if (response.StatusCode == 100) {
              this.members = <IMember[]>response.Data;
              this.filteredMembers = this.members;
            }
            else {
              alert(console.log(response.Message));
              console.log(response.Data);
            }
          },
          error => this.errorMessage = <any>error);
      }
    });
  }
}