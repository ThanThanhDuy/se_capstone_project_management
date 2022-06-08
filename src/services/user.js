import userAPI from "../apis/user";
class UserService {
  async login(campus, token) {
    try {
      const params = {
        CampusId: parseInt(campus),
        IdToken: token.user._delegate.accessToken,
      };
      var respone = await userAPI.login(params);
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
    return respone;
  }
}
const userService = new UserService();
export default userService;
