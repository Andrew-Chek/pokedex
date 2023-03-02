import { Observable, of } from 'rxjs';
import { PokemonApiService } from './../../features/pokemons/services/pokemon-api/pokemon-api.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FilterComponent } from './filter.component';
import { types } from '../test-mocks/Types';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let pokemonApiServiceStab: Partial<PokemonApiService> = {
    types$: of(types)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterComponent ],
      providers: [
        {provide: PokemonApiService, useValue: pokemonApiServiceStab},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'onChange')
  });

  describe('#onChange', () => {
    it('should raise emit event', () => {
      const element = fixture.debugElement.query(By.css('.filter'));
      element.triggerEventHandler('change');
      expect(component.onChange).toHaveBeenCalled();
    });
  })
});
