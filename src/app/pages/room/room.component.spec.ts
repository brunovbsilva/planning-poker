import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RoomComponent } from './room.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RoomService } from 'src/app/services/room.service';
import { TasksComponentSpec } from 'src/app/shared/mocks/pages/tasks.component.spec';
import { VotesComponentSpec } from 'src/app/shared/mocks/pages/votes.component.spec';
import { RoomServiceProviderMock } from 'src/app/shared/mocks/service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RoomEmptyMock, RoomMock } from 'src/app/shared/mocks/constants';
import { TasksComponent } from './tasks/tasks.component';
import { VotesComponent } from './votes/votes.component';

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;
  let service: RoomService;
  let spyListener: jasmine.Spy;
  let spyUpdate: jasmine.Spy;
  let room: DebugElement;
  let name: HTMLElement;
  let tasks: TasksComponent;
  let votes: VotesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [TasksComponentSpec,
        VotesComponentSpec],
    imports: [RouterTestingModule, RoomComponent],
    providers: [RoomServiceProviderMock]
});
    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RoomService);
    spyListener = spyOn(service, 'listenerRoom').and.callThrough();
  });

  describe('on Init', () => {
    beforeEach(() => {
      service.updateRoom(RoomMock);
      fixture.detectChanges();
      room = fixture.debugElement.query(By.css('.current-room'));
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component.room).toBeTruthy();
      expect(room).withContext('room HTML should exist').toBeTruthy();
    });
    
    it('should start listener room', fakeAsync(() => {
      tick(100);
      expect(spyListener).toHaveBeenCalled();
    }));
  
    it('should update values on next value', () => {
      spyUpdate = spyOn(component.room!, 'updateValues').and.callThrough();
      service.updateRoom(RoomMock);
      expect(spyUpdate).toHaveBeenCalled();
      expect(component.room?.id).withContext('id from room should be equal mocked').toEqual(RoomMock.id);
      expect(component.room?.name).withContext('name from room should be equal mocked').toEqual(RoomMock.name);
      expect(component.room?.creator).withContext('creator from room should be equal mocked').toEqual(RoomMock.creator);
      expect(component.room?.currentTask).withContext('currentTask from room should be equal mocked').toEqual(RoomMock.currentTask);
      expect(component.room?.tasks).withContext('tasks from room should be equal mocked').toEqual(RoomMock.tasks);
    });
  })

  describe('if room has tasks', () => {
    beforeEach(() => {
      service.updateRoom(RoomMock);
      fixture.detectChanges();
      room = fixture.debugElement.query(By.css('.current-room'));
      name = room.nativeElement.querySelector('.room-name');
      tasks = room.nativeElement.querySelector('app-tasks');
      votes = room.nativeElement.querySelector('app-votes');
    });

    it('should show room name', () => expect(room.nativeElement.textContent).withContext('Room name').toContain(RoomMock.name));
    it('should show tasks', () => expect(tasks).withContext('app-tasks HTML').toBeTruthy());
    it('should show votes', () => expect(votes).withContext('app-votes HTML').toBeTruthy());
  });

  describe('if room has no tasks', () => {
    beforeEach(() => {
      service.updateRoom(RoomEmptyMock);
      fixture.detectChanges();
      room = fixture.debugElement.query(By.css('.current-room'));
      name = room.nativeElement.querySelector('.room-name');
      tasks = room.nativeElement.querySelector('app-tasks');
      votes = room.nativeElement.querySelector('app-votes');
    });

    it('should show room name', () => expect(room.nativeElement.textContent).withContext('Room name').toContain(RoomMock.name));
    it('should not show tasks', () => expect(tasks).withContext('app-tasks HTML').toBeTruthy());
    it('should not show votes', () => expect(votes).withContext('app-votes HTML').toBeFalsy());
  });
});
