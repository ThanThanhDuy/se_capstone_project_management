import axiosClient from "./axios";
class ReportApi {
  async getReportByCapstoneTeamCode(code) {
    const url = `/report/${code}`;
    return await axiosClient.get(url);
  }
  async getDetailReportByReportCode(code) {
    const url = `/report/detail/${code}`;
    return await axiosClient.get(url);
  }
}

const reportAPI = new ReportApi();
export default reportAPI;
