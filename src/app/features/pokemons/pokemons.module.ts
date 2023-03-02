import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonInfoComponent } from './pokemon-info/pokemon-info.component';
import { PokemonsComponent } from './pokemons.component';



@NgModule({
  declarations: [
    PokemonComponent,
    PokemonInfoComponent,
    PokemonsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    PokemonsComponent
  ]
})
export class PokemonsModule { }
