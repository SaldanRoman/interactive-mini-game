// Type: typescript
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService]
    });
    service = TestBed.inject(GameService);
  });

  it('startGame picks a yellow cell at deterministic index', () => {
    spyOn(Math, 'random').and.returnValue(0.0); // will pick index 0
    service.startGame(1000);
    expect(service.grid.value[0]).toBe('yellow');
  });

  it('timeout marks cell red and increments computerScore', fakeAsync(() => {
    spyOn(Math, 'random').and.returnValue(0.1); // index = floor(0.1*100)=10
    service.startGame(30);
    const idx = Math.floor(0.1 * 100);
    expect(service.grid.value[idx]).toBe('yellow');

    tick(30); // trigger timeout
    expect(service.grid.value[idx]).toBe('red');
    expect(service.computerScore.value).toBe(1);
  }));

  it('nextRound emits gameEnded when playerScore >= 10', () => {
    const spy = jasmine.createSpy('ended');
    service.gameEnded.subscribe(spy);

    service.playerScore.next(10);
    // access private nextRound for test trigger
    (service as any).nextRound();

    expect(spy).toHaveBeenCalledWith('Player');
  });

  it('nextRound emits gameEnded when computerScore >= 10', () => {
    const spy = jasmine.createSpy('ended');
    service.gameEnded.subscribe(spy);

    service.computerScore.next(10);
    (service as any).nextRound();

    expect(spy).toHaveBeenCalledWith('Computer');
  });
});