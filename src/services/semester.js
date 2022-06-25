import semesterAPI from "../apis/semeter";

class SemesterService {
  async getAllSemester() {
    try {
      var response = await semesterAPI.getAllSemester();
    } catch (error) {
      console.log(error);
      return error.response;
    }
    console.log(response);
    // return response.data;
    return response.data;
  }
}
const semesterService = new SemesterService();
export default semesterService;
