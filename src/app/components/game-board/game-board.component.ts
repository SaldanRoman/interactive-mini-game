import { CommonModule } from "@angular/common";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { GameService } from "../../services/game.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ScorePanelComponent } from "../score-panel/score-panel.component";
import { ResultModalComponent } from "../result-modal/result-modal.component";
import { CellStatus } from "../../models/cell.type";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Observable } from "rxjs";
import { inputMax, inputStep, inputMin } from "../../models/game.constants";

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ScorePanelComponent,
    ResultModalComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [GameService],
})

export class GameBoardComponent implements OnInit {
  private gameService = inject(GameService);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog)

  public grid$: Observable<CellStatus[]> | undefined;

  public nValue: number = 1000;
  public isGameActive: boolean = false;
  public winner: string | null = null;

  public inputStep = inputStep;
  public inputMin = inputMin;
  public inputMax = inputMax;

public ngOnInit() { 
  this.grid$ = this.gameService.grid$;
  
  this.gameService.gameEnded$.pipe(
    takeUntilDestroyed(this.destroyRef)
  ).subscribe(res => {
    this.dialog.open(ResultModalComponent, {
        data: { winner: res }
    })
    
    this.isGameActive = false;
 });
}

public onStart() {
  this.winner = null;
  this.isGameActive = true;
  this.gameService.startGame(this.nValue);
}

public cellClicked(index: number) {
  this.gameService.onCellClicked(index);
}

public closeModal() {
  this.winner = null;
}

}