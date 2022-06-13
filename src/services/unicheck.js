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

      // var form = new FormData();
      // form.append("file", fs.createReadStream(dirname));
      // const FormData = require('form-data');
      // const fs = require('fs');

      const form = new FormData();
      form.append("file", fs.readFileSync(dirname));

      const header = {
        headers: {
          ...form.getHeaders(),
          Accept: "application/vnd.api+json",
          Authorization: "Bearer <access_token>",
          "Content-Type": "multipart/form-data",
        },
        data: form,
        timeout: 50000,
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        },
      };

      const data = await axios.post(`${baseUrl}/files`, form, header);
      console.log(fileId, fileName, data.data);
    } catch (error) {
      console.log(error);
    }
  }
};
