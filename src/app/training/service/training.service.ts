import { Exercise } from './../interface/exercise.model';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { UIservice } from 'src/app/shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  public exerciseChanged = new Subject<Exercise>();
  public exercisesChanged = new Subject<Exercise[]>();
  public finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: any;
  private fbSubscription: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private UIService: UIservice
  ) { }
  fetchAvailableExercises() {
    this.UIService.loadingStateChange.next(true);
    this.fbSubscription.push(
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
      this.UIService.loadingStateChange.next(false);
      this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      }, error => {
        this.UIService.loadingStateChange.next(false);
        this.UIService.showSnackbar('Something went wrong', 'close', 4000);
      })
    );
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
      date: moment(new Date()).format(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null as any);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: moment(new Date()).format(),
      state: 'cancelled'
    });
    this.runningExercise = null as any;
    this.exerciseChanged.next(null as any);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubscription.push(
      this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: any) => {
        this.finishedExercisesChanged.next(exercises);
      })
    );
  }
  cancelSubscription() {
    this.fbSubscription.forEach(data => data.unsubscribe());
  }
  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise).then((res) => {
    });
  }
}

