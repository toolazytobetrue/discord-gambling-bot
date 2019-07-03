export interface IGames {
    addGame(pairId: number, amount: string, win: boolean, gameType: string, server: string): Promise<any>;
    voidPair(pairId: number): Promise<any>;
}