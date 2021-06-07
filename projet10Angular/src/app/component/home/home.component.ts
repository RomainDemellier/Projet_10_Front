import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthorizationService } from '../../service/authorization.service';
import { Router } from '@angular/router';
import { UsagerService } from '../../service/usager.service';
import { LogoutService } from 'src/app/service/logout.service';
import { Usager } from 'src/app/interface/usager';
import { LoginService } from 'src/app/service/login.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEmpruntModalService } from 'src/app/service/dialog-emprunt-modal.service';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ListeLivresComponent } from '../liste-livres/liste-livres.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {

  public usagerConnecte: Usager;

  constructor(
    private authorizationService: AuthorizationService,
    private usagerService: UsagerService,
    private logoutService: LogoutService,
    private loginService: LoginService,
    private router: Router,
    private messageService: MessageService,
    private dialog: MatDialog,
    private dialogService: DialogEmpruntModalService
  ) {
  }

  ngOnInit(): void {
    this.getUsagerConnecte();
  }

  private getUsagerConnecte(): void {
    this.usagerService.getUsagerConnecte().subscribe((usager) => {
      this.usagerConnecte = usager;
      console.log("dans Home");
      console.log(this.usagerConnecte);
    });
  }

  public logout(): void {
    this.authorizationService.resetToken();
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  public openDialog(): void {
    this.dialogService.openDialogEditer(this.usagerConnecte)
      .afterClosed().subscribe((res) => {
        console.log(res);
        if (res != "exit") {
          if (res) {
            console.log("Edition éffectuée");
            this.getUsagerConnecte();
          } else {
            console.log("Edition non effectuée");
            this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Désolé la modificaiton de votre profil n a pu être effectuée' });
          }
        }
      })
  }
}
