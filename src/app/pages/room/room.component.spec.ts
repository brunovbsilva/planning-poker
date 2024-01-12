import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomComponent } from './room.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RoomService } from 'src/app/services/room.service';
import { TasksComponentSpec } from 'src/app/shared/mocks/pages/tasks.component.spec';
import { VotesComponentSpec } from 'src/app/shared/mocks/pages/votes.component.spec';
import { RoomServiceProviderMock } from 'src/app/shared/mocks/service';

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;
  let service: RoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RoomComponent,
        TasksComponentSpec,
        VotesComponentSpec
      ],
      imports: [RouterTestingModule],
      providers: [RoomServiceProviderMock]
    });
    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RoomService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.room).toBeTruthy();
  });

  it('should update room', () => {
    let spyUpdate = spyOn(component.room!, 'updateValues').and.callThrough();
    service.updateRoom(component.room!);
    expect(spyUpdate).toHaveBeenCalled();
  })
});
