import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { Card } from './models/card.model';
import { CardType } from './models/card-type.enum';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ICard } from './interfaces/card.interface';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';



describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let card: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.card = new Card(CardType.CLUBS, 1, false, undefined);
    card = fixture.debugElement.query(By.css('.card'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getCardType', () => {
    type CardTypeTest = { card: ICard, expected: string };
    let itemsForTest: CardTypeTest[] = [
      { card: new Card(CardType.HEARTS, 1), expected: "\u2665" },
      { card: new Card(CardType.DIAMONDS, 1), expected: "\u2666" },
      { card: new Card(CardType.SPADES, 1), expected: "\u2660" },
      { card: new Card(CardType.CLUBS, 1), expected: "\u2663" }
    ];

    itemsForTest.forEach(item => {
      it(`should return ${item.expected} when card is ${item.card.type}`, () => {
        component.card = item.card;
        expect(component.getCardType()).toEqual(item.expected);
      });
    })
  });

  describe('getCardValue', () => {
    type CardValueTest = { card: ICard, expected: string | number };
    let itemsForTest: CardValueTest[] = [
      { card: new Card(CardType.HEARTS, 1), expected: "A" },
      { card: new Card(CardType.HEARTS, 2), expected: 2 },
      { card: new Card(CardType.HEARTS, 5), expected: 5 },
      { card: new Card(CardType.HEARTS, 10), expected: 10 },
      { card: new Card(CardType.HEARTS, 11), expected: "J" },
      { card: new Card(CardType.HEARTS, 12), expected: "Q" },
      { card: new Card(CardType.HEARTS, 13), expected: "K" },
      { card: new Card(CardType.HEARTS, 99), expected: 99 }
    ];

    itemsForTest.forEach(item => {
      it(`should return ${item.expected} when card is ${item.card.value}`, () => {
        component.card = item.card;
        expect(component.getCardValue()).toEqual(item.expected);
      });
    })
  });

  it('on mouse enter should call @HostListener and set isHovered to true', () => {
    component.isHovered = false;
    const event = new MouseEvent('mouseenter', { bubbles: true, cancelable: true });
    card.nativeElement.dispatchEvent(event);
    expect(component.isHovered).toBeTruthy();
  });

  it('on mouse leave should call @HostListener and set isHovered to false', () => {
    component.isHovered = true;
    const event = new MouseEvent('mouseleave', { bubbles: true, cancelable: true });
    card.nativeElement.dispatchEvent(event);
    expect(component.isHovered).toBeFalsy();
  });
});
