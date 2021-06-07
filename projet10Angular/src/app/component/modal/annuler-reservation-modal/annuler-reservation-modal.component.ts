import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reservation } from 'src/app/interface/reservation';

@Component({
  selector: 'app-annuler-reservation-modal',
  templateUrl: './annuler-reservation-modal.component.html',
  styleUrls: ['./annuler-reservation-modal.component.scss']
})
export class AnnulerReservationModalComponent implements OnInit {

  public reservation: Reservation;

  constructor(
    public dialogRef: MatDialogRef<AnnulerReservationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.reservation = this.data.reservation;
  }

  public annuler(annuler: Boolean){
    if(annuler){
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(false);
    }
  }

}
