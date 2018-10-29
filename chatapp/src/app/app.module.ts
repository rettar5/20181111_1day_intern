import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatListModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule, MatRadioModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { firebaseConfig } from '../environments/firebase.config';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { BaseComponent } from './components/base/base.component';
import { LoginUserProfileComponent } from './components/login-user-profile/login-user-profile.component';
import { MessageInputComponent } from './components/message-input/message-input.component';
import { GroupsComponent, GroupRegisterDialogComponent } from './components/groups/groups.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MessageCellComponent } from './components/message-cell/message-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    BaseComponent,
    LoginUserProfileComponent,
    MessageInputComponent,
    GroupsComponent,
    GroupRegisterDialogComponent,
    TimelineComponent,
    MessageCellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    // Angular Fire
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    // Angular Material
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    GroupRegisterDialogComponent,
  ]
})
export class AppModule { }
