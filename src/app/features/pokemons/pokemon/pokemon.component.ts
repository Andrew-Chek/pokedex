import { PokemonApiService } from './../services/pokemon-api/pokemon-api.service';
import { Pokemon } from './../../../shared/interfaces/Pokemon';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';

const colors = [
  "#d0d1d1", "#ec6227", "#008cff", "#b39bbf", "#957360", 
    "#aaa18e", "#592e21", "#786b72", "#8e8b8b", "#f3790b", 
      "#5599d4", "#3a7a0f", "#a4e2f7", "#9a1d47", "#4a8bc3",
        "#c1afda", "#2b5a6d", "#d171bf", "#266d74", "#918e8c"
  ]

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  @Input() pokemon!: Pokemon
  constructor(private pokemonApiService: PokemonApiService) { }

  ngOnInit(): void {
    const colorTypes: Array<{type:string, color: string}> = [];
    this.pokemonApiService.types$.pipe(
      map(response => {
        for(let i = 0; i < response.results.length; i++)
        {
          colorTypes.push({type: response.results[i].name, color: colors[i]})
        }
        return colorTypes;
      })
    ).subscribe((colorTypes => {
      this.pokemon.types.forEach(typeResponse => {
        colorTypes.forEach(colorType => {
          if(colorType.type === typeResponse.type.name) {
            typeResponse.type.color = colorType.color
          }
        })
      })
    }))
  }

  setGradient(color: string)
  {
    return `linear-gradient(#e4e4e4, ${color})`;
  }
}
