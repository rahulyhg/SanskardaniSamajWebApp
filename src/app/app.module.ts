import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MembersComponent } from './members/members.component';
import { MemberDetailsComponent } from './members/member-details.component';
import { WelcomeComponent } from './Home/welcome.component';
import { MemberEditComponent } from './members/member-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    MemberDetailsComponent,
    WelcomeComponent,
    MemberEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([      
      { path: 'members', component: MembersComponent },
      { path: 'members/edit', component: MemberEditComponent },   
      { path: 'members/:id', component: MemberDetailsComponent },       
      { path: 'members/view/:id', component: MemberDetailsComponent },      
      { path: 'members/edit/:id', component: MemberEditComponent },      
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
