import axiosClient from "./axios";
class CapstoneTeamApi {
  async getCapstoneTeamByCodeSemeter(code) {
    const url = "/capstone-team/search";
    return await axiosClient.get(url, code && { params: { code } });
  }
}

const capstoneTeamAPI = new CapstoneTeamApi();
export default capstoneTeamAPI;
