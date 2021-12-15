import { TrainingService } from './../service/training.service';
import { Exercise } from './../interface/exercise.model';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {

  public displayedColoums: Array<string> = ['date', 'name', 'duration', 'calories', 'state'];
  public dataSource = new MatTableDataSource<Exercise>();
  public exChangedSubscription: Subscription;
  public moment = moment;

  @ViewChild(MatSort) sort:  MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: TrainingService) { }

  ngOnInit(): void {
    this.exChangedSubscription = this.service.finishedExercisesChanged.subscribe(
      (exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      }
    );
    this.service.fetchCompletedOrCancelledExercises();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(filter: any) {
    this.dataSource.filter = filter.value.trim().toLowerCase();
  }
  ngOnDestroy() {
      this.exChangedSubscription.unsubscribe();
  }
}
