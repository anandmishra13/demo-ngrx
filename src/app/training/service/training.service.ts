import { Exercise } from './../interface/exercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private availableExercise: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  private runningExercise: Exercise | undefined;
  public exersieChange = new Subject<Exercise>();
  private exercise: Exercise[] = [];

  constructor() { }
  getAvailableExercise() {
    return this.availableExercise.slice();
  }
  completeExercise() {
    this.exercise.push({
      ...this.runningExercise,
      state: 'completed',
      date: new Date(),
    });
    this.runningExercise = null as any;
    this.exersieChange.next(null as any);
  }
  cancelExercise(progress: number) {
    this.exercise.push({
      ...this.runningExercise,
      duration: this.runningExercise?.duration as any * (progress / 100),
      calories: this.runningExercise?.calories as any * (progress / 100),
      state: 'cancelled',
      date: new Date(),
    });
    this.runningExercise = null as any;
    this.exersieChange.next(null as any);
  }
  startRunningExercise(selectedId: string) {
    this.runningExercise = this.availableExercise.find(ex => ex.id === selectedId);
    this.exersieChange.next({ ...this.runningExercise });
  }
  getCompletedOrCancelledExersicises() {
    return this.exercise.slice();
  }
}

