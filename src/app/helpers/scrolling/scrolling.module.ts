import { CdkScrolling } from './scrolling.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingDirective } from './scrolling.directive';

@NgModule({
  imports: [CommonModule],
  providers: [CdkScrolling],
  declarations: [ScrollingDirective],
  exports: [ScrollingDirective],
})
export class CdkScrollingModule {}
