import axiosClient from "./axios";
class CapstoneTeamApi {
  async getCapstoneTeamByCodeSemeter(code) {
    const url = "/capstone-team/search";
    return await axiosClient.get(url, code && { params: { code } });
  }
  async getDetailCaptoneTeams(code) {
    const url = `/admin/capstone-team/${code}`;
    return await axiosClient.get(url);
  }
}

const capstoneTeamAPI = new CapstoneTeamApi();
export default capstoneTeamAPI;
