import { Exercise } from './../interface/exercise.model';
import { NgForm } from '@angular/forms';
import { TrainingService } from './../service/training.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore/';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  public exercise: Observable<any>;

  constructor(
    private service: TrainingService,
    private db: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.exercise = this.db.collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray: any) => {
          return docArray.map((doc: any) => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              duration: doc.payload.doc.data().duration,
              calories: doc.payload.doc.data().calories
            };
          });
        }
        )
      )
  }
  onStartTrainig(form: NgForm): void {
    this.service.startRunningExercise(form.value.exercise);
    console.log(form.value);
  }
}

