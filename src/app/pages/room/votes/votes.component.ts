import {Component, computed, Input, signal} from '@angular/core';
import { ICard } from '../../../shared/components/card/interfaces/card.interface';
import { Card } from '../../../shared/components/card/models/card.model';
import { hoverAnimation } from './animations/hover.animation';
import { ITask } from '../interfaces/task.interface';
import { IVote } from '../interfaces/vote.interface';
import { Vote } from '../models/vote';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IRoom } from '../interfaces/room.interface';
import { RoomService } from 'src/app/services/room.service';
import { ModalVoteItemComponent } from './modal-vote-item/modal-vote-item.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MainButtonDirective } from '../../../shared/directives/main-button/main-button.directive';

@Component({
    selector: 'app-votes',
    templateUrl: './votes.component.html',
    styleUrls: ['./votes.component.scss'],
    animations: [hoverAnimation],
    standalone: true,
    imports: [MainButtonDirective, CardComponent, ModalComponent, ModalVoteItemComponent]
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
    new Card(1),
    new Card(2),
    new Card(3),
    new Card(5),
    new Card(8),
    new Card(13),
    new Card(21),
    new Card('?'),
    new Card('☕︎')
  ];

  public complexity = signal<any>("?");
  public understandment = signal<any>("?");
  public compute = computed(() => {
    const complexity = this.complexity();
    const understandment = this.understandment();
    return [complexity, understandment].some(x => x == "?")
      ? "?" 
      : this.getVoteByComplexity(Number(complexity), Number(understandment));
  });

  private getVoteByComplexity(complexity: number, understandment: number): string {
    const result = (complexity + understandment) / 2;
    if(result <= 3) return String(result);
    if(result < 5) return "3";
    if(result < 8) return "5";
    if(result < 13) return "8";
    return "13"; 
  }

  constructor(
    private userAuth: AngularFireAuth,
    private roomService: RoomService
  ) { }

  mapVote(vote: IVote): ICard {
    return new Card(vote.value, vote.hidden, vote.userName);
  }

  vote(value: string | number) {
    if(this.flippedVotes) return;
    this.userAuth.currentUser
      .then((user) => this.task.vote(new Vote(user?.uid!, user?.displayName!, value)))
      .finally(() => this.roomService.updateRoom(this.room));
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
