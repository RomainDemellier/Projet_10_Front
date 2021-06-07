import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { UsagerComponent } from './component/usager/usager.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { ListeLivresComponent } from './component/liste-livres/liste-livres.component';
import { EmpruntComponent } from './component/emprunt/emprunt.component';
import { ReservationComponent } from './component/reservation/reservation.component';

export const appRoutes : Routes = [
    { 
        path: 'home', component: HomeComponent,
        children: [{ path: 'livres', component: ListeLivresComponent },
                   { path: 'emprunts', component: EmpruntComponent },
                   { path: 'reservations', component: ReservationComponent },
                   { path: '', redirectTo:'/home/livres', pathMatch: 'full' }
    ]
    },
    
     {
         path: 'signup', component: UsagerComponent,
         children: [{ path: '', component: SignUpComponent }]
     },
     {
        path: 'login', component: UsagerComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    { path: '', redirectTo:'/home/livres', pathMatch: 'full' }
];