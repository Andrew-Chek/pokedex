import { PokemonApiService } from './../../features/pokemons/services/pokemon-api/pokemon-api.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  types$ = this.pokemonApiService.types$.pipe(map(types => {return types.results}));
  constructor(private pokemonApiService: PokemonApiService) { }
  @Output() filterChanged = new EventEmitter<string>()

  ngOnInit(): void {
  }

  onChange(value: string) {
    this.filterChanged.emit(value)
  }

}
