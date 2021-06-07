import { Component, OnInit, ViewChild } from '@angular/core';
import { Emprunt } from 'src/app/interface/emprunt';
import { Usager } from 'src/app/interface/usager';
import { UsagerService } from 'src/app/service/usager.service';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { EmpruntService } from 'src/app/service/emprunt.service';
import { MessageService } from 'primeng/api';
import { DialogEmpruntModalService } from 'src/app/service/dialog-emprunt-modal.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-emprunt',
  templateUrl: './emprunt.component.html',
  styleUrls: ['./emprunt.component.scss'],
  providers: [MessageService]
})
export class EmpruntComponent implements OnInit {

  public emprunts: Emprunt[];
  public usagerConnecte: Usager;
  public dataSource: MatTableDataSource<Emprunt>;
  public displayedColumns: string[] = ['titre', 'dateEmprunt', 'dateRetour', 'actions'];
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) public paginator: MatPaginator;

  constructor(
    private empruntService: EmpruntService,
    private usagerService: UsagerService,
    private authorizationService: AuthorizationService,
    private messageService: MessageService,
    private dialogService: DialogEmpruntModalService
  ) { }

  ngOnInit(): void {
    this.getUsagerConnecte();
    this.getEmpruntsUsagerConnecte();
  }

  private getUsagerConnecte(): void {
    this.usagerService.getUsagerConnecte().subscribe((usager) => {
      this.usagerConnecte = usager;
      console.log("usagerConnecte");
      console.log(this.usagerConnecte);
    });
  }

  private getEmpruntsUsagerConnecte(): void{
    this.empruntService.getEmpruntsUsagerConnecte().subscribe((emprunts) => {
      if(emprunts.length > 0){
        this.emprunts = emprunts;
        this.dataSource = new MatTableDataSource(emprunts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = function(data, filter: string): boolean {
          return data.exemplaire.livre.titre.toLowerCase().includes(filter);
      }
    };
      console.log("Succès");
    });
  }

  public openDialog(emprunt: Emprunt): void{
    this.dialogService.openDialogEmpruntDetail(emprunt)
    .afterClosed().subscribe((res) =>  {
      console.log(typeof res);
      if(res === "prolongationOk") {
        this.getEmpruntsUsagerConnecte();
        this.messageService.add({
          severity: 'info',
          summary: 'Prolongement',
          detail: 'Votre Emprunt du livre ' + emprunt.exemplaire.livre.titre.toUpperCase() + ' est prolongé de 4 semaines.'
        });
      } else {
        this.messageService.add({severity:'warn', summary: 'Pas de prolongement', detail: res});
      }
      /*} else if(res === "prolongationPasOk"){
        this.messageService.add({severity: 'warn', summary: 'Pas de prolongement', detail: 'Votre Emprunt du livre ' + emprunt.exemplaire.livre.titre.toUpperCase() + ' a déjà été prolongé de 4 semaines.'});
      } else if(res === "rendreOk"){
        this.getEmpruntsUsagerConnecte();
        this.messageService.add({severity: 'info', summary: 'Retour', detail: 'Le livre ' + emprunt.exemplaire.livre.titre + ' a été rendu.'});
      } else if(res === "rendrePasOk"){
        this.messageService.add({severity: 'warn', summary: 'Problème retour', detail: 'Le livre ' + emprunt.exemplaire.livre.titre.toUpperCase() + ' n\'a pu être rendu.'});
      } else if(res === 403){
        this.messageService.add({severity: 'warn', summary: 'Pas de prolongement', detail: 'Vous ne pouvez pas prolonger l\'emprunt du livre ' + emprunt.exemplaire.livre.titre.toLocaleUpperCase() + ' parce que la date butoir est dépassé.'})
      }*/
    })
  }

  public applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
