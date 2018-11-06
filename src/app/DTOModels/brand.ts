export class Brand {
    BrandId: number;
    BrandName: string;
    Description: string;
    PhotoURL: string;
    CountryName: string;

    constructor(brandId: number, brandName: string, description: string, photoURL: string,countryName: string) {
        this.BrandId = brandId;
        this.BrandName = brandName;
        this.Description = description;
        this.PhotoURL = photoURL;
        this.CountryName = countryName;
    }
}