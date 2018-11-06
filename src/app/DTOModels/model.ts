export class Model {
    ModelId: number;
    ModelName: string;
    PhotoURL: string;
    AddInfo: string;
    TypeName: string;
    CarTypeName: string;
    FuelTypes: string;
    BrandName: string;
    Photos: string[];

    constructor(modelId: number, modelName: string, addInfo: string, photoURL: string, typeName: string, carTypeName: string, fuelTypes: string, brandName: string = null, photos: string[] = []) {
        this.ModelId = modelId;
        this.ModelName = modelName;
        this.AddInfo = addInfo;
        this.PhotoURL = photoURL;
        this.TypeName = typeName;
        this.CarTypeName = carTypeName;
        this.FuelTypes = fuelTypes;
        this.BrandName = brandName;
        this.Photos = photos;
    }
}