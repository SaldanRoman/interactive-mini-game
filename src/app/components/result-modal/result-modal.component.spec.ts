import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ResultModalComponent } from './result-modal.component';

describe('ResultModalComponent', () => {
  let component: ResultModalComponent;
  let fixture: ComponentFixture<ResultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ResultModalComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display winner when `winner` input is set', () => {
    component.winner = 'Player';
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.modal')) || fixture.debugElement;
    expect(el.nativeElement.textContent).toContain('Player');
  });

  it('should emit close when onCloseModal is called', () => {
    spyOn(component.closed, 'emit');
    component.onCloseModal();
    expect(component.closed.emit).toHaveBeenCalled();
  });
});
