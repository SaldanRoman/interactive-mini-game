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
      playerScore: new BehaviorSubject<number>(0),
      computerScore: new BehaviorSubject<number>(0)
    };

    await TestBed.configureTestingModule({
      imports: [ ScorePanelComponent, CommonModule ],
      providers: [ { provide: GameService, useValue: mockGameService } ]
    }).overrideComponent(ScorePanelComponent, {
      remove: { providers: [GameService] }
    }).compileComponents();

    fixture = TestBed.createComponent(ScorePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should assign playerScore$ and computerScore$ from service on init', () => {
    expect(component.playerScore$).toBe(mockGameService.playerScore);
    expect(component.computerScore$).toBe(mockGameService.computerScore);
  });

  it('should render score values when subjects emit', () => {
    // initial values
    const scoreEls = fixture.debugElement.queryAll(By.css('.score'));

    expect(scoreEls.length).toBeGreaterThanOrEqual(2);
    expect(scoreEls[0].nativeElement.textContent).toContain('Player');
    expect(scoreEls[1].nativeElement.textContent).toContain('Computer');

    expect(scoreEls[0].nativeElement.textContent).toContain('0');
    expect(scoreEls[1].nativeElement.textContent).toContain('0');

    // update values
    mockGameService.playerScore.next(3);
    mockGameService.computerScore.next(2);
    fixture.detectChanges();

    const updated = fixture.debugElement.queryAll(By.css('.score'));
    expect(updated[0].nativeElement.textContent).toContain('3');
    expect(updated[1].nativeElement.textContent).toContain('2');
  });
});
