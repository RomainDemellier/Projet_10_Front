import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService, MessageService } from 'primeng';
import { Reservation } from 'src/app/interface/reservation';
import { Usager } from 'src/app/interface/usager';
import { DialogEmpruntModalService } from 'src/app/service/dialog-emprunt-modal.service';
import { ReservationService } from 'src/app/service/reservation.service';
import { UsagerService } from 'src/app/service/usager.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  public reservations: Reservation[];
  public usager: Usager;
  public dataSource: MatTableDataSource<Reservation>;
  public displayedColumns: string[] =  ['titre', 'date', 'dateLimite', 'place', 'actions'];
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) public paginator: MatPaginator;

  constructor(
    private reservationService: ReservationService,
    private usagerService: UsagerService,
    private dialogService: DialogEmpruntModalService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getUsagerConnecte();
    this.getReservationsUsagerConnecte();
  }

  private getUsagerConnecte(){
    this.usagerService.getUsagerConnecte().subscribe((usager) =>{
      this.usager = usager;
    });
  }

  private getReservationsUsagerConnecte(){
    this.reservationService.getReservationsUsagerConnecte().subscribe((reservations) => {
      reservations.map(reservation => this.addPlaceDansListeReservations(reservation));
      this.reservations = reservations;
      this.dataSource = new MatTableDataSource(this.reservations);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        //return data.titre.toLowerCase().includes(filter) || data.fullNameAuteur.toLowerCase().includes(filter) || data.genre.toLowerCase().includes(filter);
        return data.livre.titre.toLowerCase().includes(filter);

      };
    })
  }

  public applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openDialog(reservation: Reservation){
    console.log(reservation);
    this.dialogService.openDialogAnnulerReservationModal(reservation).afterClosed().subscribe((res) => {
      if(res){
        this.reservationService.deleteReservation(reservation.id).subscribe(
          result => {
            this.messageService.add({severity:'info', summary:'Vous avez annulé la réservation du livre ' + reservation.livre.titre + '.', detail:''});
            this.getReservationsUsagerConnecte();
        },
        msg => {
          if(msg.status == 404){
            this.messageService.add({severity:'warn', summary:'L\'annulation de la réservation du livre ' + reservation.livre.titre + ' est impossible.', detail:''});
          }
        }
        )
      }
    });
  }

  public addPlaceDansListeReservations(reservation: Reservation): any {
    this.reservationService.getPlaceIntoListeReservations(reservation.id).subscribe((place) => {
      reservation.place = place;
      return reservation;
    });
  }

}
