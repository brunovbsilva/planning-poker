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
  @Input() currentTask!: number;
  get task(): ITask {
    return this.room.tasks[this.currentTask];
  };
  get flippedVotes(): boolean {
    return this.task.votes.some(vote => !vote.hidden);
  }

  private cards: Card[] = [
    new Card(1),
    new Card(2),
    new Card(3),
    new Card(5),
    new Card(8),
    new Card(13),
    new Card(21),
    new Card(34),
    new Card(55),
    new Card('?'),
    new Card('☕︎')
  ];
  public cards$ = signal<Card[]>(this.cards);

  public complexity$ = signal<any>("?");
  public understanding$ = signal<any>("?");
  public compute$ = computed(() => {
    const complexity = this.complexity$();
    const understanding = this.understanding$();
    return [complexity, understanding].some(x => x == "?")
      ? "?"
      : this.getVoteByComplexity(Number(complexity), Number(understanding));
  });

  private getVoteByComplexity(complexity: number, understanding: number): string {
    const result = (complexity + understanding) / 2;
    if(result <= 3) return String(result);
    if(result < 5) return "3";
    if(result < 8) return "5";
    if(result < 13) return "8";
    return "13";
  }

  constructor(
    private userAuth: AngularFireAuth,
    private roomService: RoomService
  ) {
    this.userAuth.currentUser
      .then(user => user?.displayName)
      .then(name => this.task.votes.find(x => x.userName == name))
      .then(vote => this.cards.find(x => x.value == vote?.value))
      .then(card => {
        if (card) card.highlight = true
      });
  }

  mapVote(vote: IVote): ICard {
    return new Card(vote.value, vote.hidden, vote.userName);
  }

  vote(value: string | number) {
    if(this.flippedVotes) return;

    this.userAuth.currentUser
      .then((user) => this.task.vote(new Vote(user?.uid!, user?.displayName!, value)))
      .then(() => this.highlightCard(value.toString()))
      .finally(async () => await this.roomService.updateRoom(this.room));
  }

  private highlightCard(value: string) {
    this.cards.filter(x => x.highlight).forEach(card => card.highlight = false);
    this.cards.find(x => x.value.toString() == value)!.highlight = true;
  }

  async showVotes() {
    if(this.flippedVotes) return;
    this.task.showVotes();
    await this.roomService.updateRoom(this.room);
  }

  async revote() {
    this.task.revote();
    await this.roomService.updateRoom(this.room);
  }

  getResult() {
    return this.task.getResult();
  }
}
