import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { RejectedFile } from 'ngx-dropzone/lib/ngx-dropzone.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/app/services/http.service';
import { UploadService } from 'src/app/services/upload.service';
import { VideoState } from 'src/app/states/video.state';
import { Store } from '@ngrx/store';

import { AuthState } from 'src/app/states/auth.state';
import { Video } from 'src/app/models/video.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
}
