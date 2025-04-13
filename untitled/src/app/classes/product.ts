export class Product {

  constructor(
    public id :number,
    public name: string,
    public  description: string,
    public  price: number,  // Use number instead of string for price
    public  quantity: number ,
    public  imageUrl:string,
    public  categoryId:number,

  ) {

  }
}
