import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ResultModalComponent } from './result-modal.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ResultModalComponent', () => {
  let component: ResultModalComponent;
  let fixture: ComponentFixture<ResultModalComponent>;
  let dialogRefSpy: { close: jasmine.Spy };

  beforeEach(async () => {
    dialogRefSpy = { close: jasmine.createSpy('close') };

    await TestBed.configureTestingModule({
      imports: [ResultModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { winner: null } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display winner when data.winner is set', () => {
    component.data.winner = 'Player';
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.modal')) || fixture.debugElement;
    expect(el.nativeElement.textContent).toContain('Player');
  });

  it('should close dialog when onCloseModal is called', () => {
    component.onCloseModal();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});