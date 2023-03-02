import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { PokemonApiService } from './pokemon-api.service';
import { Pokemon } from 'src/app/shared/interfaces/Pokemon';
import { pokemons } from 'src/app/shared/test-mocks/Pokemons';
import { types } from 'src/app/shared/test-mocks/Types';
import { TypesResponse } from 'src/app/shared/interfaces/TypesResponse';

describe('PokemonApiService', () => {
  let service: PokemonApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'https://pokeapi.co/api/v2';
  const copiedPokemons: Pokemon[] = [...pokemons];
  const copiedTypes: TypesResponse = {...types}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PokemonApiService,
        HttpClient
      ]});
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PokemonApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  describe('#getPokemons', () => {
    it('should send proper request', () => {

      service.getPokemons().subscribe({
        next: data => expect(data).toBeTruthy(),
        error: fail
      })
  
      const reqs = httpTestingController.match(`${apiUrl}/pokemon?offset=0&limit=12`);
      expect(reqs[0].request.method).toEqual('GET');
    })

    it('should return expected pokemons', () => {

      service.getPokemons().subscribe({
        next: data => {
          expect(data).toEqual(copiedPokemons)
        },
        error: fail
      })

      const reqs = httpTestingController.match(`${apiUrl}/pokemon?offset=0&limit=12`);
      expect(reqs[1].request.method).toEqual('GET');
      reqs[1].flush({results: copiedPokemons})
      for(let pokemon of copiedPokemons) {
        const req = httpTestingController.expectOne(pokemon.url);
      }
    })

    it('should return empty array', () => {
      service.getPokemons().subscribe({
        next: data => {
          expect(data).toEqual([])
        },
        error: fail
      })

      const reqs = httpTestingController.match(`${apiUrl}/pokemon?offset=0&limit=12`);
      expect(reqs[1].request.method).toEqual('GET');
      reqs[1].flush({results: []})
    })

    it('should return expected pokemons(called multiple times)', () => {
      service.getPokemons().subscribe()
      service.getPokemons().subscribe()
      service.getPokemons().subscribe({
        next: receivedPokemons => expect(receivedPokemons).toEqual(copiedPokemons),
        error: fail
      })

      const requests = httpTestingController.match(`${apiUrl}/pokemon?offset=0&limit=12`);
      expect(requests[2].request.method).toEqual('GET');
      requests[0].flush({results: []})
      requests[1].flush({results: [copiedPokemons[0]]})
      requests[2].flush({results: copiedPokemons})
      for(let pokemon of copiedPokemons) {
        const reqs = httpTestingController.match(pokemon.url);
      }
    })
  })

  describe('#getPokemonInfo', () => {
    it('should send proper request', () => {
      service.getPokemonInfo(copiedPokemons[0]).subscribe({
        next: data => expect(data).toBeTruthy(),
        error: fail
      })
  
      const allPokemonsReq = httpTestingController.expectOne(`${apiUrl}/pokemon?offset=0&limit=12`);
      const req = httpTestingController.expectOne(copiedPokemons[0].url);
      expect(req.request.method).toEqual('GET');
    })

    it('should return expected pokemon', () => {

      const searchedPokemon = copiedPokemons.find(pokemon => pokemon.id === 1)

      service.getPokemonInfo(copiedPokemons[0]).subscribe({
        next: data => {
          expect(data).toEqual(searchedPokemon!)
        },
        error: fail
      })

      const allPokemonsReq = httpTestingController.expectOne(`${apiUrl}/pokemon?offset=0&limit=12`);
      const req = httpTestingController.expectOne(copiedPokemons[0].url);
      req.flush(copiedPokemons[0])
    })

    it('should return expected pokemon(called multiple times)', () => {

      const searchedPokemon1 = copiedPokemons.find(pokemon => pokemon.id === 1)
      const searchedPokemon2 = copiedPokemons.find(pokemon => pokemon.id === 2)
      const searchedPokemon3 = copiedPokemons.find(pokemon => pokemon.id === 3)

      service.getPokemonInfo(copiedPokemons[0]).subscribe()
      service.getPokemonInfo(copiedPokemons[2]).subscribe()
      service.getPokemonInfo(copiedPokemons[1]).subscribe({
        next: pokemon => {
          expect(pokemon).toEqual(searchedPokemon2!)
        },
        error: fail
      })

      const allPokemonsReq = httpTestingController.expectOne(`${apiUrl}/pokemon?offset=0&limit=12`);
      const firstReq = httpTestingController.expectOne(copiedPokemons[0].url);
      const secondReq = httpTestingController.expectOne(copiedPokemons[1].url);
      const thirdReq = httpTestingController.expectOne(copiedPokemons[2].url);

      firstReq.flush(searchedPokemon1!)
      secondReq.flush(searchedPokemon2!)
      thirdReq.flush(searchedPokemon3!)
    })
  })

  describe('#getTypes', () => {
    it('should send proper request', () => {

      service.getTypes().subscribe({
        next: data => expect(data).toBeTruthy(),
        error: fail
      })
  
      httpTestingController.expectOne(`${apiUrl}/pokemon?offset=0&limit=12`);
      const req = httpTestingController.expectOne(`${apiUrl}/type/`);
      expect(req.request.method).toEqual('GET');
    })

    it('should return expected types', () => {

      service.getTypes().subscribe({
        next: data => {
          expect(data).toEqual(copiedTypes)
        },
        error: fail
      })

      httpTestingController.expectOne(`${apiUrl}/pokemon?offset=0&limit=12`);
      const req = httpTestingController.expectOne(`${apiUrl}/type/`);
      req.flush(copiedTypes)
    })

    it('should return expected types(called multiple times)', () => {
      service.getTypes().subscribe()
      service.getTypes().subscribe()
      service.getTypes().subscribe({
        next: receivedPokemons => expect(receivedPokemons).toEqual(copiedTypes),
        error: fail
      })

      httpTestingController.expectOne(`${apiUrl}/pokemon?offset=0&limit=12`);
      const requests = httpTestingController.match(`${apiUrl}/type/`);

      requests[0].flush({results: []})
      requests[1].flush({results: [copiedTypes.results[0]]})
      requests[2].flush(copiedTypes)
    })
  })

  describe('#loadNextPokemons', () => {
    it('should send proper request', () => {
      service.loadNextPokemons();

      expect(service.counter).toEqual(12);
      httpTestingController.expectOne(`${apiUrl}/pokemon?offset=0&limit=12`);
      const req = httpTestingController.expectOne(`${apiUrl}/pokemon?offset=12&limit=12`);
      expect(req.request.method).toEqual('GET');
    })
  })
});
