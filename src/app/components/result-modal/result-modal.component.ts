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
  @Input() winner: string | null = null;
  @Output() close = new EventEmitter<void>();

  onCloseModal() {
    this.close.emit();
  }
}