import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { GameBoardComponent } from './game-board.component';
import { GameService } from '../../services/game.service';
import { ResultModalComponent } from '../result-modal/result-modal.component';
import { BehaviorSubject, Subject } from 'rxjs';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;
  let mockGameService: any;

  beforeEach(async () => {
    // Create a mock service with the same shape as GameService
    mockGameService = {
      grid: new BehaviorSubject<string[]>(new Array(100).fill('blue')),
      playerScore: new BehaviorSubject<number>(0),
      computerScore: new BehaviorSubject<number>(0),
      gameEnded: new Subject<string>(),
      startGame: jasmine.createSpy('startGame'),
      onCellClicked: jasmine.createSpy('onCellClicked')
    };

    await TestBed.configureTestingModule({
      imports: [ GameBoardComponent, ResultModalComponent, FormsModule ],
      providers: [ { provide: GameService, useValue: mockGameService } ]
    }).overrideComponent(GameBoardComponent, {
      remove: { providers: [GameService] }
    }).compileComponents();

    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render 100 cells', () => {
    const cells = fixture.debugElement.queryAll(By.css('.cell'));
    expect(cells.length).toBe(100);
  });

  it('should call startGame when the Start button is clicked', () => {
    component.nValue = 500;
    const startBtn = fixture.debugElement.query(By.css('button')).nativeElement;
    startBtn.click();
    fixture.detectChanges();
    
    expect(mockGameService.startGame).toHaveBeenCalledWith(500);
    expect(component.isGameActive).toBeTrue();
  });

  it('should call onCellClicked in service when a cell is clicked', () => {
    const cells = fixture.debugElement.queryAll(By.css('.cell'));
    cells[5].nativeElement.click();
    
    expect(mockGameService.onCellClicked).toHaveBeenCalledWith(5);
  });

  it('should display the result modal when gameEnded emits', fakeAsync(() => {
    component.ngOnInit();
    mockGameService.gameEnded.next('Player');
    tick();
    fixture.detectChanges();
    
    expect(component.winner).toBe('Player');
    const modal = fixture.debugElement.query(By.css('app-result-modal'));
    expect(modal).toBeTruthy();
  }));

  it('should disable inputs when the game is active', fakeAsync(() => {
    component.isGameActive = true;
    fixture.detectChanges();
    tick();
    
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    
    expect(input.disabled).toBe(true);
    expect(button.disabled).toBe(true);
  }));
});