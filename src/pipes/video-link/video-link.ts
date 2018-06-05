import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
/**
 * Generated class for the VideoLinkPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'videoLink',
})
export class VideoPipe implements PipeTransform {
  
  constructor(private dom:DomSanitizer)
  {
    new Date();
  }

  transform(value: string, ...args) {
    console.log(value);
    return this.dom.bypassSecurityTrustResourceUrl(value);
  }
}
