import {Component, OnInit} from '@angular/core';
import { IMember } from './member';
import { Router } from '@angular/router';
import { MembersService } from './members.service';

@Component({
    selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})

export class MembersComponent implements OnInit{
    errorMessage = '';
    members: IMember[];
    ngOnInit(): void {
        this.getMembers();
    }

    constructor(private router: Router,
        private memberService: MembersService) {
      }

      getMembers() {
        this.memberService.getMembers().subscribe(
            members => this.members = members,
          error => this.errorMessage = <any>error);
      }

    onViewCLick(): void {
        this.router.navigate(['/members',1]);
      }
}