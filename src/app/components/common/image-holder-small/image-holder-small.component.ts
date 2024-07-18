import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-image-holder-small',
  templateUrl: './image-holder-small.component.html',
  styleUrls: ['./image-holder-small.component.scss']
})
export class ImageHolderSmallComponent implements OnInit {

  @Input() src: string;
  @Input() title: string;
  @Input() desc?: string;
  @Output() itemClick = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
