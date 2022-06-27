import axiosClient from "./axios";
class GradeApi {
  async getGradeByReportCode(code) {
    const url = `/grade/${code}`;
    return await axiosClient.get(url);
  }
  async submitGrade({ code, details }) {
    const url = `/grade/submit`;
    return await axiosClient.post(url, { code, details });
  }
}

const gradeAPI = new GradeApi();
export default gradeAPI;
