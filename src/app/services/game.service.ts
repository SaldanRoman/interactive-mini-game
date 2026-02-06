import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CellStatus, CellStatusEnum } from '../models/cell.type';
import { PlayersEnum, playerWinScore } from '../models/game.constants';

@Injectable()
export class GameService {
  public grid = new BehaviorSubject<CellStatus[]>(new Array(100).fill(CellStatusEnum.INACTIVE));
  public playerScore = new BehaviorSubject<number>(0);
  public computerScore = new BehaviorSubject<number>(0);
  public gameEnded = new Subject<string>();

  private timerId: ReturnType<typeof setTimeout> | undefined;
  private currentIndex: number = -1;
  private timeLimit: number = 1000;
  private availableIndices: number[] = [];

  public startGame(n: number) {
    this.timeLimit = n;
    this.resetGame();
    this.nextRound();
  }

  private resetGame() {
    this.grid.next(new Array(100).fill(CellStatusEnum.INACTIVE));
    this.playerScore.next(0);
    this.computerScore.next(0);
    this.availableIndices = Array.from({ length: 100 }, (_, i) => i);
    clearTimeout(this.timerId);
  }

  private nextRound() {
    if (this.playerScore.value >= playerWinScore || this.computerScore.value >= 10) {
      this.gameEnded.next(this.playerScore.value >= playerWinScore ? PlayersEnum.PLAYER : PlayersEnum.COMPUTER);
      return;
    }

    const randomIndex = Math.floor(Math.random() * this.availableIndices.length);
    this.currentIndex = this.availableIndices.splice(randomIndex, 1)[0];

    const currentGrid = this.grid.value;
    currentGrid[this.currentIndex] = CellStatusEnum.ACTIVE;
    this.grid.next([...currentGrid]);

    this.timerId = setTimeout(() => {
      this.handleTimeout();
    }, this.timeLimit);
  }

  public onCellClicked(index: number) {
    if (index === this.currentIndex && this.grid.value[index] === CellStatusEnum.ACTIVE) {
      clearTimeout(this.timerId);
      const currentGrid = this.grid.value;
      currentGrid[index] = CellStatusEnum.SELECTED;
      this.grid.next([...currentGrid]);
      
      this.playerScore.next(this.playerScore.value + 1);
      this.nextRound();
    }
  }

  private handleTimeout() {
    const currentGrid = this.grid.value;
    if (currentGrid[this.currentIndex] === CellStatusEnum.ACTIVE) {
      currentGrid[this.currentIndex] = CellStatusEnum.MISSED;
      this.grid.next([...currentGrid]);
      
      this.computerScore.next(this.computerScore.value + 1);
      this.nextRound();
    }
  }
}