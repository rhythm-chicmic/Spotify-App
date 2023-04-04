import { Injectable } from "@angular/core"
import { initializeApp } from "firebase/app"
import { AuthModule } from "src/app/modules/auth/auth.module"
@Injectable({providedIn:'any'})
export class Firebase{
  firebase= {
    apiKey: "AIzaSyBtMMMaVfjehZnIwN-HtgH7DCueCW48-R8",
    authDomain: "spotify-clone-c20c4.firebaseapp.com",
    databaseURL: "xxxxxxxxxxxxxxxxxxxxxxxx",
    projectId: "spotify-clone-c20c4",
    storageBucket: "spotify-clone-c20c4.appspot.com",
    messagingSenderId: "801151119175",
    appId: "1:801151119175:web:ead5575ec15d249518e662",
    measurementId: "G-TQFHNWD74H"
  }
  app = initializeApp(this.firebase)
}
 
 