import { CommonModule } from "@angular/common";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { GameService } from "../../services/game.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { ScorePanelComponent } from "../score-panel/score-panel.component";
import { ResultModalComponent } from "../result-modal/result-modal.component";
import { CellStatus } from "../../models/cell.type";

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
  ],
  providers: [GameService],
})

export class GameBoardComponent implements OnInit {
  private gameService = inject(GameService);
  private destroyRef = inject(DestroyRef);

  grid$: BehaviorSubject<CellStatus[]> | undefined;

  nValue: number = 1000;
  isGameActive: boolean = false;
  winner: string | null = null;

ngOnInit() { 
  this.grid$ = this.gameService.grid;
  
  this.gameService.gameEnded.pipe(
    takeUntilDestroyed(this.destroyRef)
  ).subscribe(res => {
    this.winner = res;
    this.isGameActive = false;
 });
}

onStart() {
  this.winner = null;
  this.isGameActive = true;
  this.gameService.startGame(this.nValue);
}

cellClicked(index: number) {
  this.gameService.onCellClicked(index);
}

closeModal() {
  this.winner = null;
}

}