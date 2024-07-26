import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomComponent } from './room.component';
import { RoomService } from 'src/app/services/room/room.service';
import { TasksComponentSpec } from 'src/app/shared/mocks/pages/tasks.component.spec';
import { VotesComponentSpec } from 'src/app/shared/mocks/pages/votes.component.spec';
import { RoomServiceProviderMock } from 'src/app/shared/mocks/service';
import { RoomMock } from 'src/app/shared/mocks/constants';

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;
  let service: RoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksComponentSpec, VotesComponentSpec],
      imports: [RoomComponent],
      providers: [RoomServiceProviderMock],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;
    service.updateRoom(RoomMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
