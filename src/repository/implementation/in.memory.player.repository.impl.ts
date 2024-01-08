import ResourceAbsentError from "../../error/resource.absent.error";
import Player from "../../model/player.model";
import PlayerRepository from "../player.repository";

export default class InMemoryPlayerRepositoryImpl implements PlayerRepository {

    private readonly players: Player[] = [];

    save(player: Player): Player {

        let p = player.clone();

        if (player.id && player.id > 0) {

            let b = false;

            for (let _p of this.players) {

                if (_p && _p.id === player.id) {
                    b = true;
                    break;
                }
            }

            if (!b) {
                throw new ResourceAbsentError(`Player not found with id ${player.id}`);
            }

            this.players[this.players.findIndex(p => p && p.id === player.id)] = p;
        } else {
            p.id = this.players.length + 1;
            this.players.push(p);
        }

        return p;
    }

    findById(id: number): Player {

        for (let player of this.players) {
            if (player && player.id === id) {
                return player;
            }
        }

        throw new ResourceAbsentError(`Player not found with id ${id}`);
    }

    findAll(): Player[] {
        return [... this.players.filter(p => p && true)];
    }
    
    deleteById(id: number): void {

        for (let i in this.players) {

            if (this.players[i] && this.players[i].id === id) {
                delete this.players[i];
                break;
            }
        }
    }
}