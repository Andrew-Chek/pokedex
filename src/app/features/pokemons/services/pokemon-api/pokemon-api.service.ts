import { Injectable,  } from '@angular/core';
import { Pokemon } from 'src/app/shared/interfaces/Pokemon';
import { HttpClient } from '@angular/common/http';
import { combineLatest, mergeMap, Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemons(offset=0, limit=20) {
    return this.http.get<ApiResponse>(`${this.apiUrl}/pokemon?offset=${offset}&limit=${limit}`).pipe(
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
}
