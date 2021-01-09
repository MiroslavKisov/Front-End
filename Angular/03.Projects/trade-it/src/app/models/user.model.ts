import { Rate } from './rate.model';

export class User {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public address: string,
    public phone: string,
    public rating: Rate[],
    public picture: string,
    public _id?: string,
  ) {}
}