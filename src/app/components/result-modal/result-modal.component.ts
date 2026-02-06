import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-result-modal',
  templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],

})
export class ResultModalComponent {
  private dialogRef: MatDialogRef<ResultModalComponent> = inject(MatDialogRef<ResultModalComponent>);
  public data = inject(MAT_DIALOG_DATA);


  public onCloseModal(): void {
    this.dialogRef.close()
  }
}