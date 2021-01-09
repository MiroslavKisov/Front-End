export class Product {
  constructor(
    public name: string,
    public price: number,
    public description: string,
    public picture: string,
    public _acl?: {
      creator: string
    },
    public _id?: string,
    ) {}
}