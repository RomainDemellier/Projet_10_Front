import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login } from 'src/app/interface/login';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [MessageService]
})
export class SignInComponent implements OnInit {

  private login: Login;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private authorizationService: AuthorizationService,
    private router: Router,
    private messageService: MessageService
  ) { }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  ngOnInit(): void {
    this.loginService.logout();
  }

  public onSubmit(): void{
    this.loginService.authenticate(this.loginForm.value).subscribe((data:any) => {
      console.log("Succès ");
      this.authorizationService.initializeToken(data);
      //this.loginService.logged();
      this.router.navigate(['/home']);
    },
    (err: HttpErrorResponse) => { 
      console.log("Erreur");
      this.messageService.add({severity:'error', summary:'Echec', detail:'Désolé ça n\'a pas fonctionné.'}); 
    });
  }
}
