import { UserResponse } from "./UserResponse";

export interface AuthResponse {
  token: string;
  user: UserResponse;
}
