import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVoteItemComponent } from './modal-vote-item.component';

describe('ModalVoteItemComponent', () => {
  let component: ModalVoteItemComponent;
  let fixture: ComponentFixture<ModalVoteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalVoteItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalVoteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
