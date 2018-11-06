import { Component, OnInit } from '@angular/core';
import { BrandService } from '../services/brand.service';
import { Brand } from '../DTOModels/brand';

@Component({
  selector: 'app-main.page',
  templateUrl: './main.page.component.html',
  styleUrls: ['./main.page.component.css']
})
export class MainPageComponent implements OnInit {

  topBrands: Brand[] = [];
    
  constructor(private brandService: BrandService) { };

  ngOnInit() {
    this.getTopBrands();
  };

  getTopBrands(): any 
  {
    this.brandService.getTopFourBrands()
      .subscribe(response => 
      {
          response.forEach(element => {
            this.topBrands.push(
              new Brand
              (
                element.BrandId,
                element.BrandName,
                element.Description,
                element.PhotoURL,
                element.CountryName
              ))
          });
      });
  };
}
