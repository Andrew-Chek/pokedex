import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { ButtonComponent } from './button/button.component';
import { IdPipe } from './id-pipe/id.pipe';



@NgModule({
  declarations: [
    FilterComponent,
    ButtonComponent,
    IdPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterComponent,
    ButtonComponent,
    IdPipe
  ]
})
export class SharedModule { }
