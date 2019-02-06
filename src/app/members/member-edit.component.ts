import { Component, OnInit } from '@angular/core';
import { Member } from './member';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from './members.service';
import { Event as NavigationEvent } from "@angular/router";
import { isBoolean } from 'util';

@Component({
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  pageTitle = 'Member Edit View';
  errorMessage = '';
  member: Member | undefined;
  result: boolean = true;

  constructor(private route: ActivatedRoute,
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
    else
    {
      this.pageTitle ="Add Member View"
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

    if(this.member._id == undefined || this.member._id == "")
    {
      this.result = this.memberService.postMember(this.member);
    }
    else
    {
      this.result = this.memberService.putMember(this.member);
    }
    if(this.result)
    {
      //alert("Save Successfully!");
    }
    else
    {
     //alert("Save failed!");
    }
  }
}
