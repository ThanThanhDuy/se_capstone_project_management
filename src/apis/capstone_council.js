import axiosClient from "./axios";
class CapstoneCouncilApi {
  async getCapstoneCouncilByCodeCouncil(code) {
    const url = `admin/capstone-council/${code}`;
    return await axiosClient.get(url);
  }
}

const capstoneCouncilApi = new CapstoneCouncilApi();
export default capstoneCouncilApi;
