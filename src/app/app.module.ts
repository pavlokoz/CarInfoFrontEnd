import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthorizationService } from './services/authorization.service'; 
import '../polyfills';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, ApplicationRef, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { Http, HttpModule } from '@angular/http';
import { MatDialogModule, MatSnackBarModule, MatCheckbox } from '@angular/material';
import { MatAutocompleteModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MainPageComponent } from './main.page/main.page.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './services/profile.service';
import { BrandService } from './services/brand.service';
import { BrandComponent } from './brand/brand.component';
import { ModelService } from './services/model.service';
import { BrandsComponent } from './brands/brands.component';
import { ModelComponent } from './model/model.component';
import { ModelsComponent } from './models/models.component';
import { UserFavoriteModelService } from './services/user.favorite.model.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    ProfileComponent,
    BrandComponent,
    BrandsComponent,
    ModelComponent,
    ModelsComponent
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    FormsModule,
    HttpModule,
    CommonModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    BrowserModule,
    BrowserAnimationsModule
    ],
  providers: [
    AuthorizationService,
    ProfileService,
    BrandService,
    ModelService,
    UserFavoriteModelService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
