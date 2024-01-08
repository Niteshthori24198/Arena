import GameState from "../../service/game.state";
import Controller from "../controller";
let readlineSync = require('readline-sync');

export default class CliController implements Controller {

    private readonly gameState: GameState;

    constructor(gameState: GameState) {
        this.gameState = gameState;
    }

    private printPlayer(id: number) {
        console.log(`Player: { id: ${id}, health: ${this.gameState.getHealth(id)}, attack: ${this.gameState.getAttack(id)}, strength: ${this.gameState.getStrength(id)} }`);
    }

    private printPlayers() {
        let pids = this.gameState.getPlayerIds();
        for (let i = 0; i < pids.length; i++) {
            this.printPlayer(pids[i]);
        }
    }

    private startFight() {

        function askBoolean(msg: string): boolean {

            let b = true;
            while (b) {
                switch (readlineSync.question(msg)) {
                    case 'y':
                        b = false;
                        break;
                    case 'n':
                        return false;
                    default:
                        console.log('Invalid input');
                }
            }

            return true;
        }

        let p1 = +readlineSync.question(`Choose first player: `);
        let p2 = +readlineSync.question(`Choose second player: `);

        if (!askBoolean('Continue fight? y/n: ')) {
            return;
        }

        let prompt = askBoolean(`Do you want to have a stepper prompt? y/n: `);
        this.gameState.startFight(p1, p2);

        for (; !this.gameState.isGameOver(); this.gameState.nextState()) {
            this.printPlayer(p1);
            this.printPlayer(p2);
            while (prompt && !askBoolean(`Roll dice now? y/n: `));
        }

        console.log();
        console.log('Winner:: ');
        this.printPlayer(this.gameState.getWinningPlayer()!);
        console.log();
    }

    public start() {

        while (true) {

            let op = +readlineSync.question(`Choose:\n 1. Create New Player\n 2. Show all Available players\n 3. Start Fight\n 4. Exit\n Make your choice : `);

            try {
                switch (op) {
                    case 1:
                        this.gameState.createPlayer();
                        console.log('Player created successfully');
                        break;
                    case 2:
                        this.printPlayers();
                        break;
                    case 3:
                        this.startFight();
                        break;
                    case 4:
                        return;
                    default:
                        console.log('Wrong input');
                }
            } catch (error) {
                console.error((error as Error).message);
                // console.error(error);
            }
        }
    }
}
