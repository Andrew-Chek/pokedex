import { pokemons } from './../../../shared/test-mocks/Pokemons';
import { PokemonApiService } from './../services/pokemon-api/pokemon-api.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonComponent } from './pokemon.component';
import { of } from 'rxjs';
import { types } from 'src/app/shared/test-mocks/Types';

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;
  let pokemonApiServiceStab: Partial<PokemonApiService> = {
    types$: of(types),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonComponent ],
      providers: [
        {provide: PokemonApiService, useValue: pokemonApiServiceStab},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    component.pokemon = pokemons[0];
    fixture.detectChanges();
  });

  describe('#setGradient', () => {
    it('should get proper gradient', () => {
      const gradient = component.setGradient('blue');
      expect(gradient).toEqual('linear-gradient(#e4e4e4, blue)')
    });
  })

  describe('#setColorTypes', () => {
    it('should get proper types', () => {
      const colorTypes = component.setColorTypes([...types.results]);
      expect(colorTypes[0].color).not.toEqual('')
    });
  })
});
