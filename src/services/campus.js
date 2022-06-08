import campusAPI from "../apis/camus";

class CampusService {
  async getAllCampus() {
    try {
      var response = await campusAPI.getAllCampus();
    } catch (error) {
      return error.response.data;
    }
    return response.Data;
  }
}
const campusService = new CampusService();
export default campusService;
