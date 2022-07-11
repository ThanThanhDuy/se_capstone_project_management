import fileAPI from "../apis/file";

class FileService {
  async submitFile(infoFile) {
    try {
      var response = await fileAPI.submitFile(infoFile);
    } catch (error) {
      console.log(error);
      return error.response;
    }
    // console.log(response);
    // return response.data;
    return response.data;
  }
  async getAllFile() {
    try {
      var response = await fileAPI.getAllFile();
    } catch (error) {
      console.log(error);
      return error.response;
    }
    // console.log(response);
    // return response.data;
    return response.data;
  }
}
const fileService = new FileService();
export default fileService;
