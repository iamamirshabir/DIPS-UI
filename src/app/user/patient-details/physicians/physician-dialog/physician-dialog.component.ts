import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  available: string;
  name: string;
}
@Component({
  selector: 'app-physician-dialog',
  templateUrl: './physician-dialog.component.html',
  styleUrls: ['./physician-dialog.component.css']
})
export class PhysicianDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PhysicianDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }
  myDateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
