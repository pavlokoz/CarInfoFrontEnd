import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main.page/main.page.component';
import { ProfileComponent } from './profile/profile.component';
import { BrandsComponent }from './brands/brands.component';
import { BrandComponent } from './brand/brand.component';
import { ModelsComponent } from './models/models.component';
import { ModelComponent } from './model/model.component';

const routes: Routes = [
  { path: '', component: MainPageComponent, data: { animation: 'main' } },
  { path: 'brands', component: BrandsComponent, data: { animation: 'brands' } },
  { path: 'profile', component: ProfileComponent, data: { animation: 'profile' } },
  { path: 'brand/:brandId', component: BrandComponent, data: { animation: 'brand' } },
  { path: 'brand/:brandId/models', component: ModelsComponent, data: { animation: 'models' } },
  { path: 'brand/:brandId/model/:modelId', component: ModelComponent, data: { animation: 'brand' } },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRoutingModule { }
