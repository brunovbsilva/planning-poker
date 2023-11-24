import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomItemComponent } from './room-item.component';

describe('RoomItemComponent', () => {
  let component: RoomItemComponent;
  let fixture: ComponentFixture<RoomItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomItemComponent]
    });
    fixture = TestBed.createComponent(RoomItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
