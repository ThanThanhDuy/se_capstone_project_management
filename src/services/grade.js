import gradeAPI from "../apis/grade";

class GradeService {
  async getGradeByReportCode(code) {
    try {
      var response = await gradeAPI.getGradeByReportCode(code);
    } catch (error) {
      console.log(error);
      return error.response;
    }
    console.log(response);
    // return response.data;
    return response.data;
  }
  async submitGrade(data) {
    try {
      var response = await gradeAPI.submitGrade(data);
    } catch (error) {
      console.log(error);
      return error.response;
    }
    console.log(response);
    // return response.data;
    return response;
  }
}
const gradeService = new GradeService();
export default gradeService;
