import campusAPI from "../apis/campus";

class CampusService {
  async getAllCampus() {
    try {
      var response = await campusAPI.getAllCampus();
    } catch (error) {
      console.log(error);
      return error.response;
    }
    console.log(response);
    // return response.data;
    return response.data;
  }
}
const campusService = new CampusService();
export default campusService;
