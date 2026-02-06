import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GameService } from './game.service';
import { CellStatusEnum, CellStatus } from '../models/cell.type';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService]
    });
    service = TestBed.inject(GameService);
  });

  it('startGame initializes grid with one active cell', fakeAsync(() => {
    spyOn(Math, 'random').and.returnValue(0.0);
    service.startGame(1000);
    tick();
    
    let grid: CellStatus[] = [];
    service.grid$.subscribe(g => grid = g);
    
    const activeCount = grid.filter((cell: CellStatus) => cell === CellStatusEnum.ACTIVE).length;
    expect(activeCount).toBe(1);
    expect(grid[0]).toBe(CellStatusEnum.ACTIVE);
  }));

  it('startGame resets scores to zero', fakeAsync(() => {
    (service as any).playerScore$$.next(5);
    (service as any).computerScore$$.next(3);
    
    spyOn(Math, 'random').and.returnValue(0.5);
    service.startGame(1000);
    tick();
    
    let playerScore = -1;
    let computerScore = -1;
    
    service.playerScore$.subscribe(score => {
      playerScore = score;
    });
    service.computerScore$.subscribe(score => {
      computerScore = score;
    });
    
    expect(playerScore).toBe(0);
    expect(computerScore).toBe(0);
  }));

  it('onCellClicked marks correct cell selected and increments playerScore', fakeAsync(() => {
    spyOn(Math, 'random').and.returnValue(0.02);
    service.startGame(1000);
    const idx = Math.floor(0.02 * 100);
    
    service.onCellClicked(idx);
    tick();
    
    let grid: CellStatus[] = [];
    let playerScore = 0;
    
    service.grid$.subscribe(g => grid = g);
    service.playerScore$.subscribe(score => playerScore = score);
    
    expect(grid[idx]).toBe(CellStatusEnum.SELECTED);
    expect(playerScore).toBe(1);
  }));

  it('onCellClicked does nothing for wrong index', fakeAsync(() => {
    spyOn(Math, 'random').and.returnValue(0.0);
    service.startGame(1000);
    tick();
    
    let beforeScore = 0;
    let afterScore = 0;
    let grid: CellStatus[] = [];
    
    service.playerScore$.subscribe(score => {
      beforeScore = score;
    });
    
    service.onCellClicked(99);
    tick();
    
    service.playerScore$.subscribe(score => {
      afterScore = score;
    });
    service.grid$.subscribe(g => grid = g);
    
    expect(afterScore).toBe(beforeScore);
    expect(grid[0]).toBe(CellStatusEnum.ACTIVE);
  }));

  it('timeout marks cell missed and increments computerScore', fakeAsync(() => {
    spyOn(Math, 'random').and.returnValue(0.1);
    service.startGame(30);
    const idx = Math.floor(0.1 * 100);
    tick();
    
    let gridBefore: CellStatus[] = [];
    service.grid$.subscribe(g => gridBefore = g);
    expect(gridBefore[idx]).toBe(CellStatusEnum.ACTIVE);
    
    tick(30);
    
    let gridAfter: CellStatus[] = [];
    let computerScore = 0;
    service.grid$.subscribe(g => gridAfter = g);
    service.computerScore$.subscribe(score => computerScore = score);
    
    expect(gridAfter[idx]).toBe(CellStatusEnum.MISSED);
    expect(computerScore).toBe(1);
  }));

  it('gameEnded$ emits Player when playerScore reaches 10', (done) => {
    service.gameEnded$.subscribe(winner => {
      expect(winner).toBe('Player');
      done();
    });
    
    (service as any).playerScore$$.next(10);
    (service as any).nextRound();
  });

  it('gameEnded$ emits Computer when computerScore reaches 10', (done) => {
    service.gameEnded$.subscribe(winner => {
      expect(winner).toBe('Computer');
      done();
    });
    
    (service as any).computerScore$$.next(10);
    (service as any).nextRound();
  });

  it('each round uses a different cell index', fakeAsync(() => {
    (spyOn(Math, 'random') as jasmine.Spy).and.returnValues(0.0, 0.5, 0.3);
    service.startGame(50);
    const firstIdx = 0;
    tick();
    
    service.onCellClicked(firstIdx);
    tick();
    
    const secondIdx = Math.floor(0.5 * 100);
    let grid: CellStatus[] = [];
    service.grid$.subscribe(g => grid = g);
    
    expect(grid[secondIdx]).toBe(CellStatusEnum.ACTIVE);
    expect(grid[firstIdx]).toBe(CellStatusEnum.SELECTED);
  }));
});