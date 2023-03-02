
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() buttonText = ""
  @Output() buttonClicked = new EventEmitter<boolean>(false);
  constructor() { }

  ngOnInit(): void {
  }

  sentClicked() {
    this.buttonClicked.emit(true);
  }
}
