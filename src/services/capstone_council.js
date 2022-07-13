import capstoneCouncilAPI from "../apis/capstone_council";

class CapstoneCouncilService {
  async getCapstoneCouncilByCodeCouncil(code) {
    try {
      var response = await capstoneCouncilAPI.getCapstoneCouncilByCodeCouncil(
        code
      );
    } catch (error) {
      console.log(error);
      return error.response;
    }
    // console.log(response);
    // return response.data;
    return response.data;
  }
}
const capstoneCouncilService = new CapstoneCouncilService();
export default capstoneCouncilService;
