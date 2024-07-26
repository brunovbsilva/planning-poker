import { Component, Input } from '@angular/core';
import { IRoom } from 'src/app/pages/room/interfaces/room.interface';
import { ITask } from 'src/app/pages/room/interfaces/task.interface';
import { Card } from '../../components/card/models/card.model';

@Component({ selector: 'app-votes', template: '' })
export class VotesComponentSpec {
  @Input() room!: IRoom;
  get task(): ITask {
    return this.room.tasks[0];
  }
  get flippedVotes(): boolean {
    return this.task.votes.some(vote => !vote.hidden);
  }

  private votesMap = [1, 2, 3, 5];
  public cards: Card[] = this.votesMap.map(x => new Card(x));
}
