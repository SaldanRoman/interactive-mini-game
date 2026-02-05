import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent() {
        return import('./components/game-board/game-board.component').then(m => m.GameBoardComponent);
    }, pathMatch: 'full' }
];
