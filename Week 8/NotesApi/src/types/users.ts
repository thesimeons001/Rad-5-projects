export type UserRole = "user" | "admin";

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface SafeUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface JwtPayload {
  userId: string;
  username: string;
  role: UserRole;
}