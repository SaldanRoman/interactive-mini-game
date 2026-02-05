import { Component, inject, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GameService } from "../../services/game.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-score-panel',
    templateUrl: './score-panel.component.html',
    styleUrl: './score-panel.component.scss',
    standalone: true,
    imports: [
        CommonModule
    ],
    
})
export class ScorePanelComponent implements OnInit {
    private gameService = inject(GameService);
    
    playerScore$: BehaviorSubject<number> | undefined;
    computerScore$: BehaviorSubject<number> | undefined;

    ngOnInit() {
        this.playerScore$ = this.gameService.playerScore;
        this.computerScore$ = this.gameService.computerScore;
   }

}