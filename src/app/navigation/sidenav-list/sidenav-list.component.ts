import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() toggleSideNav = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  onClose(): void {
    this.toggleSideNav.emit();
  }
}
