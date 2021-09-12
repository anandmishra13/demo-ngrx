import { TrainingService } from './service/training.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  public onGoiningTraining = false;
  private exerciseSubscription: Subscription;

  constructor(
    private service: TrainingService
  ) { }

  ngOnInit(): void {
    this.exerciseSubscription = this.service.exersieChange.subscribe(exersie => {
      if (exersie) {
        this.onGoiningTraining = true;
      } else {
        this.onGoiningTraining = false;
      }
    })
  }

}
