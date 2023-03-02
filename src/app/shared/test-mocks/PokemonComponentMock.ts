import { Component, Input } from "@angular/core";
import { Pokemon } from "../interfaces/Pokemon";

@Component({
    selector: 'app-pokemon',
    template: '<ul></ul>',
})
export class PokemonComponent {
    @Input() pokemon!: Pokemon
}