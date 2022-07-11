import capstoneTeamAPI from "../apis/capstone_team";

class CapstoneTeamService {
  async getCapstoneTeamByCodeSemeter(code) {
    try {
      var response = await capstoneTeamAPI.getCapstoneTeamByCodeSemeter(code);
    } catch (error) {
      console.log(error);
      return error.response;
    }
    // console.log(response);
    // return response.data;
    return response.data;
  }
  async getDetailCaptoneTeams(code) {
    try {
      var response = await capstoneTeamAPI.getDetailCaptoneTeams(code);
    } catch (error) {
      console.log(error);
      return error.response;
    }
    return response.data;
  }
}
const capstoneTeamService = new CapstoneTeamService();
export default capstoneTeamService;
