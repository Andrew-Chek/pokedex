import { PokemonType } from './PokemonType';
export interface Pokemon {
    nae: string,
    url: string,
    types: Array<PokemonType>
}