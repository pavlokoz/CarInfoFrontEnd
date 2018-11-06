import { Component, OnInit, Input, Inject } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { error } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    //#region Inputs

    @Input() Email: string;

    @Input() Password: string;
  
    //#endregion

  constructor(   
    private authorizeService: AuthorizationService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private snackBar: MatSnackBar) { }    
  ngOnInit() {
  }

  private closeDialog() {
    this.dialogRef.close();
  };

  private onSubmit() {

      this.authorizeService.authorize(this.Email, this.Password).subscribe(response => {
        this.dialogRef.close();
        this.snackBar.open("You are logged in", "Got it", {
          duration: 2000
        });
      }, error => {
      });
  };


}
