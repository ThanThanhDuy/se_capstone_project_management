import profileAPI from "../apis/profile";

class ProfileService {
  async getProfileUser(code) {
    try {
      var response = await profileAPI.getProfileUser(code);
    } catch (error) {
      console.log(error);
      return error.response;
    }
    console.log(response);
    // return response.data;
    return response.data;
  }
  async updateProfileUser(code, avatar) {
    try {
      var response = await profileAPI.updateProfileUser(code, avatar);
    } catch (error) {
      console.log(error);
      return error.response;
    }
    console.log(response);
    // return response.data;
    return response.data;
  }
}
const profileService = new ProfileService();
export default profileService;
