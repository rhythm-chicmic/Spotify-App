import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './modules/auth/auth.module';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { AdminModule } from './modules/admin/admin.module';
import { SharedModule } from './modules/shared/shared.module';
import { SongListModule } from './modules/song-list/song-list.module';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { NgxSpinnerModule } from "ngx-spinner";
const firebaseApp = AngularFireModule.initializeApp(environment.firebase);
@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SongListModule,
    NgxSpinnerModule,
    SharedModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    DashboardModule,
    AdminModule,
    AuthModule,
    firebaseApp,
    BrowserAnimationsModule,
  ],
  providers: [ {
    provide: FIREBASE_OPTIONS,
    useValue: environment.firebase
  },],
  bootstrap: [AppComponent]
})
export class AppModule {

}
