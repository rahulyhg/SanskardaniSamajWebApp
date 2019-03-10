import { Component, OnInit } from '@angular/core';
import { IMember } from '../models/member';
import { Router, ActivatedRoute } from '@angular/router';
import { MembersService } from './members.service';
import { Event as NavigationEvent } from "@angular/router";
import { SpinnerOverlayService } from '../shared/spinner-overlay/spinner-overlay.service';

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
    private memberService: MembersService,    
    private spinnerOverlayService: SpinnerOverlayService) {
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
    this.spinnerOverlayService.show();
    this.memberService.getMember(id).subscribe(
      response => {
        this.spinnerOverlayService.hide();
        if (response.StatusCode == 100) {
          this.member = <IMember>response.Data;
        }
        else {
          alert(console.log(response.Message));
          console.log(response.Data);
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.spinnerOverlayService.hide();
      });
  }

  onBack(): void {
    this.router.navigate(['/members']);
  }
}