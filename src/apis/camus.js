import axiosClient from "./axios";
class CampusApi {
  async getAllCampus() {
    const url = "campuses/login";
    return await axiosClient.get(url);
  }
}

const campusAPI = new CampusApi();
export default campusAPI;
