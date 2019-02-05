import { Component, OnInit } from '@angular/core';
import { IMember } from './member';
import { Router, ActivatedRoute } from '@angular/router';
import { MembersService } from './members.service';
import { Event as NavigationEvent } from "@angular/router";

@Component({
templateUrl:'./member-details.component.html'
})

export class MemberDetailsComponent implements OnInit {

    pageTitle = 'Member Detail';
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
    const id = param;
    this.getMember(id);
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
}