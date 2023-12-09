import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicFilterComponent } from './basic-filter/basic-filter.component';



@NgModule({
  declarations: [
    BasicFilterComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    BasicFilterComponent
  ]
})
export class FilterModule { }
