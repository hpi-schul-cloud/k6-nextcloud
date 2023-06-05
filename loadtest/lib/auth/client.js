import { CookieJar, request } from "k6/http";
import BasicAuth from "./basicAuth.js";

export const clientFor = (user) => {
  const jar = new CookieJar();

  const preparedClient = (method, path, body, params) => {
    const auth = new BasicAuth(user.username, user.password);

    params = Object.assign({ jar: jar }, params);
    params = Object.assign({ timeout: "60s" }, params);

    if (params.hasOwnProperty("headers")) {
      params.headers = Object.assign(params.headers, auth.headers);
    } else {
      params.headers = auth.headers;
    }

    return request(method, __ENV.ENVIRONMENT + path, body, params);
  };

  return preparedClient;
};
