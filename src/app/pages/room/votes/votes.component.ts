import { Component, Input } from '@angular/core';
import { ICard } from '../../../shared/components/card/interfaces/card.interface';
import { Card } from '../../../shared/components/card/models/card.model';
import { hoverAnimation } from './animations/hover.animation';
import { ITask } from '../interfaces/task.interface';
import { IVote } from '../interfaces/vote.interface';
import { CardType } from '../../../shared/components/card/models/card-type.enum';
import { Vote } from '../models/vote';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IRoom } from '../interfaces/room.interface';
import { RoomService } from 'src/app/services/room.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss'],
  animations: [ hoverAnimation ]
})
export class VotesComponent {

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

  constructor(
    private userAuth: AngularFireAuth,
    private roomService: RoomService
  ) { }

  mapVote(vote: IVote): ICard {
    return new Card(CardType.HEARTS, vote.value, vote.hidden, vote.userName);
  }

  vote(value: number) {
    if(this.flippedVotes) return;
    this.userAuth.currentUser
      .then((user) => this.task.vote(new Vote(user?.uid!, user?.displayName!, value)))
      .then(() => this.roomService.updateRoom(this.room));
  }

  showVotes() {
    if(this.flippedVotes) return;
    this.task.showVotes();
    this.roomService.updateRoom(this.room);
  }

  revote() {
    this.task.revote();
    this.roomService.updateRoom(this.room);
  }

  getResult() {
    return this.task.getResult();
  }
}
