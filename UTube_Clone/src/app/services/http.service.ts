import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment.model';
import { Suggestion } from '../models/suggestion.model';
import { User } from '../models/user.model';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  //-------------------------------------------Usser-----------------------------------------------------------------------------///

  public createUser(idToken: string) {
    // const headers = new HttpHeaders({'Authorization': `${idToken}`});
    // // const headers = new HttpHeaders().set('Authorization', idToken)
    // console.log(headers.keys());

    return this.http.post('https://server.firev.manhvipro.xyz/user', '', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  public getAllUser(idToken: string) {
    console.log('hi')
    return this.http.get('https://server.firev.manhvipro.xyz/user', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  public getUserId(idToken: string) {
    return this.http.get<string>('https://server.firev.manhvipro.xyz/user/id', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  public getUserInfo(idToken: string) {
    return this.http.get<User>('https://server.firev.manhvipro.xyz/user/info', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  public subscribeUser(idToken: string, _id: string) {
    return this.http.put<User>('https://server.firev.manhvipro.xyz/user/subscribe/' + `${_id}`, '', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  public unsubscribeUser(idToken: string, _id: string) {
    return this.http.put<User>('https://server.firev.manhvipro.xyz/user/unsubscribe/' + `${_id}`, '', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  sendUidForm(idToken:string,uidForm: any){
    return this.http.post('https://server.firev.manhvipro.xyz/cloud/save',uidForm,{ headers: new HttpHeaders({ 'Authorization': `${idToken}` }) })
  }

  //-------------------------------------------Video----------------------------------------------------------------///
  public addThumb(idToken: string, thumbForm: any) {
    return new Promise<Object | null>((resolve, reject) => {
      try {
        this.http.post('https://server.firev.manhvipro.xyz/video/upload/thumb', thumbForm, { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) }).subscribe((value: any) => {
          // console.log(value.path)
          resolve(value.path);
        })
      } catch (err) {
        reject(err)
      }

    })
  }

  //bản streamableFile
  public addVideo(idToken: string, videoForm: any) {
    return new Promise<Object | null>((resolve, reject) => {
      try {
        this.http.post('https://server.firev.manhvipro.xyz/video/upload/vid', videoForm, { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) }).subscribe((value: any) => {
          // console.log(value.path);
          resolve(value.path);
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  //bản HLSSSSSSS
  public uploadVideo(idToken: string, videoForm: any, video_id: string): Observable<any> {
    return this.http.post('https://server.firev.manhvipro.xyz/media/' + `${video_id}`, videoForm, { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) })
  }

  public createVideoInfo(idToken: string, infoForm: any) {
    return this.http.post<Video>('https://server.firev.manhvipro.xyz/video', infoForm, { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  getAllVideos() {
    return this.http.get<Video[]>('https://server.firev.manhvipro.xyz/video/all');
  }

  getAllVideosForUser(idToken: string) {
    return this.http.get<Video[]>('https://server.firev.manhvipro.xyz/video/all/user', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  getOneVideo(id: string): Observable<Video> {
    return this.http.get<Video>('https://server.firev.manhvipro.xyz/video/one/' + `${id}`);
  }

  getEntireVideo(id: string): Observable<Video[]> {
    return this.http.get<Video[]>('https://server.firev.manhvipro.xyz/video/entire/' + `${id}`);
  }

  countVideoViews(id: string): Observable<number> {
    return this.http.put<number>('https://server.firev.manhvipro.xyz/video/views/' + `${id}`, '');
  }

  likeVideo(idToken: string, id: string): Observable<number> {
    return this.http.put<number>('https://server.firev.manhvipro.xyz/video/like/' + `${id}`, '', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  unlikeVideo(idToken: string, id: string): Observable<number> {
    return this.http.put<number>('https://server.firev.manhvipro.xyz/video/unlike/' + `${id}`, '', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  dislikeVideo(idToken: string, id: string): Observable<number> {
    return this.http.put<number>('https://server.firev.manhvipro.xyz/video/dislike/' + `${id}`, '', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  undislikeVideo(idToken: string, id: string): Observable<number> {
    return this.http.put<number>('https://server.firev.manhvipro.xyz/video/undislike/' + `${id}`, '', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  /////////////////////////////////////////////////////////COMMENT///////////////////////////////////////////////////////////////////////////////////////////////////////
  writeComment(idToken: string, id: string, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>('https://server.firev.manhvipro.xyz/comment/video/' + `${id}`, comment, { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  getAllCommentsFromThatVideo(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>('https://server.firev.manhvipro.xyz/comment/all/' + `${id}`);
  }

  ///////////////////////////////////////////////////////////////SUGGESTIONS??///////////////////////////////////////////////////////////////////////////////////
  searching(keyword: string): Observable<Suggestion[]>{
    return this.http.get<Suggestion[]>('https://server.firev.manhvipro.xyz/suggestion/search?key='+`${keyword}`);
  }

}

