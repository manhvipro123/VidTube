import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import { ProgressComponent } from './components/progress/progress.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AddComponent } from './components/add/add.component';
import { ChannelComponent } from './components/channel/channel.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProgressComponent,
    AddComponent,
    ChannelComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class ProfileModule { }
