import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MembersComponent } from './members/members.component';
import { MemberDetailsComponent } from './members/member-details.component';
import { WelcomeComponent } from './Home/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    MemberDetailsComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([      
      { path: 'members', component: MembersComponent },
      { path: 'members/:id', component: MemberDetailsComponent },
      { path: 'members/edit/:id', component: MemberDetailsComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
