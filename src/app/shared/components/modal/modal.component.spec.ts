import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let background: DebugElement;
  let modal: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ModalComponent]
});
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.modalTitle = 'Test title';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('if isOpen is true', () => {
    beforeEach(() => {
      component.open();
      fixture.detectChanges();
      background = fixture.debugElement.query(By.css('.background'));
      modal = fixture.debugElement.query(By.css('.modal'));
    });

    it('should show modal', () => expect(modal).toBeTruthy());
    it('should show background', () => expect(background).toBeTruthy());
    it('should show title', () => expect(modal.query(By.css('.modal__header > h1')).nativeElement.innerText).toEqual(component.modalTitle));

    describe('on background click', () => {
      beforeEach(() => {
        background.triggerEventHandler('click', null);
        fixture.detectChanges();
        background = fixture.debugElement.query(By.css('.background'));
        modal = fixture.debugElement.query(By.css('.modal'));
      });
      it('should set isOpen to false', () => expect(component.isOpen$).toBeFalsy());
      it('should hide modal', () => expect(modal).toBeFalsy());
      it('should hide background', () => expect(background).toBeFalsy());
    });
  });

  describe('if isOpen is false', () => {
    beforeEach(() => {
      component.close();
      fixture.detectChanges();
      background = fixture.debugElement.query(By.css('.background'));
      modal = fixture.debugElement.query(By.css('.modal'));
    });

    it('should not show modal', () => expect(modal).toBeFalsy());
    it('should not show background', () => expect(background).toBeFalsy());
    describe('should open modal if open is called', () => {
      beforeEach(() => {
        component.open();
        fixture.detectChanges();
        background = fixture.debugElement.query(By.css('.background'));
        modal = fixture.debugElement.query(By.css('.modal'));
      })
      it('should set isOpen to true', () => expect(component.isOpen$).toBeTruthy());
      it('should show modal', () => expect(modal).toBeTruthy());
      it('should show background', () => expect(background).toBeTruthy());
    })
  });
});
