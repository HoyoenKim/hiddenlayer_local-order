import { boot } from "quasar/wrappers";
import axios from "axios";

//const baseURL = "http://localhost:3000";
//const baseURL = "http://192.168.0.102:3000";
//const baseURL = "http://210.109.43.14:10005";

// 1. niginx proxy manager (210.109.43.14:81) 에서 192.168.0.82:3000 을 10005 포트로 포워딩 설정
// BE가 192.168.0.82:3000 에 띄워져 있음
// 2. 192.168.0.82:22 는 10002 포트로 포워딩 되어 있음
// BE설정 위해서는 ssh -i pemkey.pem ubuntu@210.109.43.14 -p 10002 로 접속가능

const baseURL = "http://18.118.221.107:3000";

const api = axios.create({ baseURL: baseURL });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { axios, api, baseURL };
