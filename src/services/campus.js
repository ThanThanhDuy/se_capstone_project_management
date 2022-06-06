import campusAPI from "../apis/camus";

class CampusService {
  async getAllCampus() {
    try {
      var response = await campusAPI.getAllCampus();
    } catch (error) {
      return error;
    }
    return response;
  }
}
const campusService = new CampusService();
export default campusService;
