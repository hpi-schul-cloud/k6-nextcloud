import crypto from "k6/crypto";
import { clientFor } from "./client.js";
import { checkStatusCode, checkResponseDuration } from "../checks.js";

export function login(user) {
  const client = clientFor(user);
  const result = client("POST", "/login");

  checkStatusCode(result, 200);
  checkResponseDuration(result, 10);

  return client;
}

export function getUser() {
  const random = Math.floor(Math.random() * __ENV.TEST_USERS + 1);
  const username = __ENV.TEST_USER_PREFIX + zeroPad(random, 5);
  const password = crypto.md5(username + __ENV.TEST_USER_SALT, "hex");

  return { username, password };
}

const zeroPad = (num, places) => String(num).padStart(places, "0");
