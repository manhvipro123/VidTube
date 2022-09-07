import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { getToken, Messaging } from '@angular/fire/messaging';

@Injectable({
  providedIn: 'root'
})
export class CloudMessageService {

  constructor(private auth: Auth, private messaging: Messaging) {
  
  }

  requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        this.retrieveToken();
      } else if (permission === 'denied') {
        console.log('Notification permission denied.');
      }
    })
  }

  retrieveToken(){
    getToken(this.messaging, { vapidKey: "BJ-UaZkO6CtjkkCUm2ogjrDe7LL_hvN4ppGMdzg3vXRDSEOVQYoWS0NW3hPzRqyivvYTHtADVPNigsr8DnEd-4A" }).then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
      } else {
        // Show permission request UI
        alert('No registration token available. Request permission to generate one.')
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
  }

}
