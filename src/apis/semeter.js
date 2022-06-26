import axiosClient from "./axios";
class SemesterApi {
  async getAllSemester() {
    const url = "/semester/";
    return await axiosClient.get(url);
  }
}

const semesterAPI = new SemesterApi();
export default semesterAPI;
