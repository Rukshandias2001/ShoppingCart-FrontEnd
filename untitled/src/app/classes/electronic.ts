import { Product } from './product';

export class Electronic extends Product {
  constructor(
    public  warranty: string, // Fixed typo: 'warrenty' to 'warranty'
    public  brand: string,
     name: string, // No need to declare `name`, `description`, `price`, and `quantity` as private if they are passed to super()
     description: string,
     price: number,
     quantity: number,
     imageUrl:string,
    categoryId:number,
    id :number
  ) {
    super(id,name, description, price, quantity,imageUrl,categoryId); // Pass the parameters correctly to the Product class constructor
  }
}
