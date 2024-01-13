import { IRoom } from "src/app/pages/room/interfaces/room.interface";
import { ITask } from "src/app/pages/room/interfaces/task.interface";
import { IVote } from "src/app/pages/room/interfaces/vote.interface";
import { Room } from "src/app/pages/room/models/room";
import { Task } from "src/app/pages/room/models/task";
import { Vote } from "src/app/pages/room/models/vote";
import { IRoomItem } from "src/app/pages/rooms/room-item/interfaces/room-item.inteface";
import { RoomItem } from "src/app/pages/rooms/room-item/models/room-item";

const any: any = jasmine.anything();
export class ConstantMocks {
  static getTaskMock(name: string, votes: IVote[] = []): ITask {
    return new Task(name, votes);
  }
  static getVoteMock(id: string, user: string, value: number = 10, hidden: boolean = true): IVote {
    return new Vote(id, user, value, hidden);
  }
  static getRoomMock(name: string, creator: string, tasks: ITask[] = [], currentTask: number = 0, id: string = 'mocked id'): IRoom {
    return new Room(name, creator, tasks, currentTask, id);
  }
  static getRoomItemMock(room: IRoom): IRoomItem {
    return new RoomItem(room.id!, room.name, any, any);
  }
}

export const VoteMock = ConstantMocks.getVoteMock('1', 'user 1', 10, true);
export const VoteFlipMock = ConstantMocks.getVoteMock('1', 'user 1', 10, false);
export const TaskNoVotesMock = ConstantMocks.getTaskMock('mocked task 1');
export const TaskMock = ConstantMocks.getTaskMock('mocked task 2', [VoteMock]);
export const TaskFlipMock = ConstantMocks.getTaskMock('mocked task 3', [VoteFlipMock]);
export const RoomEmptyMock = ConstantMocks.getRoomMock('mocked room', 'mocked creator');
export const RoomTaskNoVotesMock = ConstantMocks.getRoomMock('mocked room', 'mocked creator', [TaskNoVotesMock], 0, 'mocked id');
export const RoomTaskAndVotesMock = ConstantMocks.getRoomMock('mocked room', 'mocked creator', [TaskMock], 0, 'mocked id');
export const RoomMock = ConstantMocks.getRoomMock('mocked room', 'mocked creator', [TaskMock, TaskFlipMock], 0, 'mocked id');
export const RoomItemMock = ConstantMocks.getRoomItemMock(RoomMock);
