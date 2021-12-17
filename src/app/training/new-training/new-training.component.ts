import { UIservice } from './../../shared/ui.service';
import { Exercise } from './../interface/exercise.model';
import { NgForm } from '@angular/forms';
import { TrainingService } from './../service/training.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore/';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  public exercises: Exercise[];
  private exerciseSubscription: Subscription;
  public isLoading: boolean;

  constructor(
    private trainingService: TrainingService,
    private UIservice: UIservice
  ) { }

  ngOnInit() {
    this.UIservice.loadingStateChange.subscribe(state => {
      this.isLoading = state;
    })
    this.exerciseSubscription = this.trainingService.exercisesChanged
    .subscribe(exercises => (this.exercises = exercises));
    this.fetchData();
  }
  fetchData() {
    this.trainingService.fetchAvailableExercises();
  }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) this.exerciseSubscription.unsubscribe();
  }
}

