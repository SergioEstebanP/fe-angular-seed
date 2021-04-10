import { Region } from "./region";

export class Client {
  id!: number;
  name: string | undefined;
  surname: string | undefined;
  createdAt: string | undefined;
  nextView: string | undefined;
  email: string | undefined;
  region: Region | undefined;
  picture: string | undefined;
}
