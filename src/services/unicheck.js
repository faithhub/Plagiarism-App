const axios = require("axios");
const path = require("path");
const fs = require("fs");
const qs = require("qs");
const FormData = require("form-data");
const clientId = "3973b1aa1fcd69c677b5";
const clientSecret = "8a6ff76bbb735ded85208afaf52b98e34d603869";
const grantType = "client_credentials";
const baseUrl = "https://api.unicheck.com";
const dir = "src/public/files";

axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    if (error.response && error.response.data) {
      return Promise.reject(error.response);
    }
    if (error.data) {
      return Promise.reject(error.data);
    }
    return Promise.reject(error.message);
  }
);

module.exports = class {
  static async auth() {
    try {
      const header = {
        headers: {},
        timeout: 10000,
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        },
      };
      const params = {
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      };

      const { data } = await axios.post(
        `${baseUrl}/oauth/access-token`,
        qs.stringify(params),
        header
      );
      //   console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async uploadFile(fileName, fileId) {
    try {
      const auth = await this.auth();
      const accessToken = auth.access_token;
      var dirname = path.resolve(dir, fileName);

      var form = new FormData();
      form.append("file", fs.createReadStream(dirname));

      //   var accessToken =
      //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzOTczYjFhYTFmY2Q2OWM2NzdiNSIsImp0aSI6IjI2NjMwMjEiLCJpYXQiOjE2NTUwNjU3NjcsIm5iZiI6MTY1NTA2NTc2NywiZXhwIjoxNjU3NjU3NzY3LCJzdWIiOiI4MzcxMjgiLCJzY29wZXMiOltdfQ.RqPQ-a8ZZJ7As8-Plbsw_b-zNP7Pna61H_g4I5PKTaxdrJSohl0Gmhy2epsQ25Et3RYKQY0q68pVZr3hFVrWZou1akfplcTnuNRoaTd8Y2h4dFsD21TczbJhxS0XUiNNxV0V1B3UFvu0ookv4-WjYnwrSSwD6ouRPtk3Ggf1h8E";
      const header = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "content-type": "multipart/form-data",
          Accept: "application/vnd.api+json",
        },
        data: form,
        timeout: 10000,
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        },
      };
      //   const params = {
      //     file: fs.createReadStream(dirname),
      //   };
      //   console.log(form);
      const data = await axios.post(`${baseUrl}/files`, form, header);
      console.log(fileId, fileName, data.data);
    } catch (error) {
      console.log(error);
    }
  }
};
