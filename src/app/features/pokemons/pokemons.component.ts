import { Pokemon } from 'src/app/shared/interfaces/Pokemon';
import { PokemonApiService } from './services/pokemon-api/pokemon-api.service';
import { Component, OnInit } from '@angular/core';
const rightNames = ['HP', 'Attack', 'Defense', 'SP Attack', 'SP Defense', 'Speed'];

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit {

  pokemons?:Pokemon[] = this.pokemonApiService.pokemons$.value;
  chosenPokemon: Pokemon = {
    name: 'newName', 
    url: '', 
    types: [{slot: 1, type: {name: 'tested type', color: '', url: ''}}], 
    weight: 12, 
    moves: [], 
    stats: [],
    id: 0
  }
  isVisible = false;
  filterError = false;

  constructor(private pokemonApiService: PokemonApiService) {
  }

  ngOnInit(): void {
    this.pokemonApiService.pokemons$.subscribe(pokemons => {
      this.pokemons = pokemons;
    })
  }

  loadNextPokemons() {
    this.pokemonApiService.loadNextPokemons();
  }

  setPokemon(pokemon: Pokemon) {
    this.chosenPokemon = pokemon;
    for(let i = 0; i < pokemon.stats.length; i++)
    {
      pokemon.stats[i].stat.name = rightNames[i];
    }
    this.isVisible = true;
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  filterPokemons(typeName: string) {
    const defaultPokemons = this.pokemonApiService.pokemons$.getValue();
    if(typeName == '')
    {
      this.pokemons = defaultPokemons;
      this.filterError = false;
      return
    }
    const filteredPokemons = this.pokemons?.filter(pokemon => {
      let checked = false;
      pokemon.types.forEach(typeRes => {
        if(typeRes.type.name == typeName) {
          checked = true;
        }
      })
      return checked;
    })
    if(filteredPokemons?.length == 0)
    {
      this.filterError = true;
      this.pokemons = defaultPokemons;
    }
    else
    {
      this.filterError = false;
      this.pokemons = filteredPokemons;
    }
  }
}
