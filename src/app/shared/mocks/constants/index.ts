import { Room } from "src/app/pages/room/models/room";
import { Task } from "src/app/pages/room/models/task";
import { Vote } from "src/app/pages/room/models/vote";
import { RoomItem } from "src/app/pages/rooms/room-item/models/room-item";

const any: any = jasmine.anything();
export const VoteMock = new Vote('mocked user id 1', 'mocked user name 1', 10);
export const VoteFlipMock = new Vote('mocked user id 2', 'mocked user name 2', 10, false);
export const TaskMock = new Task('mocked task 1', [VoteMock])
export const TaskFlipMock = new Task('mocked task 2', [VoteFlipMock])
export const RoomMock = new Room('mocked room', 'mocked creator', [TaskMock, TaskFlipMock], 0, 'mocked id');
export const RoomEmptyMock = new Room('mocked room', 'mocked creator', [], 0, 'mocked id');
export const RoomItemMock = new RoomItem(RoomMock.id!, RoomMock.name, any, any);
