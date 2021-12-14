import { Exercise } from './../interface/exercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  public exerciseChanged = new Subject<Exercise>();
  public exercisesChanged = new Subject<Exercise[]>();
  public finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: any;

  constructor(
    private db: AngularFirestore
  ) { }
  fetchAvailableExercises() {
    this.db
      .collection('availableExercises')
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
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null as any;
    this.exerciseChanged.next(null as any);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise?.duration as any * (progress / 100),
      calories: this.runningExercise?.calories as any * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null as any;
    this.exerciseChanged.next(null as any);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: any) => {
        this.finishedExercisesChanged.next(exercises);
      });
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise).then((res) => {
    });
  }





  // fetchAvailableExercise() {
  //   this.db.collection('availableExercises')
  //     .snapshotChanges()
  //     .pipe(
  //       map((docArray: any) => {
  //         return docArray.map((doc: any) => {
  //           return {
  //             id: doc.payload.doc.id,
  //             name: doc.payload.doc.data().name,
  //             duration: doc.payload.doc.data().duration,
  //             calories: doc.payload.doc.data().calories
  //           };
  //         });
  //       }
  //       )
  //     ).subscribe((exercises: Exercise[]) => {
  //       this.availableExercise = exercises;
  //       this.exersiseChange.next([...this.availableExercise]);
  //     });
  // }
  // completeExercise() {
  //   this.addDataToDatabase({
  //     ...this.runningExercise,
  //     state: 'completed',
  //     date: new Date(),
  //   });
  //   this.runningExercise = null as any;
  //   this.exersieChange.next(null as any);
  // }
  // cancelExercise(progress: number) {
  //   this.addDataToDatabase({
  //     ...this.runningExercise,
  //     duration: this.runningExercise?.duration as any * (progress / 100),
  //     calories: this.runningExercise?.calories as any * (progress / 100),
  //     state: 'cancelled',
  //     date: new Date(),
  //   });
  //   this.runningExercise = null as any;
  //   this.exersieChange.next(null as any);
  // }
  // startRunningExercise(selectedId: string) {
  //   this.runningExercise = this.availableExercise.find(ex => ex.id === selectedId);
  //   this.exersieChange.next([...this.availableExercise]);
  // }
  // getCompletedOrCancelledExersicises() {
  //   return this.exercise.slice();
  // }
  // private addDataToDatabase(exercise: Exercise) {
  //   console.log(exercise);
  //   console.log(this.runningExercise, 'this.runningExercise')
  //   // this.db.collection('finishedExercises').add(exercise);
  // }
}

