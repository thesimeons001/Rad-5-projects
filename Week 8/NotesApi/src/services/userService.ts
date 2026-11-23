import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

import type {
  CreateUserInput,
  LoginInput,
  User,
  UserRole,
} from "../types/users.js";

export const usersFile = path.join(process.cwd(), "data", "users.json");

// Read users from the JSON file
export const readUsers = (): User[] => {
  const data = fs.readFileSync(usersFile, "utf-8");

  const users = JSON.parse(data) as Array<
    Omit<User, "role"> & { role?: UserRole }
  >;

  // Give existing users the default "user" role
  return users.map((user) => ({
    ...user,
    role: user.role === "admin" ? "admin" : "user",
  }));
};

// Save users to the JSON file
export const saveUsers = (users: User[]): void => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

// Register a new user
export const registerUser = (input: CreateUserInput): User => {
  const users = readUsers();

  const emailExists = users.some(
    (user) => user.email.toLowerCase() === input.email.toLowerCase()
  );

  const usernameExists = users.some(
    (user) => user.username.toLowerCase() === input.username.toLowerCase()
  );

  if (emailExists || usernameExists) {
    throw new Error("Username or email already exists");
  }

  const newUser: User = {
    id: randomUUID(),
    username: input.username,
    email: input.email.toLowerCase(),
    password: input.password,
    role: "user",
  };

  users.push(newUser);
  saveUsers(users);

  return newUser;
};

// Find an existing user during login
export const loginUser = (input: LoginInput): User | null => {
  const users = readUsers();

  const user = users.find(
    (existingUser) =>
      existingUser.email.toLowerCase() === input.email.toLowerCase()
  );

  return user || null;
};