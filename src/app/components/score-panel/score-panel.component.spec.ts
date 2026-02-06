import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { ScorePanelComponent } from './score-panel.component';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';

describe('ScorePanelComponent', () => {
  let component: ScorePanelComponent;
  let fixture: ComponentFixture<ScorePanelComponent>;
  let mockGameService: any;

  beforeEach(async () => {
    mockGameService = {
      playerScore$: new BehaviorSubject<number>(0).asObservable(),
      computerScore$: new BehaviorSubject<number>(0).asObservable(),
      playerScoreSubject: new BehaviorSubject<number>(0),
      computerScoreSubject: new BehaviorSubject<number>(0)
    };
    
    // Store references to the subjects so we can update them later
    mockGameService.playerScoreSubject = new BehaviorSubject<number>(0);
    mockGameService.computerScoreSubject = new BehaviorSubject<number>(0);
    mockGameService.playerScore$ = mockGameService.playerScoreSubject.asObservable();
    mockGameService.computerScore$ = mockGameService.computerScoreSubject.asObservable();

    await TestBed.configureTestingModule({
      imports: [ ScorePanelComponent, CommonModule ],
      providers: [ { provide: GameService, useValue: mockGameService } ]
    }).overrideComponent(ScorePanelComponent, {
      set: {
        providers: [ { provide: GameService, useValue: mockGameService } ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(ScorePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should assign playerScore$ and computerScore$ from service on init', () => {
    expect(component.playerScore$).toBeDefined();
    expect(component.computerScore$).toBeDefined();
  });

  it('should render score values when subjects emit', () => {
    // initial values
    let scoreEls = fixture.debugElement.queryAll(By.css('.score'));

    expect(scoreEls.length).toBeGreaterThanOrEqual(2);
    expect(scoreEls[0].nativeElement.textContent).toContain('Player');
    expect(scoreEls[1].nativeElement.textContent).toContain('Computer');

    expect(scoreEls[0].nativeElement.textContent).toContain('0');
    expect(scoreEls[1].nativeElement.textContent).toContain('0');

    // update values
    mockGameService.playerScoreSubject.next(3);
    mockGameService.computerScoreSubject.next(2);
    fixture.detectChanges();

    const updated = fixture.debugElement.queryAll(By.css('.score'));
    expect(updated[0].nativeElement.textContent).toContain('3');
    expect(updated[1].nativeElement.textContent).toContain('2');
  });
});
