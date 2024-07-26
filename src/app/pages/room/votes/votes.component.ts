import {AfterViewInit, Component, computed, effect, Input, model, signal, ViewChild} from '@angular/core'
import {ICard} from '../../../shared/components/card/models/card.interface'
import {Card} from '../../../shared/components/card/models/card.model'
import {hoverAnimation} from './animations/hover.animation'
import {IVote} from '../interfaces/vote.interface'
import {Vote} from '../models/vote'
import {IRoom} from '../interfaces/room.interface'
import {RoomService} from 'src/app/services/room/room.service'
import {ModalVoteItemComponent} from './modal-vote-item/modal-vote-item.component'
import {ModalComponent} from '../../../shared/components/modal/modal.component'
import {CardComponent} from '../../../shared/components/card/card.component'
import {MainButtonDirective} from '../../../shared/directives/main-button/main-button.directive'
import {UserService} from '../../../services/user/user.service'

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss'],
  animations: [hoverAnimation],
  standalone: true,
  imports: [MainButtonDirective, CardComponent, ModalComponent, ModalVoteItemComponent],
})
export class VotesComponent implements AfterViewInit {
  @ViewChild('complexityModal') complexityModal!: ModalComponent
  @Input() room!: IRoom
  currentTask$ = model.required<number>()
  get task() {
    return this.room.tasks[this.currentTask$()]
  }
  get flippedVotes(): boolean {
    return this.task.votes.some(vote => !vote.hidden)
  }

  private list = [1, 2, 3, 5, 8, 13, 21, 34, 55, '?', '☕︎']
  private cards: Card[] = this.list.map(x => new Card(x))
  public cards$ = signal<Card[]>(this.cards)
  public complexity$ = signal<any>('?')
  public understanding$ = signal<any>('?')
  public compute$ = computed(() => {
    const complexity = this.complexity$()
    const understanding = this.understanding$()
    return [complexity, understanding].some(x => x == '?')
      ? '?'
      : this.getVoteByComplexity(Number(complexity), Number(understanding))
  })

  constructor(
    private userService: UserService,
    private roomService: RoomService
  ) {
    effect(() => {
      const value = this.task.votes.find(x => x.userId == this.userService.user$()?.id)?.value
      if (value) this.highlightCard(value.toString())
      else this.highlightCard()
    })
  }

  ngAfterViewInit(): void {
    const value = this.task.votes.find(x => x.userId == this.userService.user$()?.id)?.value
    if (value) this.highlightCard(value.toString())
  }

  mapVote(vote: IVote): ICard {
    return new Card(vote.value, vote.hidden, vote.userName)
  }

  async vote(value: string | number) {
    if (this.flippedVotes) return
    if (this.userService.user$()) {
      this.task.vote(new Vote(this.userService.user$()!.id, this.userService.user$()!.name, value))
      this.highlightCard(value.toString())
      await this.roomService.updateRoom(this.room)
    }
  }

  private highlightCard(value?: string) {
    this.cards.filter(x => x.highlight).forEach(card => (card.highlight = false))
    if (value) this.cards.find(x => x.value.toString() == value)!.highlight = true
  }

  async showVotes() {
    if (this.flippedVotes) return
    this.task.showVotes()
    await this.roomService.updateRoom(this.room)
  }

  async revote() {
    this.task.revote()
    await this.roomService.updateRoom(this.room)
  }

  getResult() {
    return this.task.getResult()
  }

  private getVoteByComplexity(complexity: number, understanding: number): string {
    const result = (complexity + understanding) / 2
    if (result <= 3) return String(result)
    if (result < 5) return '3'
    if (result < 8) return '5'
    if (result < 13) return '8'
    return '13'
  }

  async computeVote() {
    await this.vote(this.compute$())
      .then(() => this.resetComplexityModal())
      .finally(() => this.complexityModal.close())
  }

  private resetComplexityModal() {
    this.complexity$.set('?')
    this.understanding$.set('?')
  }
}
