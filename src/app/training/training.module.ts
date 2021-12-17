import { TrainingRoutingModule } from './training-routing.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ShareModule } from "../shared/share.module";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingComponent } from "./past-training/past-training.component";
import { TrainingComponent } from "./training.component";

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
  ],
  imports: [
    ShareModule,
    AngularFirestoreModule,
    TrainingRoutingModule
  ]
})
export class TrainingModule {}
