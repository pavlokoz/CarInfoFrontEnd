import { Component, OnInit, Input } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgModule, Pipe } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import 'rxjs/add/Observable/throw';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() Email: string;
  @Input() Password: string;
  @Input() FirstName: string;
  @Input() LastName: string;
  @Input() ConfirmPassword: string;

  myform: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  private namePattern: string = "^[а-яА-ЯёЁa-zA-Zʼ'ї Ї і І є Є-]{2,40}$";
  private passwordPattern: string = '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{8,20})';
  private emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$';

  errorMessage: string;

  constructor(
    private authorizeService: AuthorizationService, 
    private dialogRef: MatDialogRef<RegisterComponent>, 
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  register(): void {    
    this.authorizeService.register(this.Email, this.Password, this.FirstName, this.LastName, this.ConfirmPassword)
      .subscribe(
      response => {
        this.snackBar.open("You are registered! Check your email", "Got it", {
          duration: 2000
        });
        this.dialogRef.close();
      },
      error => {
      }
      );
  }
  closeDialog() {
    this.dialogRef.close();
  }
  createFormControls() {
    this.firstName = new FormControl('', [
      Validators.required,
      Validators.pattern(this.namePattern)

    ]);
    this.lastName = new FormControl('', [
      Validators.required,
      Validators.pattern(this.namePattern)
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern)

    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordPattern)
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordPattern)
    ])
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('confirmPassword').value
      ? null : { 'mismatch': true };
  }

  createForm() {
    this.myform = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    }, this.passwordMatchValidator);
  }

}
