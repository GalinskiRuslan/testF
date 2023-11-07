import $api from "@/http";
import { AuthResponse } from "@/models/AuthResponse";
import { AxiosResponse } from "axios";

export default class AuthService {
  static async login(user_email: string, password: string) {
    return $api.post("/login", { user_email, password });
  }
  static async registration(
    user_name: string,
    password: string,
    user_email: string
  ) {
    return $api.post("/registration", {
      user_name,
      password,
      user_email,
    });
  }
  static async checkIsAuth() {
    return $api.get("/checkIsAuth");
  }
}
