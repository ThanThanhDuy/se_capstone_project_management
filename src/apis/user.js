import axiosClient from "./axios";
class UserApi {
  async login(params) {
    const url = `/user/login`;
    return axiosClient.post(url, params);
  }
}

const userAPI = new UserApi();
export default userAPI;
