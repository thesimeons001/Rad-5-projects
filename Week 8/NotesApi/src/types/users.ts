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
}

export interface SafeUser {
  id: string;
  username: string;
  email: string;
}

export interface JwtPayload {
  userId: string;
  username: string;
}
export interface TokenPayload {
  userId: string;
  username: string;
}