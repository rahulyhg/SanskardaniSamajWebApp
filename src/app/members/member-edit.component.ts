import { Component, OnInit } from '@angular/core';
import { Member, IMember } from './member';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from './members.service';
import { Event as NavigationEvent } from "@angular/router";
import { MatDialog, MatDialogConfig } from '@angular/material';
import { isBoolean } from 'util';
import { FamilyinfoComponent } from './familyinfo/familyinfo.component';
import { FamilyInfo, IFamilyInfo } from './familyinfo';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule, Validator } from '@angular/forms';

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
  memberForm: FormGroup;
  submitted = false;
  genders = ['Male', 'Female'];

  constructor(public dialog: MatDialog, private route: ActivatedRoute,
    private router: Router,
    private memberService: MembersService,
    private formBuilder: FormBuilder) {
    router.events.subscribe(
      (event: NavigationEvent): void => {
        console.log(router.url);
      }
    );
  }

  ngOnInit(): void {
    this.member = new Member();
    this.memberForm = this.formBuilder.group({
      // name: ['', Validators.required],
      // fatherName:['', Validators.required]
    });

    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = param;
      this.getMember(id);
    }
    else {
      this.pageTitle = "Add Member"
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.memberForm.controls; }

  getMember(id: string) {
    this.memberService.getMember(id).subscribe(
      response => {
        if (response.StatusCode == 100) {
          this.member = <IMember>response.Data;
          this.familyMembers = this.member.FamilyInfo;
        }
        else {
          alert(console.log(response.Message));
          console.log(response.Data);
        }
      },
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/members']);
  }

  onSave() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.memberForm.invalid) {
      return;
    }

    this.member.FamilyInfo = this.familyMembers;

    if (this.member._id == undefined || this.member._id == "") {
      this.memberService.postMember(this.member).subscribe(
        response => {
          if (response.StatusCode == 100) {
            alert("date saved successfully.");
            this.router.navigate(['/members']);
          }
          else {
            alert(JSON.stringify(response));
          }
        },
        err2 => {
          if (err2.error) {
            alert(JSON.stringify(err2.error));
          }
          else {
            alert(JSON.stringify(err2));
          }
          console.log(err2);
          return false;
        });
    }
    else {
      this.result = this.memberService.putMember(this.member);
    }
  }

  openDialog(familyInfo: IFamilyInfo) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    if (familyInfo != null) {
      dialogConfig.data = familyInfo;
    }

    let dialogRef = this.dialog.open(FamilyinfoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result2 => {
      let result = result2 as FamilyInfo;
      if (result != null) {
        console.log("came to instanceof FamilyInfo : ");

        if (result._id == undefined) {

          if (this.familyMembers.length == 0) {
            result._id = "1";
          }
          else {

            var items = this.familyMembers.filter(t => t._id.length <= 2);
            if (items.length == 0) {
              result._id = "1";
            }
            else {
              items = items.sort((t1, t2) => {
                if (parseInt(t1._id) < parseInt(t2._id)) {
                  return 1;
                }
                else {
                  return -1;
                }
              });

              result._id = (parseInt(items[0]._id) + 1) + "";
            }
          }
          this.familyMembers.push(result);
        }
        else {
          if (result._id.length > 2) {
            result.IsEdited = true;
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

  deleteFamilyInfo(id: string) {
    var familyinfo = this.familyMembers.find(x => x._id == id);
    if (familyinfo != null) {
      if (familyinfo._id.toString().length > 2) {
        familyinfo.IsDeleted = true;
      }
      else {
        this.familyMembers.splice(this.familyMembers.indexOf(familyinfo), 1);
      }
    }
  }

  onGenderSelected(event) {
    console.log(event); //option value will be sent as event
    console.log(this.member.Gender);
  }
}
