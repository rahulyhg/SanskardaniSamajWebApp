import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import {
  MatDatepickerModule,
  MatDialogModule,
  MatInputModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { MembersComponent } from './members/members.component';
import { MemberDetailsComponent } from './members/member-details.component';
import { WelcomeComponent } from './Home/welcome.component';
import { MemberEditComponent } from './members/member-edit.component';
import { FamilyinfoComponent } from './members/familyinfo/familyinfo.component';

@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    MemberDetailsComponent,
    WelcomeComponent,
    MemberEditComponent,
    FamilyinfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
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
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents:[FamilyinfoComponent]
})
export class AppModule { }
