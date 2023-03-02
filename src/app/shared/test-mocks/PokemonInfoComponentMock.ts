import { Component, Input } from "@angular/core";
import { Pokemon } from "../interfaces/Pokemon";

@Component({
    selector: 'app-pokemon-info',
    template: '<ul></ul>',
})
export class PokemonInfoComponent {
    @Input() pokemon: Pokemon = {
        name: 'newName', 
        url: '', 
        types: [{slot: 1, type: {name: 'tested type', color: '', url: ''}}], 
        weight: 12, 
        moves: [], 
        stats: [],
        id: 0
      }
    @Input() visible = false
}