import { pokemons } from 'src/app/shared/test-mocks/Pokemons';
import { PokemonApiService } from './services/pokemon-api/pokemon-api.service';
import { FilterComponent } from './../../shared/test-mocks/FilterComponentMock';
import { ButtonComponent } from './../../shared/test-mocks/ButtonComponentMock';
import { PokemonInfoComponent } from 'src/app/shared/test-mocks/PokemonInfoComponentMock';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonComponent } from 'src/app/shared/test-mocks/PokemonComponentMock';

import { PokemonsComponent } from './pokemons.component';
import { BehaviorSubject } from 'rxjs';

describe('PokemonsComponent', () => {
  let component: PokemonsComponent;
  let fixture: ComponentFixture<PokemonsComponent>;
  let pokemonApiServiceStab: Partial<PokemonApiService> = {
    pokemons$: new BehaviorSubject(pokemons),
    loadNextPokemons: jasmine.createSpy('loadNextPokemons')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        PokemonComponent,
        PokemonInfoComponent,
        ButtonComponent,
        FilterComponent,
      ],
      providers: [
        {provide: PokemonApiService, useValue: pokemonApiServiceStab},
      ]
    })
    .compileComponents();



    fixture = TestBed.createComponent(PokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#loadNextPokemons', () => {
    it('should call proper method of api', () => {
      component.loadNextPokemons();
      expect(pokemonApiServiceStab.loadNextPokemons).toHaveBeenCalled()
    });
  })

  describe('#setPokemon', () => {
    it('should set visible flag to true', () => {
      component.setPokemon(pokemons[0]);
      expect(component.isVisible).toBeTrue()
    });
  })

  describe('#filterPokemons', () => {
    it('should get proper pokemons', () => {
      component.filterPokemons('tested_type1');
      expect(component.pokemons!.length).toEqual(1)
    });
  })
});
