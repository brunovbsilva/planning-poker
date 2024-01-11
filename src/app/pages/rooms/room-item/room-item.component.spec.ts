import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomItemComponent } from './room-item.component';
import { RoomService } from 'src/app/services/room.service';
import { RoomItem } from './models/room-item';
import { Router } from '@angular/router';

describe('RoomItemComponent', () => {
  let component: RoomItemComponent;
  let fixture: ComponentFixture<RoomItemComponent>;
  let roomService: RoomService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomItemComponent]
    });
    fixture = TestBed.createComponent(RoomItemComponent);
    component = fixture.componentInstance;
    component.room = new RoomItem('1', 'Room 1', roomService, router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
