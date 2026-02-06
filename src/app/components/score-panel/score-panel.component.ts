import { Component, inject, OnInit } from "@angular/core";
import { Observable } from "rxjs";
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
    
    public playerScore$: Observable<number> | undefined;
    public computerScore$: Observable<number> | undefined;

    public ngOnInit() {
        this.playerScore$ = this.gameService.playerScore$;
        this.computerScore$ = this.gameService.computerScore$;
   }

}