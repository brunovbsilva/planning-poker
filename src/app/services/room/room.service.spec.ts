import { TestBed } from '@angular/core/testing';
import { RoomService } from './room.service';
import { AngularFireModulesMock, AngularFireProvidersMock } from '../../shared/mocks/others';

describe('RoomService', () => {
  let service: RoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModulesMock],
      providers: [AngularFireProvidersMock],
    });
    service = TestBed.inject(RoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
