import { TestBed, ComponentFixture } from '@angular/core/testing';
import { GameBoardComponent } from './game-board.component';
import { MatDialog } from '@angular/material/dialog';
import { GameService } from '../../services/game.service';
import { ResultModalComponent } from '../result-modal/result-modal.component';
import { BehaviorSubject, Subject } from 'rxjs';

describe('GameBoardComponent', () => {
  let fixture: ComponentFixture<GameBoardComponent>;
  let component: GameBoardComponent;
  let gameServiceSpy: jasmine.SpyObj<GameService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let gridSubject: BehaviorSubject<string[]>;
  let gameEndedSubject: Subject<string>;

  beforeEach(async () => {
    gridSubject = new BehaviorSubject<string[]>(Array(100).fill('blue'));
    gameEndedSubject = new Subject<string>();

    gameServiceSpy = jasmine.createSpyObj('GameService', ['startGame', 'onCellClicked'], {
      grid$: gridSubject.asObservable(),
      gameEnded$: gameEndedSubject.asObservable()
    });
    
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [GameBoardComponent],
      providers: [
        { provide: GameService, useValue: gameServiceSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).overrideComponent(GameBoardComponent, {
      set: {
        providers: [
          { provide: GameService, useValue: gameServiceSpy },
          { provide: MatDialog, useValue: dialogSpy }
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize grid$ from GameService', () => {
    expect(component.grid$).toBeDefined();
    component.grid$?.subscribe(grid => {
      expect(grid).toBeDefined();
      expect(grid.length).toBe(100);
    });
  });

  it('onStart calls gameService.startGame and updates state', () => {
    component.nValue = 500;
    component.isGameActive = false;
    component.winner = 'Player';
    
    component.onStart();
    
    expect(gameServiceSpy.startGame).toHaveBeenCalledWith(500);
    expect(component.isGameActive).toBeTrue();
    expect(component.winner).toBeNull();
  });

  it('cellClicked delegates to gameService.onCellClicked', () => {
    component.cellClicked(42);
    expect(gameServiceSpy.onCellClicked).toHaveBeenCalledWith(42);
  });

  it('closeModal resets winner to null', () => {
    component.winner = 'Computer';
    component.closeModal();
    expect(component.winner).toBeNull();
  });

  it('should open ResultModal when gameEnded emits', (done) => {
    component.isGameActive = true;
    
    gameEndedSubject.next('Player');
    
    setTimeout(() => {
      expect(dialogSpy.open).toHaveBeenCalledWith(ResultModalComponent, { data: { winner: 'Player' } });
      expect(component.isGameActive).toBeFalse();
      done();
    }, 0);
  });
});