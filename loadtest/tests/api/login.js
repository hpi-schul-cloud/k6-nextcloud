import { login, getUser } from "../../lib/auth/login.js";

export const options = JSON.parse(
  open(`../../config/options/${__ENV.OPTIONS_FILE}`)
);

export default function () {
  login(getUser());
}
