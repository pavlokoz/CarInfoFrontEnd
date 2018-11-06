import { Component, OnInit } from '@angular/core';
import { Brand } from '../DTOModels/brand';
import { BrandService } from '../services/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  public brands: Brand[] = [];
  constructor(private brandService: BrandService) { };

  ngOnInit() {
    this.getBrands();
  };


  getBrands(): any {
    this.brandService.getBrands()
      .subscribe(response =>
        response.forEach(element => {
          this.brands.push(
            new Brand(
              element.BrandId,
              element.BrandName,
              element.Description,
              element.PhotoURL,
              element.CountryName
            )
          )
        })
      );
  };
}
