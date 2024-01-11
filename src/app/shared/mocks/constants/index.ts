import { Room } from "src/app/pages/room/models/room";
import { Task } from "src/app/pages/room/models/task";
import { Vote } from "src/app/pages/room/models/vote";
import { RoomItem } from "src/app/pages/rooms/room-item/models/room-item";

const any: any = jasmine.anything();
export const VoteMock = new Vote('mocked user id', 'mocked user name', 10);
export const VoteFlipMock = new Vote('mocked user id', 'mocked user name', 10, false);
export const TaskMock = new Task('mocked task', [VoteMock, VoteMock])
export const TaskFlipMock = new Task('mocked task', [VoteFlipMock, VoteMock])
export const RoomMock = new Room('mocked room', 'mocked creator', [TaskMock, TaskFlipMock], 0, 'mocked id');
export const RoomItemMock = new RoomItem('999', 'mocked name', any, any);
