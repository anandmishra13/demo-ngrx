import { NgForm } from '@angular/forms';
import { TrainingService } from './../service/training.service';
import { Component, OnInit } from '@angular/core';
import { Exercise } from '../interface/exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  public exercise: Exercise[] = [];

  constructor(
    private service: TrainingService
  ) { }

  ngOnInit(): void {
    this.exercise = this.service.getAvailableExercise();
  }
  onStartTrainig(form: NgForm): void {
    this.service.startRunningExercise(form.value.exercise);
    console.log(form.value);
  }
}
