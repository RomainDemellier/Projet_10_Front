import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastModule } from 'primeng/toast';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { UsagerComponent } from './component/usager/usager.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { appRoutes } from './route';
import { ListeLivresComponent } from './component/liste-livres/liste-livres.component';
import { EmpruntComponent } from './component/emprunt/emprunt.component';
import { from } from 'rxjs';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { EditerUsagerComponent } from './component/modal/editer-usager/editer-usager.component';
import { EmpruntDetailModalComponent } from './component/modal/emprunt-detail-modal/emprunt-detail-modal.component';
import { ReservationComponent } from './component/reservation/reservation.component';
import { ReservationModalComponent } from './component/modal/reservation-modal/reservation-modal.component';
import { AnnulerReservationModalComponent } from './component/modal/annuler-reservation-modal/annuler-reservation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsagerComponent,
    SignInComponent,
    SignUpComponent,
    ListeLivresComponent,
    EmpruntComponent,
    EditerUsagerComponent,
    EmpruntDetailModalComponent,
    ReservationComponent,
    ReservationModalComponent,
    AnnulerReservationModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [EmpruntDetailModalComponent,EditerUsagerComponent]
})
export class AppModule { }
