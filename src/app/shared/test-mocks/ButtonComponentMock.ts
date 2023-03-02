import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-button',
    template: '<ul></ul>',
})
export class ButtonComponent {
    @Input() buttonText:string = ''

	@Output() buttonClicked = new EventEmitter();
}