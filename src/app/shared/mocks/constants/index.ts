import {IRoom} from 'src/app/pages/room/interfaces/room.interface';
import {ITask} from 'src/app/pages/room/interfaces/task.interface';
import {IVote} from 'src/app/pages/room/interfaces/vote.interface';
import {Room} from 'src/app/pages/room/models/room';
import {Task} from 'src/app/pages/room/models/task';
import {Vote} from 'src/app/pages/room/models/vote';
import {IRoomItem} from 'src/app/pages/rooms/models/room-item.inteface';
import {RoomItem} from 'src/app/pages/rooms/models/room-item';

export class ConstantMocks {
  static getTaskMock(name: string, votes: IVote[] = []): ITask {
    return new Task(name, votes);
  }
  static getVoteMock(id: string, user: string, value = 10, hidden = true): IVote {
    return new Vote(id, user, value, hidden);
  }
  static getRoomMock(name: string, creator: string, tasks: ITask[] = [], id = 'mocked id'): IRoom {
    return new Room(name, creator, tasks, id);
  }
  static getRoomItemMock(room: IRoom): IRoomItem {
    return new RoomItem(room.id!, room.name);
  }
}

export const VoteMock = ConstantMocks.getVoteMock('1', 'user 1', 10, true);
export const VoteFlipMock = ConstantMocks.getVoteMock('1', 'user 1', 10, false);
export const TaskNoVotesMock = ConstantMocks.getTaskMock('mocked task 1');
export const TaskMock = ConstantMocks.getTaskMock('mocked task 2', [VoteMock]);
export const TaskFlipMock = ConstantMocks.getTaskMock('mocked task 3', [VoteFlipMock]);
export const RoomEmptyMock = ConstantMocks.getRoomMock('mocked room', 'mocked creator');
export const RoomTaskNoVotesMock = ConstantMocks.getRoomMock(
  'mocked room',
  'mocked creator',
  [TaskNoVotesMock],
  'mocked id'
);
export const RoomTaskAndVotesMock = ConstantMocks.getRoomMock('mocked room', 'mocked creator', [TaskMock], 'mocked id');
export const RoomMock = ConstantMocks.getRoomMock(
  'mocked room',
  'mocked creator',
  [TaskMock, TaskFlipMock],
  'mocked id'
);
export const RoomItemMock = ConstantMocks.getRoomItemMock(RoomMock);
