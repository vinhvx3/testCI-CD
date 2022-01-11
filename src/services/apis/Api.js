import { XMLHttpRequest } from "xmlhttprequest";

const api = {
  path: "https://api-edulanthropy.herokuapp.com/"
};

api.get = function(params) {
  return new Promise(function(resolve, reject) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", api.path + params.url);
    xhttp.onload = function() {
      if (xhttp.status == 200) {
        resolve({ status: xhttp.status, data: JSON.parse(xhttp.responseText) });
      } else {
        reject({ status: xhttp.status, data: JSON.parse(xhttp.responseText) });
      }
    };

    if (params.headers != undefined) {
      Object.keys(params.headers).forEach(item => {
        xhttp.setRequestHeader(String(item), String(params.headers[item]));
      });
    }

    xhttp.send();
  });
};

api.put = function(params) {
  return new Promise(function(resolve, reject) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", api.path + params.url);
    xhttp.onload = function() {
      if (xhttp.status == 200) {
        resolve({ status: xhttp.status, data: JSON.parse(xhttp.responseText) });
      } else {
        reject({ status: xhttp.status, data: JSON.parse(xhttp.responseText) });
      }
    };

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    if (params.headers != undefined) {
      Object.keys(params.headers).forEach(item => {
        xhttp.setRequestHeader(String(item), String(params.headers[item]));
      });
    }

    if (params.data != undefined) {
      xhttp.send(JSON.stringify(params.data));
    } else {
      xhttp.send();
    }
  });
};

api.post = function(params) {
  return new Promise(function(resolve, reject) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", api.path + params.url);
    xhttp.onload = function() {
      if (xhttp.status == 200) {
        resolve({ status: xhttp.status, data: JSON.parse(xhttp.responseText) });
      } else {
        reject({ status: xhttp.status, data: JSON.parse(xhttp.responseText) });
      }
    };

    xhttp.setRequestHeader("Content-Type", "application/json");

    // xhttp.setRequestHeader("Accept", "*/*");
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    // xhttp.setRequestHeader(
    //   "Access-Control-Allow-Headers",
    //   "Origin, X-Requested-With, Content-Type, Accept"
    // );
    xhttp.setRequestHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    // xhttp.setRequestHeader("Accept-Encoding", "gzip, deflate, br");
    // xhttp.setRequestHeader("Connection", "keep-alive");
    // xhttp.setRequestHeader("Host", "api-edulanthropy.herokuapp.com");

    // xhttp.setRequestHeader("Sec-Fetch-Mode", "cors");
    // xhttp.setRequestHeader("Host", "http://localhost:8081/");

    if (params.headers != undefined) {
      Object.keys(params.headers).forEach(item => {
        xhttp.setRequestHeader(String(item), String(params.headers[item]));
      });
    }

    if (params.data != undefined) {
      xhttp.send(JSON.stringify(params.data));
    } else {
      xhttp.send();
    }
  });
};

api.postImage = function(params) {
  return new Promise(function(resolve, reject) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", api.path + params.url, true);

    xhttp.onload = function() {
      if (xhttp.status == 200) {
        resolve({ status: xhttp.status, item: JSON.parse(xhttp.responseText) });
      } else {
        reject({ status: xhttp.status, item: JSON.parse(xhttp.responseText) });
      }
    };

    // xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // xhttp.responseType = "json";

    // xhttp.setRequestHeader("Content-Type", "multipart/form-data;");
    xhttp.setRequestHeader(
      "Content-Type",
      "multipart/form-data; boundary=----WebKitFormBoundarygGeyFxt1CHOifA0l"
    );

    if (params.headers != undefined) {
      Object.keys(params.headers).forEach(item => {
        xhttp.setRequestHeader(String(item), String(params.headers[item]));
      });
    }

    if (params.data != undefined) {
      // var formData = new FormData();
      // formData.append("maple-photo", params.data);
      // console.log(params.data.get("maple-photo"));

      xhttp.send(params.data);
    } else {
      xhttp.send();
    }
  });
};

export default api;
