import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicFilterComponent } from './basic-filter/basic-filter.component';
import { AdditionalFilterComponent } from './additional-filter/additional-filter.component';



@NgModule({
  declarations: [
    BasicFilterComponent,
    AdditionalFilterComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    BasicFilterComponent,
    AdditionalFilterComponent
  ]
})
export class FilterModule { }
