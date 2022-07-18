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
  async getDetailGrades() {
    const url = `/admin/grades`;
    return await axiosClient.get(url);
  }
  async updateGradeDetail(marks) {
    const url = `/admin/grades`;
    return await axiosClient.post(url, { marks });
  }
  async deleteGradeDetail(id) {
    const url = `/admin/grades`;
    return await axiosClient.delete(url, {
      data: {
        id,
      },
    });
  }
}

const gradeAPI = new GradeApi();
export default gradeAPI;
