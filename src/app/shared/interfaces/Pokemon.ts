import { MoveResponse } from './MoveResponse';
import { StatResponse } from './StatResponse';
import { TypeResponse } from './TypeResponse';
export interface Pokemon {
    name: string,
    url: string,
    types: Array<TypeResponse>
    weight: number
    stats: Array<StatResponse>
    moves: Array<MoveResponse>
    id: number
}