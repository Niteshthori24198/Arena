import Player from "../model/player.model";

export default interface PlayerRepository {

    save(player: Player): Player;
    findById(id: number): Player;
    findAll(): Player[];
    deleteById(id: number): void;
}