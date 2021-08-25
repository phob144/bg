import { State } from '../enums/State';

export class SpriteMap {
    public static readonly assets: Map<State, string> = new Map([
        [State.empty, null],
        [State.door, 'door.png'],
        [State.key, 'key.png'],
        [State.monster, 'monster.png'],
        [State.player_down, 'player_down.png'],
        [State.player_east, 'player_east.png'],
        [State.player_north, 'player_north.png'],
        [State.player_north_south, 'player_north_south.png'],
        [State.player_south, 'player_south.png'],
        [State.player_up, 'player_up.png'],
        [State.player_west, 'player_west.png'],
        [State.player_west_east, 'player_west_east.png'],
        [State.sword, 'sword.png'],
        [State.wall, 'wall.png'],
    ]);
}
