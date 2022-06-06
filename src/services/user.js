import userAPI from "../apis/user";
class UserService {
  async login(campus, token) {
    try {
      var respone = await userAPI.login(campus, token);
    } catch (error) {
      return error;
    }
    return respone;
  }
}
const userService = new UserService();
export default userService;
