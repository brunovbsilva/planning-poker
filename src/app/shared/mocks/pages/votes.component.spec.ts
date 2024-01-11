import { Component, Input } from '@angular/core';
import { IRoom } from 'src/app/pages/room/interfaces/room.interface';
import { ITask } from 'src/app/pages/room/interfaces/task.interface';
import { Card } from '../../components/card/models/card.model';

@Component({ selector: 'app-votes', template: '' })
export class VotesComponentSpec {
  @Input() room!: IRoom;
  get task(): ITask {
    return this.room.tasks[this.room.currentTask];
  };
  get flippedVotes(): boolean {
    return this.task.votes.some(vote => !vote.hidden);
  }

  public cards: Card[] = [
    new Card(1, 1),
    new Card(2, 2),
    new Card(3, 3),
    new Card(4, 5),
    new Card(1, 8),
    new Card(2, 13),
    new Card(3, 21),
    new Card(4, 34),
    new Card(1, 55),
    new Card(2, 89)
  ];
}
