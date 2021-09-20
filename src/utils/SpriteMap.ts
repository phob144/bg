import { Move } from '../algorithm/enums/Move';
import { State } from '../enums/State';

export class SpriteMap {
    public static readonly assets: Map<State, string> = new Map([
        [State.empty, null],
        [State.player_east, 'player_east.png'],
        [State.player_west, 'player_west.png'],
        [State.player_north, 'player_north.png'],
        [State.player_south, 'player_south.png'],
        [State.door, 'door.png'],
        [State.key, 'key.png'],
        [State.monster, 'monster.png'],
        [State.sword, 'sword.png'],
        [State.wall, 'wall.png'],
        // [State.player_down, 'player_down.png'],
        // [State.player_north_south, 'player_north_south.png'],
        // [State.player_up, 'player_up.png'],
        // [State.player_west_east, 'player_west_east.png'],
    ]);

    public static readonly output: Map<Move, string> = new Map([
        [Move.right, 'player_east.png'],
        [Move.left, 'player_west.png'],
        [Move.up, 'player_north.png'],
        [Move.down, 'player_south.png'],
    ]);
}
