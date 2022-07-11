import axiosClient from "./axios";
class FileApi {
  async submitFile(infoFile) {
    const { code, path, name, type } = infoFile;
    const url = `/report/submit`;
    return await axiosClient.post(url, { code, path, name, type });
  }
  async getAllFile() {
    const url = `/capstone-team/files`;
    return await axiosClient.get(url);
  }
}

const fileAPI = new FileApi();
export default fileAPI;
