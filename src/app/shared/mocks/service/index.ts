import {RoomService} from 'src/app/services/room/room.service'
import {RoomServiceMock} from './room.service.spec'

export const RoomServiceProviderMock = [{provide: RoomService, useClass: RoomServiceMock}]
