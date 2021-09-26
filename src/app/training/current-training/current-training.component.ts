import { TrainingService } from './../service/training.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  public progres: number = 0;
  private timer: any | undefined;

  @Output() trainingExit = new EventEmitter<void>();
  constructor(
    private dialog: MatDialog,
    private service: TrainingService
  ) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }
  startOrResumeTimer(): void {
    this.timer = setInterval(() => {
      this.progres = this.progres + 1;
      if (this.progres >= 100) {
        this.service.completeExercise();
        clearInterval(this.timer);
      }
    }, 1000);
  }
  onStop(): void {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progres
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.service.cancelExercise(this.progres);
      } else {
        this.startOrResumeTimer();
      }
    })
  }
}
