import {Product} from './product';

export class Clothing extends Product{

  constructor(
    public size: string,
    public colour: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
    imageUrl:string,
    categoryId:number,
    id:number
  ) {
    super(id,name, description, price, quantity,imageUrl,categoryId); // Pass the parameters correctly to the Product class constructor
  }

}
