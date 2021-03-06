import userAPI from "../apis/user";
class UserService {
  async login(campus, token) {
    try {
      const params = {
        idCampus: parseInt(campus),
        idToken: token.user._delegate.accessToken,
      };
      var respone = await userAPI.login(params);
    } catch (error) {
      return error.response.data;
    }
    return respone;
  }
}
const userService = new UserService();
export default userService;
