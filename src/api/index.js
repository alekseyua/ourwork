import qs from "query-string";
import axios from 'axios';
import { API_ENGINES_MARKET_REDIRECT, HOST, HOST_NEW } from "../helpers/config";

const Api = {
  hostname: "",
  get: async function (url, params, controller = null) {
    try {
      if (url.includes(API_ENGINES_MARKET_REDIRECT)) {
        this.hostname = HOST_NEW;
      } else {
        this.hostname = HOST;
      }
      const res = await axios(
        `${this.hostname}${url}?${qs.stringify(params)}`,
        {
          method: "GET",
          withCredentials: true,
          crossorigin: true,
          mode: "cors",
          signal: controller && controller.signal,
        }
      );
      return await res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // console.error('Operation canceled');
      }
      throw error;
    }
  },
  post: async function (url, params, config = {}) {
    if (url.includes(API_ENGINES_MARKET_REDIRECT)) {
      this.hostname = HOST_NEW;
    } else {
      this.hostname = HOST;
    }
    try {
      const res = await axios(`${this.hostname}${url}`, {
        method: "POST",
        withCredentials: true,
        crossorigin: true,
        mode: "cors",
        data: params,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        ...config,
      });
      return await res.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async function (url, params) {
    if (url.includes(API_ENGINES_MARKET_REDIRECT)) {
      this.hostname = HOST_NEW;
    } else {
      this.hostname = HOST;
    }
    const res = await axios(`${this.hostname}${url}`, {
      method: "DELETE",
      withCredentials: true,
      crossorigin: true,
      headers: {
        "Content-Type": `application/json`,
      },
      mode: "cors",
      data: params,
    });
    return await res.data;
  },
};

export default Api;