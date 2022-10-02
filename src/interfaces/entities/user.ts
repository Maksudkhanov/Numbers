export interface IUser {
  username: string;
  password: string;
  role: UserRoles;
}

export enum UserRoles {
  "ADMIN" = "ADMIN",
  "USER" = "USER",
}
