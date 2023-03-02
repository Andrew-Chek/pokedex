import { Pokemon } from 'src/app/shared/interfaces/Pokemon';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.scss']
})
export class PokemonInfoComponent implements OnInit {

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
  constructor() { }

  ngOnInit(): void {
  }
}
