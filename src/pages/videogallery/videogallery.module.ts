import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideogalleryPage } from './videogallery';
import { VideoPipe } from '../../pipes/video-link/video-link';

@NgModule({
  declarations: [
    VideogalleryPage,
    VideoPipe,
  ],
  imports: [
    IonicPageModule.forChild(VideogalleryPage),
  ],
})
export class VideogalleryPageModule {}
