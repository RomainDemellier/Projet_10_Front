import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { UsagerService } from 'src/app/service/usager.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { emailValidator } from 'src/app/validators/email.validator';
import { passwordValidator } from 'src/app/validators/password.validator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public get nom(){
    return this.registrationForm.get('nom');
  }

  public get prenom(){
    return this.registrationForm.get('prenom');
  }

  public get email(){
    return this.registrationForm.get('email');
  }

  public get password(){
    return this.registrationForm.get('password');
  }

  public get confirmPassword(){
    return this.registrationForm.get('confirmPassword');
  }

  constructor(
    private usagerService: UsagerService,
    private fb: FormBuilder,
    private router: Router) { }

    registrationForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(15)]],
      prenom: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, emailValidator(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      confirmPassword: ['']
    }, { validator: passwordValidator });

  ngOnInit() {
  }

  public onSubmit(): void{
    this.usagerService.createUsager(this.registrationForm.value).subscribe(() => {
      console.log("Succès");
      this.router.navigate([('/login')]);

    }, (err: HttpErrorResponse) => {
      console.log("Echec");
    });
  }
}
