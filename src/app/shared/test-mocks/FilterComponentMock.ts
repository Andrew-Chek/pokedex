import { Component, EventEmitter, Output } from "@angular/core";
import { of } from "rxjs";
import { types } from "./Types";

@Component({
    selector: 'app-filter',
    template: '<ul></ul>',
})
export class FilterComponent {
    types$ = of(types);
    @Output() filterChanged = new EventEmitter<string>()
}