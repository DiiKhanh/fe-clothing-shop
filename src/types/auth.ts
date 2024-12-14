export interface Account {
  readonly _id: string;
  username: string;
  password: string;
  resetToken?: string;
  resetTokenExpiration: Date;
}
