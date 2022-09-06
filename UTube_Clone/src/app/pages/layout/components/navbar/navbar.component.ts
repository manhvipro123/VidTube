import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { onAuthStateChanged, Auth, getAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { InteractService } from 'src/app/services/interact.service';
import { AuthState } from 'src/app/states/auth.state';
import * as AuthActions from '../../../../actions/auth.action'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  isShown: boolean = false; // hidden by default
  displayName: string | null = "";
  photoURL: string | null = "";
  token?: string = "";
  idToken$ = this.store.select((state) => state.auth.idToken)
  constructor(
    private interactService: InteractService,
    private auth: Auth,
    private authService: AuthService,
    private httpService: HttpService,
    private store: Store<{ auth: AuthState }>
  ) {

  

    //check user is still exsist when u reload the page or turn back to the page 
    // this.authService.isUserLoggedIn
    //   .subscribe(async value => {
    //     if (value) {
    //       let user = getAuth().currentUser;
    //       this.displayName = user!.displayName != null ? user!.displayName : user!.email;
    //       this.photoURL = user!.photoURL != null ? user!.photoURL : user!.photoURL;
    //     }
    //     else {
    //       this.displayName = "";
    //       this.photoURL = "";
    //     }
    //   })
  }

  ngOnInit(): void {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.idToken$.subscribe((value) => {
          if(value){
            this.token = value;
            // this.token = await user!.getIdToken(true);
            // this.httpService.getAllUser(this.token).subscribe((data) => {
            //   console.log(data)
            // })
            this.httpService.createUser(this.token).subscribe((newUser) => {
              if(newUser == null){
                console.log('user is already created !!!');
              }else{
                console.log(newUser);
              }
            });
          }
        })  
        // console.log(this.token);
        this.displayName = user.displayName != null ? user.displayName : user.email;
        this.photoURL = user.photoURL != null ? user.photoURL : user.photoURL;
      } else {
        this.displayName = "";
        this.photoURL = "";
      }
    });
  }

  login() {
    this.store.dispatch(AuthActions.login());
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.isShown = !this.isShown;
  }
  turnMenu() {
    this.interactService.turnMenu();
  }
  toggleShow() {
    this.isShown = !this.isShown;
    // console.log(this.isShown)
  }
  clickedOutside(): void {
    this.isShown = false;
  }
  handleError(e: any) {
    console.log(e);
    e.target.src = "../../../../../../../assets/images/user_crack.png";
  }

}
