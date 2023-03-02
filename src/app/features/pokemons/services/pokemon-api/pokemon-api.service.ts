import { TypesResponse } from 'src/app/shared/interfaces/TypesResponse';
import { Injectable,  } from '@angular/core';
import { Pokemon } from 'src/app/shared/interfaces/Pokemon';
import { HttpClient } from '@angular/common/http';
import { combineLatest, mergeMap, Observable, BehaviorSubject } from 'rxjs';
import { PokemonsResponse } from 'src/app/shared/interfaces/PokemonsResponse';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  private apiUrl = 'https://pokeapi.co/api/v2';
  pokemons$!: BehaviorSubject<Pokemon[]>;
  types$ = this.getTypes();
  counter = 0;

  constructor(private http: HttpClient) {
    const mockPokemons: Pokemon[] = [{name: 'newName', url: '', types: [], weight: 12, moves: [], stats: [], id: 0}]
    this.pokemons$ = new BehaviorSubject(mockPokemons)
    this.getPokemons().subscribe(value => {
      this.pokemons$.next(value)
    })
  }

  getPokemons(offset=0, limit=12) {
    return this.http.get<PokemonsResponse>(`${this.apiUrl}/pokemon?offset=${offset}&limit=${limit}`).pipe(
      mergeMap(response => {
        const pokemonRequests: Array<Observable<Pokemon>> = []
        for(let pokemon of response.results) 
        {
          pokemonRequests.push(this.getPokemonInfo(pokemon))
        }
        return combineLatest(pokemonRequests);
      }),
    )
  }

  getPokemonInfo(pokemon: Pokemon) {
    return this.http.get<Pokemon>(pokemon.url)
  }

  getTypes() {
    return this.http.get<TypesResponse>(`${this.apiUrl}/type/`)
  }

  loadNextPokemons() {
    this.counter += 12;
    this.getPokemons(this.counter).subscribe(result => {
      this.pokemons$.next(result)
    })
    this.pokemons$.subscribe(console.log)
  }
}
