import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss']
})
export class NavbarTopComponent {

  @Output() hamburger = new EventEmitter<any>();
  

  constructor() { }

  

}
