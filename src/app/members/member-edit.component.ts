import { Component, OnInit } from '@angular/core';
import { Member } from './member';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from './members.service';
import { Event as NavigationEvent } from "@angular/router";
import { MatDialog, MatDialogConfig } from '@angular/material';
import { isBoolean } from 'util';
import { FamilyinfoComponent } from './familyinfo/familyinfo.component';
import { FamilyInfo, IFamilyInfo } from './familyinfo';
import { state } from '../models/state.enum';

@Component({
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  pageTitle = 'Edit Member';
  errorMessage = '';
  member: Member | undefined;
  familyMembers: IFamilyInfo[] = [];
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
      this.member.FamilyInfo = this.familyMembers;
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

  openDialog(familyInfo: IFamilyInfo) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    console.log(familyInfo);
    if (familyInfo != null) {
      dialogConfig.data = familyInfo;
    }

    let dialogRef = this.dialog.open(FamilyinfoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

      if (result instanceof FamilyInfo) {
        if ((result as IFamilyInfo)._id.toString().length > 2) {
          (result as IFamilyInfo).State = state.Modified;
        }
        else {
          if ((result as IFamilyInfo).State != state.Added) {
            if(this.familyMembers.length == 0)
            {
              (result as IFamilyInfo)._id = 1;
            }
            else
            {
              (result as IFamilyInfo)._id = this.familyMembers[this.familyMembers.length - 1]._id + 1;
            }
            
            (result as IFamilyInfo).State = state.Added;
            this.familyMembers.push(result as IFamilyInfo);
          }
        }
      }
    });
  }

  addFamilyInfo() {
    this.openDialog(null);
  }

  editFamilyInfo(familyInfo: IFamilyInfo) {
    this.openDialog(familyInfo);
  }

  deleteFamilyInfo(id: number) {
    var familyinfo = this.familyMembers.find(x => x._id == id);
    if (familyinfo != null) {
      if (familyinfo._id.toString().length > 2) {
        familyinfo.State = state.Deleted;
        familyinfo.IsDeleted =true;
      }
      else {
        this.familyMembers.splice(this.familyMembers.indexOf(familyinfo), 1);
      }
    }
  }
}
