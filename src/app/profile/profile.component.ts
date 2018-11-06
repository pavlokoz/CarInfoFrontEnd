import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProfileService } from '../services/profile.service';
import { User } from '../DTOModels/user';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: User;

  constructor(    
    private route: ActivatedRoute,
    private location: Location,
    private profileService: ProfileService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthorizationService) { };

  ngOnInit() {
    if (this.authService.getToken() != null)
    {
      this.getInfo();
    }  
    else
    {
      this.router.navigateByUrl("");
      this.snackBar.open("Not permitted", "Got It");
    }
  };

  getInfo(): any 
  {

    this.profileService.getUserInfo()
      .subscribe(response => 
        {
            this.user = new User 
            (
              response.Email,
              response.FullName
            ) 
      })
  };
}