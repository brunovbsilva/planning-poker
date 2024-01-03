import { Room } from "src/app/pages/room/models/room";
import { Task } from "src/app/pages/room/models/task";
import { Vote } from "src/app/pages/room/models/vote";

export const VoteMock = new Vote('mocked user id', 'mocked user name', 10);
export const TaskMock = new Task('mocked task', [VoteMock, VoteMock])
export const RoomMock = new Room('mocked room', 'mocked creator', [TaskMock, TaskMock], 0, 'mocked id');
