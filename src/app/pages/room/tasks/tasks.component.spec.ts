import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { AngularFireModulesMock, AngularFireProvidersMock } from 'src/app/shared/mocks/others';
import { ModalComponentSpec } from 'src/app/shared/mocks/components/modal.component.spec';
import { RoomService } from 'src/app/services/room.service';
import { RoomMock, TaskMock } from 'src/app/shared/mocks/constants';
import { RoomServiceProviderMock } from 'src/app/shared/mocks/service';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let service: RoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TasksComponent,
        ModalComponentSpec
      ],
      imports: [AngularFireModulesMock],
      providers: [
        AngularFireProvidersMock,
        RoomServiceProviderMock
      ]
    });
    fixture = TestBed.createComponent(TasksComponent);
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
    let roomSpy: {
      nextTask: jasmine.Spy,
      previousTask: jasmine.Spy,
      setTask: jasmine.Spy,
      createTask: jasmine.Spy,
      deleteTask: jasmine.Spy
    }
    beforeEach(() => {
      updateRoomSpy = spyOn(service, 'updateRoom');
      roomSpy = {
        nextTask: spyOn(component.room, 'nextTask').and.callThrough(),
        previousTask: spyOn(component.room, 'previousTask').and.callThrough(),
        setTask: spyOn(component.room, 'setTaskIndex').and.callThrough(),
        createTask: spyOn(component.room, 'createTask').and.callThrough(),
        deleteTask: spyOn(component.room, 'deleteTask').and.callThrough()
      }
    });
    afterEach(() => {
      expect(updateRoomSpy).toHaveBeenCalledTimes(1);
    });

    describe('nextTask', () => {
      beforeEach(() => {
        component.room.currentTask = 0;
        component.nextTask()
      });

      it('should call room.nextTask', () => expect(roomSpy.nextTask).toHaveBeenCalled());
      it('should increment room.currentTask', () => expect(component.room.currentTask).toBe(1));
    });

    describe('previousTask', () => {
      beforeEach(() => {
        component.room.currentTask = 1;
        component.previousTask()
      });

      it('should call room.previousTask', () => expect(roomSpy.previousTask).toHaveBeenCalled());
      it('should decrement room.currentTask', () => expect(component.room.currentTask).toBe(0));
    });

    describe('setTask', () => {
      beforeEach(() => {
        component.room.currentTask = 0;
        component.setTask(1)
      });

      it('should call room.setTaskIndex', () => expect(roomSpy.setTask).toHaveBeenCalled());
      it('should set room.currentTask', () => expect(component.room.currentTask).toBe(1));
    });

    describe('createTask', () => {
      beforeEach(() => {
        component.createTask('mocked task created');
      });

      it('should call room.createTask', () => expect(roomSpy.createTask).toHaveBeenCalled());
      it('should push new task', () => expect(component.room.tasks.slice(-1)[0].name).toBe('mocked task created'));
    });

    describe('deleteTask', () => {
      beforeEach(() => {
        component.room.tasks = [TaskMock]
        component.deleteTask(component.room.tasks[0]);
      });

      it('should call room.deleteTask', () => expect(roomSpy.deleteTask).toHaveBeenCalled());
      it('should delete task', () => expect(component.room.tasks.length).toBe(0));
    });
  })
});
