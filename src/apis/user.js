import axiosClient from "./axios";
class UserApi {
  async login(campusId, token) {
    const url = `/users/login?campusId=${campusId}`;
    console.log(axiosClient.post(url, token));
    return axiosClient.post(url, token);
  }
}

const userAPI = new UserApi();
export default userAPI;
