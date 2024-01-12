import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { VotesComponent } from './votes.component';
import { AngularFireModulesMock, AngularFireProvidersMock } from 'src/app/shared/mocks/others';
import { RoomService } from 'src/app/services/room.service';
import { RoomMock, TaskFlipMock, TaskMock } from 'src/app/shared/mocks/constants';
import { CardComponentSpec } from 'src/app/shared/mocks/components/card.component.spec';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoomServiceProviderMock } from 'src/app/shared/mocks/service';

xdescribe('VotesComponent', () => {
  let component: VotesComponent;
  let fixture: ComponentFixture<VotesComponent>;
  let service: RoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        VotesComponent,
        CardComponentSpec
      ],
      imports: [
        AngularFireModulesMock,
        BrowserAnimationsModule
      ],
      providers: [
        AngularFireProvidersMock,
        RoomServiceProviderMock
      ]
    });
    fixture = TestBed.createComponent(VotesComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(RoomService);
    component.room = RoomMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on', () => {
    let updateRoomSpy: jasmine.Spy;
    let taskCallsSpy: {
      vote: jasmine.Spy,
      showVotes: jasmine.Spy,
      revote: jasmine.Spy
    };
    beforeEach(() => {
      updateRoomSpy = spyOn(service, 'updateRoom');
      taskCallsSpy = {
        vote: spyOn(component.task, 'vote').and.callThrough(),
        showVotes: spyOn(component.task, 'showVotes').and.callThrough(),
        revote: spyOn(component.task, 'revote').and.callThrough()
      }
    });
    describe('try to vote', () => {
      describe('when has flipped cards', () => {
        afterEach(() => expect(updateRoomSpy).not.toHaveBeenCalled());
        beforeEach(fakeAsync(() => {
          component.room.tasks = [TaskFlipMock];
          component.vote(1);
          tick(100);
        }));
        it('should not call task.vote', () => expect(taskCallsSpy.vote).not.toHaveBeenCalled());
      });
      describe('when has no flipped cards', () => {
        afterEach(() => expect(updateRoomSpy).toHaveBeenCalledTimes(1));
        beforeEach(fakeAsync(() => {
          component.room.tasks = [TaskMock];
          component.vote(1);
          tick(100);
        }));
        it('should call task.vote', () => expect(taskCallsSpy.vote).toHaveBeenCalledTimes(1));
      });
    });

    describe('try to show votes', () => {
      describe('when has flipped cards', () => {
        afterEach(() => expect(updateRoomSpy).not.toHaveBeenCalled());
        beforeEach(() => {
          component.room.tasks = [TaskFlipMock];
          component.showVotes();
        });
        it('should not call task.showVotes', () => expect(taskCallsSpy.showVotes).not.toHaveBeenCalled());
      });
      describe('when has no flipped cards', () => {
        afterEach(() => expect(updateRoomSpy).toHaveBeenCalledTimes(1));
        beforeEach(() => {
          component.room.tasks = [TaskMock];
          component.showVotes()
        });
        it('should call task.showVotes', () => expect(taskCallsSpy.showVotes).toHaveBeenCalledTimes(1));
      });
    });

    describe('try to revote', () => {
      afterEach(() => expect(updateRoomSpy).toHaveBeenCalledTimes(1));
      beforeEach(() => component.revote());
      it('should call task.revote', () => expect(taskCallsSpy.revote).toHaveBeenCalledTimes(1));
    });
  });
});


