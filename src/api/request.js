/* eslint-disable no-unused-vars */
import axios from "axios";
import qs from "qs";
import router from "../router";
import { Message, Loading } from "element-ui";

//定义loading变量
let loading;
// 开启加载动画
function startLoading() {
  //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: "LOADING……",
    background: "rgba(0, 0, 0, 0.7)"
  });
}
// 关闭加载动画
function endLoading() {
  //使用Element loading-close 方法
  loading.close();
}
// 定义needLoadingRequestCount变量
let needLoadingRequestCount = 0;
// 封装展示loading动画
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}
// 封装关闭loading动画
export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}

axios.defaults.timeout = 300000;
axios.defaults.headers.post["Content-Type"] =
  "application/json";

// if (sessionStorage.getItem("token")) {
//   axios.defaults.headers.post["Authorization"] = 'Bearer ' + sessionStorage.getItem("token");
//   axios.defaults.headers.get["Authorization"] = 'Bearer ' + sessionStorage.getItem("token");
// }

//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.data = config.data;
    // // 从本地储存获取token
    // const token = sessionStorage.getItem("token");
    // if (token) {
    //   config.headers.post["token"] = token;
    // }
    // 开启loading
    showFullScreenLoading();
    return config;
  },
  error => {
    // eslint-disable-next-line no-undef
    return Promise.reject(err);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    // 关闭loading
    tryHideFullScreenLoading();
    return response;
  },
  error => {
    // 请求失败抛出异常
    // Message({
    //   message: "請求失敗",
    //   type: "error"
    // });
    // 关闭loading
    tryHideFullScreenLoading();
    return Promise.reject(error);
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}
export function posts(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}
// 上传图片
export function update(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}
