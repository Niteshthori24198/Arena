
export default interface GameState {
    
    createPlayer(): number;
    getPlayerIds(): number[];
    getHealth(playerId: number): number;
    getAttack(playerId: number): number;
    getStrength(playerId: number): number;
    startFight(attackerId: number, defenderId: number): void;
    getPresentAttacker(): number | null;
    getPresentDefender(): number | null;
    isGameOver(): boolean;
    nextState(): void;
    getWinningPlayer(): number | null;
}