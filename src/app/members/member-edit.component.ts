import { Component, OnInit } from '@angular/core';
import { IMember } from './member';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from './members.service';
import { Event as NavigationEvent } from "@angular/router";

@Component({
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  pageTitle = 'Member Edit View';
  errorMessage = '';
  member: IMember | undefined;
  editMode: boolean = true;

constructor(private route: ActivatedRoute,
  private router: Router,
  private memberService: MembersService) {
      router.events.subscribe(
          ( event: NavigationEvent ) : void => {

             console.log(router.url);

          }
      );
      //console.log(this.route.snapshot.paramMap.get('id'));
}

ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
if (param) {
  const id = +param;
  this.getMember(id);
  }
}

getMember(id: number) {
  this.memberService.getMember(id).subscribe(
     member => this.member = member,
     error => this.errorMessage = <any>error);
}

onBack(): void {
  this.router.navigate(['/members']);
}
}
