import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { AngularFireModulesMock, AngularFireProvidersMock } from 'src/app/shared/mocks/others';
import { ModalComponentSpec } from 'src/app/shared/mocks/components/modal.component.spec';
import { RoomMock } from 'src/app/shared/mocks/constants';
import { RoomServiceProviderMock } from 'src/app/shared/mocks/service';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponentSpec],
      imports: [AngularFireModulesMock, TasksComponent],
      providers: [AngularFireProvidersMock, RoomServiceProviderMock],
    });
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    component.room = RoomMock;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
