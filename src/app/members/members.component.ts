import { Component, OnInit } from '@angular/core';
import { IMember } from './member';
import { Router } from '@angular/router';
import { MembersService } from './members.service';

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
    private memberService: MembersService) {
    this.getMembers();
  }

  ngOnInit(): void {
    //this.getMembers();
  }

  getMembers() {
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
      },
      error => this.errorMessage = <any>error);
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
}