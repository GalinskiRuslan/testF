import $api from "@/http";

export default class RegimeService {
  static async getAllRegime() {
    return await $api.get("/regims");
  }
  static async getOneRegime(id: number) {
    return await $api.get(`/oneregim/?id=${id}`);
  }
  static async getOneRegimeWithDay(id: number) {
    return await $api.get(`/oneregimwithday/?id=${id}`);
  }
  static async getAllDays() {
    return await $api.get("/days");
  }
  static async changeRegime(
    id: number,
    dataTime: string,
    description: string,
    isActive: boolean,
    nutrition: string
  ) {
    return await $api.post("/changeregim", {
      id,
      dataTime,
      description,
      isActive,
      nutrition,
    });
  }
}
