import axiosClient from "./axios";
class CampusApi {
  async getAllCampus() {
    const url = "campus/get-all-campus";
    return await axiosClient.get(url);
  }
}

const campusAPI = new CampusApi();
export default campusAPI;
