import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/states/auth.state';
import { VideoState } from 'src/app/states/video.state';
import * as VideoActions from '../../../../../actions/video.action';
import * as AuthActions from '../../../../../actions/auth.action';
@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  isCurrent: number = 0;
  idToken$ = this.store.select(state => state.auth.idToken);
  author$ = this.store.select(state => state.auth.user);
  videoList$ = this.store.select(state => state.video.videoList);
  constructor(private store: Store<{video: VideoState ,auth: AuthState}>) { 
    this.idToken$.subscribe((token) => {
      if(token  && token != ""){
        this.store.dispatch(AuthActions.getUserInfo({idToken: token}));
        this.store.dispatch(VideoActions.getAllVideosForUser({idToken:token}));
      }
    })
  }

  ngOnInit(): void {
  }

  detectIsCurrent(number: number){
    this.isCurrent = number;
  }

  handleError(e: any) {
    // console.log(e);
    e.target.src = "../../../../../../../assets/images/user_crack.png";
  }
  
  playVideo(id: string) {
    // console.log(id);
    // this.router.navigate([`play/video/${id}`]);
    window.location.href = `./play/video/${id}`
  }
}
