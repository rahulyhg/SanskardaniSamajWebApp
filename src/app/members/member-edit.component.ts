import { Component, OnInit } from '@angular/core';
import { Member } from './member';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from './members.service';
import { Event as NavigationEvent } from "@angular/router";
import { MatDialog, MatDialogConfig } from '@angular/material';
import { isBoolean } from 'util';
import { FamilyinfoComponent } from './familyinfo/familyinfo.component';
import { FamilyInfo } from './familyinfo';

@Component({
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  pageTitle = 'Edit Member';
  errorMessage = '';
  member: Member | undefined;
  familyMembers:FamilyInfo[] | undefined;
  result: boolean = true;

  constructor(public dialog: MatDialog, private route: ActivatedRoute,
    private router: Router,
    private memberService: MembersService) {
    router.events.subscribe(
      (event: NavigationEvent): void => {
        console.log(router.url);
      }
    );
  }

  ngOnInit(): void {
    this.member = new Member();
    this.familyMembers = new Array();
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = param;
      this.getMember(id);
    }
    else {
      this.pageTitle = "Add Member"
    }
  }

  getMember(id: string) {
    this.memberService.getMember(id).subscribe(
      member => this.member = member,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/members']);
  }

  onSave() {

    if (this.member._id == undefined || this.member._id == "") {
      this.result = this.memberService.postMember(this.member);
    }
    else {
      this.result = this.memberService.putMember(this.member);
    }
    if (this.result) {
      //alert("Save Successfully!");
    }
    else {
      //alert("Save failed!");
    }
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';

    let dialogRef = this.dialog.open(FamilyinfoComponent,dialogConfig);
     
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      //this.dialogResult = result;
    });
  }
}
