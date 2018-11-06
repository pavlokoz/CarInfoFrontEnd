import { Component, OnInit, Input, Inject, HostListener } from '@angular/core';
import { AuthorizationService } from "../services/authorization.service";
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { DOCUMENT } from "@angular/platform-browser";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public formInput: FormControl = new FormControl();

  public registerDialogRef: MatDialog;

  public loginDialogRef: MatDialog;

  public userName: string;
 
  //#endregion

  //#region Constructor

  constructor(
    public authService: AuthorizationService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,

    @Inject(DOCUMENT) private document: Document) {
  }

  //#endregion
  
  //#region ngOnInit
  ngOnInit() {
  }
  //#endregion

  //#region Private Methods
  private signUp() {
    let dialog = this.dialog.closeAll()
    let dialogRef = this.dialog.open(RegisterComponent, {
      width: "500px"
    });
  }

  private signIn() {
    let dialog = this.dialog.closeAll();
    let dialogRef = this.dialog.open(LoginComponent, {
      width: "500px"
    });
  }

  private logout() {
    this.authService.logout();
    this.snackBar.open("You logged out", "Got it", {
      duration: 2000
    });
  }

  private profile() {
    this.router.navigateByUrl("/profile");
  }
  //#endregion
}
