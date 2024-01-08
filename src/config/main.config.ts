import InMemoryPlayerRepositoryImpl from "../repository/implementation/in.memory.player.repository.impl";
import PlayerRepository from "../repository/player.repository";
import GameState from "../service/game.state";
import GameStateImpl from "../service/implementation/game.state.impl";
import CliController from "../ui/cli/cli.controller";
import Controller from "../ui/controller";

export default class MainConfig {

    private static playerRepository: PlayerRepository;
    private static gameState: GameState;
    private static controller: Controller;

    static {
        MainConfig.playerRepository = new InMemoryPlayerRepositoryImpl();
        MainConfig.gameState = new GameStateImpl(MainConfig.playerRepository);
        MainConfig.controller = new CliController(MainConfig.gameState);
    }

    static getController(): Controller {
        return MainConfig.controller;
    }

    static getGameState(): GameState {
        return MainConfig.gameState;
    }
}