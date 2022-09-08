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

    return this.http.post('http://127.0.0.1:5000/user', '', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  public getAllUser(idToken: string) {
    console.log('hi')
    return this.http.get('http://127.0.0.1:5000/user', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  public getUserId(idToken: string) {
    return this.http.get<string>('http://127.0.0.1:5000/user/id', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  public subscribeUser(idToken: string, _id: string) {
    return this.http.put<User>('http://127.0.0.1:5000/user/subscribe/' + `${_id}`, '', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  public unsubscribeUser(idToken: string, _id: string) {
    return this.http.put<User>('http://127.0.0.1:5000/user/unsubscribe/' + `${_id}`, '', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  sendUidForm(idToken:string,uidForm: any){
    return this.http.post('http://127.0.0.1:5000/cloud/save',uidForm,{ headers: new HttpHeaders({ 'Authorization': `${idToken}` }) })
  }

  //-------------------------------------------Video----------------------------------------------------------------///
  public addThumb(idToken: string, thumbForm: any) {
    return new Promise<Object | null>((resolve, reject) => {
      try {
        this.http.post('http://127.0.0.1:5000/video/upload/thumb', thumbForm, { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) }).subscribe((value: any) => {
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
        this.http.post('http://127.0.0.1:5000/video/upload/vid', videoForm, { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) }).subscribe((value: any) => {
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
    return this.http.post('http://127.0.0.1:5000/media/' + `${video_id}`, videoForm, { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) })
  }

  public createVideoInfo(idToken: string, infoForm: any) {
    return this.http.post<Video>('http://127.0.0.1:5000/video', infoForm, { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  getAllVideos() {
    return this.http.get<Video[]>('http://127.0.0.1:5000/video/all');
  }

  getAllVideosExceptUser(idToken: string) {
    return this.http.get<Video[]>('http://127.0.0.1:5000/video/all/user', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  getOneVideo(id: string): Observable<Video> {
    return this.http.get<Video>('http://127.0.0.1:5000/video/one/' + `${id}`);
  }

  getEntireVideo(id: string): Observable<Video[]> {
    return this.http.get<Video[]>('http://127.0.0.1:5000/video/entire/' + `${id}`);
  }

  countVideoViews(id: string): Observable<number> {
    return this.http.put<number>('http://127.0.0.1:5000/video/views/' + `${id}`, '');
  }

  likeVideo(idToken: string, id: string): Observable<number> {
    return this.http.put<number>('http://127.0.0.1:5000/video/like/' + `${id}`, '', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  unlikeVideo(idToken: string, id: string): Observable<number> {
    return this.http.put<number>('http://127.0.0.1:5000/video/unlike/' + `${id}`, '', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  dislikeVideo(idToken: string, id: string): Observable<number> {
    return this.http.put<number>('http://127.0.0.1:5000/video/dislike/' + `${id}`, '', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  undislikeVideo(idToken: string, id: string): Observable<number> {
    return this.http.put<number>('http://127.0.0.1:5000/video/undislike/' + `${id}`, '', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  /////////////////////////////////////////////////////////COMMENT///////////////////////////////////////////////////////////////////////////////////////////////////////
  writeComment(idToken: string, id: string, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>('http://127.0.0.1:5000/comment/video/' + `${id}`, comment, { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  getAllCommentsFromThatVideo(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>('http://127.0.0.1:5000/comment/all/' + `${id}`);
  }

  ///////////////////////////////////////////////////////////////SUGGESTIONS??///////////////////////////////////////////////////////////////////////////////////
  searching(keyword: string): Observable<Suggestion[]>{
    return this.http.get<Suggestion[]>('http://127.0.0.1:5000/suggestion/search?key='+`${keyword}`);
  }

}

