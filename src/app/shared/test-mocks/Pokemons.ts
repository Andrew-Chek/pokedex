import { Pokemon } from './../interfaces/Pokemon';
export const pokemons: Pokemon[] = [
    {
        name: 'tested1',
        url: 'link1',
        types: [
            {
                slot: 1,
                type: {
                    name: 'tested_type1',
                    url: 'link1',
                    color: ''
                },
            }
        ],
        weight: 100,
        stats: [],
        moves: [],
        id: 1
    },
    {
        name: 'tested2',
        url: 'link2',
        types: [],
        weight: 100,
        stats: [],
        moves: [],
        id: 2
    },
    {
        name: 'tested3',
        url: 'link3',
        types: [],
        weight: 100,
        stats: [],
        moves: [],
        id: 3
    },
    {
        name: 'tested4',
        url: 'link4',
        types: [],
        weight: 100,
        stats: [],
        moves: [],
        id: 4
    }
]