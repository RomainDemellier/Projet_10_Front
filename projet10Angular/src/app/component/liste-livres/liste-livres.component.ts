import { Component, OnInit, AfterViewInit, Input, Directive, ViewChild } from '@angular/core';
import { LivreService } from 'src/app/service/livre.service';
import { Livre } from 'src/app/interface/livre';
import { Observable, Subject } from 'rxjs';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { UsagerService } from 'src/app/service/usager.service';
import { Emprunt } from 'src/app/interface/emprunt';
import { Usager } from 'src/app/interface/usager';
import { EmpruntService } from 'src/app/service/emprunt.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/service/login.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogEmpruntModalService } from 'src/app/service/dialog-emprunt-modal.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Exemplaire } from 'src/app/interface/exemplaire';
import { ReservationService } from 'src/app/service/reservation.service';
import { Reservation } from 'src/app/interface/reservation';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-livre',
  templateUrl: './liste-livres.component.html',
  styleUrls: ['./liste-livres.component.scss'],
  providers: [MessageService],
})
export class ListeLivresComponent implements OnInit {

  public livres: Livre[];
  public dataSource: MatTableDataSource<Livre>;
  public displayedColumns: string[] =  ['titre', 'fullNameAuteur', 'genre', 'nbreExemplaires', 'dateRetourPlusProche', 'nbreReservations',];
  public usagerConnecte: Usager;
  public reservation: Reservation;
  public isLogged: Boolean;
  public anyNbreExemplairesToZero: Boolean;
  private livre: Livre;
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) public paginator: MatPaginator;

  constructor(
    private livreService: LivreService,
    private usagerService: UsagerService,
    private empruntService: EmpruntService,
    private reservationService: ReservationService,
    private authorizationService: AuthorizationService,
    private loginService: LoginService,
    private messageService: MessageService,
    private dialogService: DialogEmpruntModalService,
    private dialog: MatDialog,
    private titleService: Title
    ) { }

  ngOnInit(): void {

    this.titleService.setTitle("Projet10");
    this.getLivres();
    this.getUsagerConnecte();
  }

  private getLivres(): void {
    this.livreService.getLivresDisponibles().subscribe(livres => {
      livres.map((livre) => {
        this.addField(livre);
      });
      this.livres = livres;
      console.log(this.livres);
      this.dataSource = new MatTableDataSource(this.livres);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return data.titre.toLowerCase().includes(filter) || (data.auteur.prenom + ' ' + data.auteur.nom).toLowerCase().includes(filter) || data.genre.toLowerCase().includes(filter);

      };
    });
  }

  private getUsagerConnecte(): void {
    this.usagerService.getUsagerConnecte().subscribe((usager) => {
      this.usagerConnecte = usager;
      if(this.anyTozero() && this.usagerConnecte.role == "USER"){
        this.displayedColumns = ['titre', 'fullNameAuteur', 'genre', 'nbreExemplaires', 'dateRetourPlusProche', 'nbreReservations', 'actions'];
      }
      console.log("usagerConnecte");
      console.log(this.usagerConnecte);
      const allReadyLogged: Boolean = this.loginService.isAllReadyLogged();
      console.log(allReadyLogged);
      if(!allReadyLogged){
        console.log("allreadylogged");
        this.messageService.add({severity:'success', summary:'Bienvenue ' + this.usagerConnecte.prenom, detail:''});
        this.loginService.logged();
      }
    });
  }

  public applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public anyTozero(): Boolean {
    for(let i = 0;i < this.livres.length;i++){
      if(this.livres[i].nbreExemplaires == 0){
        return true;
      }
    }
    return false;
  }

  public openDialog(livre: Livre){
    this.livre = livre;
    this.dialogService.openDialogReservationModal(livre)
    .afterClosed().subscribe((res) => {
      if(res){
        this.reservation = {id: null, livre:livre, usager:this.usagerConnecte, date:null, dateLimit:null, actif:null};
        this.reservationService.createReservation(this.reservation).subscribe(
          reservation => {
            this.getLivres()
          this.messageService.add({severity:'success', summary:'Votre réservation du livre ' + reservation.livre.titre + ' a été effectué', detail:''});
          },
          msg => {
            console.log(msg)
            if(msg.status == 400){
              this.messageService.add({severity:'warn', summary:'Vous avez déjà réservé le livre ' + livre.titre + '.', detail:''});
            } else if(msg.status == 409){
              // this.messageService.add({severity:'warn', summary:'Vous ne pouvez pas réserver le livre ' + livre.titre + ' car le nombre limite de réservations a été atteint.', detail:''});
              this.messageService.add({severity:'warn', summary: msg.error, detail:''});

            }
          });
      }
    })
  }

  public addField(livre: Livre): Livre {
    if (livre.nbreExemplaires === 0) {
      this.addDate(livre);
      this.addReservable(livre);
    }
    return livre;
  }

  public addDate(livre: Livre): void {
    this.livreService.getDateRetourPlusProche(livre.id).subscribe((date) => {
        livre.dateRetourPlusProche = date;
    });
  }

  public addReservable(livre: Livre): void {
    this.livreService.isLivreReservable(livre.id).subscribe((isReservable) => {
        livre.reservable = isReservable;
    });
  }
}
