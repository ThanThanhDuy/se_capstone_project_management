import reportAPI from "../apis/report";

class ReportService {
  async getReportByCapstoneTeamCode(code) {
    try {
      var response = await reportAPI.getReportByCapstoneTeamCode(code);
    } catch (error) {
      console.log(error);
      return error.response;
    }
    // console.log(response);
    // return response.data;
    return response.data;
  }
  async getDetailReportByReportCode(code) {
    try {
      var response = await reportAPI.getDetailReportByReportCode(code);
    } catch (error) {
      console.log(error);
      return error.response;
    }
    // console.log(response);
    // return response.data;
    return response.data;
  }
}
const reportService = new ReportService();
export default reportService;
