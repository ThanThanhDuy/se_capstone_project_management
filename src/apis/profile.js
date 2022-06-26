import axiosClient from "./axios";
class ProfileApi {
  async getProfileUser(code) {
    console.log(code);
    const url = "/user/profile";
    return await axiosClient.get(url, { params: { code } });
  }
  async updateProfileUser(code, avatar) {
    const url = "/user/profile";
    return await axiosClient.put(url, { code, avatar });
  }
}

const profileAPI = new ProfileApi();
export default profileAPI;
