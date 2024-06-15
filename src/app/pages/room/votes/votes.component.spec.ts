import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VotesComponent } from './votes.component';
import { AngularFireModulesMock, AngularFireProvidersMock } from 'src/app/shared/mocks/others';
import { RoomService } from 'src/app/services/room.service';
import { RoomTaskNoVotesMock} from 'src/app/shared/mocks/constants';
import { CardComponentSpec } from 'src/app/shared/mocks/components/card.component.spec';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoomServiceProviderMock } from 'src/app/shared/mocks/service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CardComponent } from 'src/app/shared/components/card/card.component';

describe('VotesComponent', () => {
  let component: VotesComponent;
  let fixture: ComponentFixture<VotesComponent>;
  let service: RoomService;
  let actions: DebugElement;
  let result: DebugElement;
  let currentVotes: DebugElement;
  let votes: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [CardComponentSpec],
    imports: [
        AngularFireModulesMock,
        BrowserAnimationsModule,
        VotesComponent
    ],
    providers: [
        AngularFireProvidersMock,
        RoomServiceProviderMock
    ]
});
    fixture = TestBed.createComponent(VotesComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RoomService);

    service.updateRoom(RoomTaskNoVotesMock);
    service.listenerRoom('path').subscribe((room) => {
      component.room = room;
      checkChanges();
    });
  });

  describe('on Init', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
      expect(actions).withContext('actions should NOT exist on HTML').not.toBeTruthy();
      expect(result).withContext('result should exist on HTML').toBeTruthy();
      expect(currentVotes).withContext('currentVotes should exist on HTML').toBeTruthy();
      expect(votes).withContext('votes should exist on HTML').toBeTruthy();
    });
  
    it('results should be "-"', () => expect(result.nativeElement.textContent).toBe('-'));
    it('should have 0 current votes', () => expect(currentVotes.children.length).toBe(0));
    describe('should have a fribbonacci cards', () => {
      type FribonnacciTest = { position: number, value: number };
      let fribonnacciTests: FribonnacciTest[] = [
        { position: 0, value: 1 },
        { position: 1, value: 2 },
        { position: 2, value: 3 },
        { position: 3, value: 5 },
        { position: 4, value: 8 },
        { position: 5, value: 13 },
        { position: 6, value: 21 },
        { position: 7, value: 34 },
        { position: 8, value: 55 },
        { position: 9, value: 89 }
      ];
      it('length should be 10', () => expect(votes.children.length).toBe(10));
      fribonnacciTests.forEach(test => {
        it(`position ${test.position} should have value ${test.value}`, () => {
          const card: CardComponent = votes.children[test.position].componentInstance;
          expect(card.card.value).toBe(test.value);
        });
      });
    });
  })
  

  describe('after vote', () => {
    let voteSpy: jasmine.Spy;
    beforeEach(() => {
      voteSpy = spyOn(component.task, 'vote').and.callThrough();
      votes.children[0].triggerEventHandler('click', null);
      checkChanges();
    });

    it('actions should appear', () => expect(actions).withContext('actions should exist on HTML').toBeTruthy());
    it('actions should have 2 buttons', () => expect(actions.children.length).toBe(2));
    it('first button should have text "Virar cartas"', () => expect(actions.children[0].nativeElement.textContent).toBe('Virar cartas'));
    it('second button should have text "Revotar"', () => expect(actions.children[1].nativeElement.textContent).toBe('Revotar'));
    it('result should be "-"', () => expect(result.nativeElement.textContent).toBe('-'));
    it('should have 1 current votes', () => expect(currentVotes.children.length).toBe(1));

    describe('after show votes', () => {
      let spyUpdateRoom: jasmine.Spy;
      beforeEach(() => {
        actions.children[0].triggerEventHandler('click', null);
        checkChanges();
        spyUpdateRoom = spyOn(service, 'updateRoom').and.callThrough();
      });
      it('flipped should be true', () => expect(component.flippedVotes).toBeTrue());
      it('should hide fribonnacci votes', () => expect(votes).withContext('votes should NOT exist on HTML').not.toBeTruthy());
      it('result should be "1"', () => expect(result.nativeElement.textContent).toBe('1'));
      it('on try to vote again, should not be possible', () => {
        component.vote(1);
        expect(voteSpy).not.toHaveBeenCalled();
        expect(spyUpdateRoom).not.toHaveBeenCalled();
      });
      it('on try to show votes again, should not be possible', () => {
        component.showVotes();
        expect(spyUpdateRoom).not.toHaveBeenCalled();
      });
    });

    describe('after revote', () => {
      beforeEach(() => {
        actions.children[1].triggerEventHandler('click', null);
        checkChanges();
      });
      it('flipped should be false', () => expect(component.flippedVotes).toBeFalse());
      it('should show fribonnacci votes', () => expect(votes).withContext('votes should exist on HTML').toBeTruthy());
      it('result should be "-"', () => expect(result.nativeElement.textContent).toBe('-'));
      it('current votes should be empty', () => expect(currentVotes.children.length).toBe(0));
    });
  });

  function checkChanges() : void {
    fixture.detectChanges();
    actions = fixture.debugElement.query(By.css('.actions'));
    result = fixture.debugElement.query(By.css('.votes-result>h1'));
    currentVotes = fixture.debugElement.query(By.css('.current-votes-list'));
    votes = fixture.debugElement.query(By.css('.votes'));
  }
});


