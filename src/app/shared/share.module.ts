import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
  ],
  exports: [
    FormsModule,
    CommonModule,
    MaterialModule,
  ]
})
export class ShareModule {}
