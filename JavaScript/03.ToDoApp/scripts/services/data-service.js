import axios from "axios";

class dataService {
  constructor() {
    this.baseURL = "http://localhost:3000";
  }

  getData(endPoint) {
    return axios({
      method: "get",
      url: this.baseURL + "/" + endPoint
    });
  }

  postData(data, endPoint) {
    return axios({
      method: "post",
      url: this.baseURL + "/" + endPoint,
      data: data,
      headers: { "Content-Type": "application/json" }
    });
  }

  removeData(endPoint) {
    return axios({
      method: "delete",
      url: this.baseURL + "/" + endPoint
    });
  }

  updateData(data, endPoint) {
    return axios({
      method: "put",
      url: this.baseURL + "/" + endPoint,
      data: data
    });
  }
}

module.exports = new dataService();
