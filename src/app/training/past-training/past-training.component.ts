import { TrainingService } from './../service/training.service';
import { Exercise } from './../interface/exercise.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

  public displayedColoums: Array<string> = ['date', 'name', 'duration', 'calories', 'state'];
  public dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort:  MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: TrainingService) { }

  ngOnInit(): void {
    // this.dataSource.data = this.service.fer==;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(filter: any) {
    this.dataSource.filter = filter.value.trim().toLowerCase();
  }
}
