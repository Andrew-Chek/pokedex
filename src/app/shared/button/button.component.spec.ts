import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'sentClicked')
  });

  describe('#onClick', () => {
    it('should raise emit event', () => {
      const button = fixture.debugElement.query(By.css('.button'));
      button.triggerEventHandler('click');
      expect(component.sentClicked).toHaveBeenCalled();
    });
  })
});
