import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exemplaire } from 'src/app/interface/exemplaire';
import { Livre } from 'src/app/interface/livre';
import { ReservationService } from 'src/app/service/reservation.service';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss']
})
export class ReservationModalComponent implements OnInit {

  public livre: Livre;

  constructor(
    private reservationService: ReservationService,
    public dialogRef: MatDialogRef<ReservationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.livre = this.data.livre;
  }

  public reserver(reserver: Boolean){
    if(reserver){
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(false);
    }
  }

}
