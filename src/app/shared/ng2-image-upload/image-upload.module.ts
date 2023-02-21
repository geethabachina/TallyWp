import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { FileDropDirective } from './file-drop.directive';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImageService } from './image-upload/image.service';

@NgModule({
  imports: [CommonModule, HttpModule],
  declarations: [ImageUploadComponent, FileDropDirective],
  exports: [ImageUploadComponent]
})
export class ImageUploadModule {
  // static forRoot(): ModuleWithProviders {
    static forRoot(): ModuleWithProviders<ImageUploadModule> {
    return {
      // ngModule: ImageUploadModule,
      ngModule: ImageUploadModule,
      providers: [ImageService]
    }
  }
}
