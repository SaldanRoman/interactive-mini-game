import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-result-modal',
  templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ],

})
export class ResultModalComponent {
  @Input() public winner: string | null = null;
  @Output() public closed = new EventEmitter<void>();

  public onCloseModal(): void {
    this.closed.emit();
  }
}