import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesComponent } from './votes.component';

describe('VotesComponent', () => {
  let component: VotesComponent;
  let fixture: ComponentFixture<VotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VotesComponent]
    });
    fixture = TestBed.createComponent(VotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
