import Constant from "../../config/constant";
import IllegalArgumentError from "../../error/illegal.argument.error";
import IllegalStateError from "../../error/illegal.state.error";
import Player from "../../model/player.model";
import PlayerRepository from "../../repository/player.repository";
import GameState from "../game.state";


export default class GameStateImpl implements GameState {

    private readonly playerRepository: PlayerRepository;
    private attacker?: Player;
    private defender?: Player;
    private winner?: Player | null;

    constructor(playerRepository: PlayerRepository) {
        this.playerRepository = playerRepository;
    }

    createPlayer(): number {

        let player = new Player(undefined, Constant.INITIAL_PLAYER_HEALTH, Constant.INITIAL_PLAYER_ATTACK, Constant.INITIAL_PLAYER_STRENGTH);

        player = this.playerRepository.save(player);

        return player.id as number;
    }

    getPlayerIds(): number[] {

        let players = this.playerRepository.findAll();

        return players.map(p => p.id) as number[];
    }

    getHealth(playerId: number): number {

        let p = this.playerRepository.findById(playerId);

        return p.health;
    }

    getAttack(playerId: number): number {

        let p = this.playerRepository.findById(playerId);

        return p.attack;
    }

    getStrength(playerId: number): number {

        let p = this.playerRepository.findById(playerId);

        return p.strength;
    }

    startFight(playerId1: number, playerId2: number): void {
        
        if (
            [this.attacker?.id, this.defender?.id].includes(playerId1) &&
            [this.attacker?.id, this.defender?.id].includes(playerId2)
        ) {
            return;
        }
        if (this.winner === null) {
            throw new IllegalStateError("Fight has not been ended yet");
        }
        if (playerId1 == playerId2) {
            throw new IllegalArgumentError("Both players cannot be same");
        }

        let _a = this.attacker;
        let _d = this.defender;
        let _w = this.winner;
        let p1: Player, p2: Player;

        try {
            p1 = this.playerRepository.findById(playerId1);
            p2 = this.playerRepository.findById(playerId2);
        } catch (error) {
            this.attacker = _a;
            this.defender = _d;
            this.winner = _w;

            throw error;
        }

        if (p1.health <= p2.health) {
            this.attacker = p1;
            this.defender = p2;
        } else {
            this.attacker = p2;
            this.defender = p1;
        }
        
        this.winner = null;
    }

    getPresentAttacker(): number | null {

        return this.attacker?.id ?? null;
    }

    getPresentDefender(): number | null {

        return this.defender?.id ?? null;
    }

    isGameOver(): boolean {

        if (this.winner === undefined) {
            throw new IllegalStateError("Game has not been started yet");
        }

        return this.winner !== null;
    }

    nextState(): void {

        if (this.winner) {
            return;
        }

        let attackerDiceValue = Math.floor(Math.random() * 6) + 1;
        let defenderDiceValue = Math.floor(Math.random() * 6) + 1;

        let attackingPower = attackerDiceValue * this.attacker!.attack;
        let defendingStrength = defenderDiceValue * this.defender!.strength;

        if (attackingPower > defendingStrength) {

            let damagePower = attackingPower - defendingStrength;
            this.defender!.health -= damagePower;
        }

        this.playerRepository.save(this.attacker!);
        
        if (this.defender!.health <= 0) {
            this.winner = this.attacker;
            this.playerRepository.deleteById(this.defender!.id!);
            this.attacker = undefined;
            this.defender = undefined;
        } else {
            this.playerRepository.save(this.defender!);
        }
        
        if (!this.winner) {
            [this.attacker, this.defender] = [this.defender, this.attacker];
        }
    }

    getWinningPlayer(): number | null {

        return this.winner?.id ?? null;
    }
}