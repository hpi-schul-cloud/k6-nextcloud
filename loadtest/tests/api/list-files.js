import { login, getUser } from "../../lib/auth/login.js";
import { checkResult } from "../../lib/checks.js";

export const options = JSON.parse(
  open(`../../config/options/${__ENV.OPTIONS_FILE}`)
);

export default function () {
  const user = getUser();
  const client = login(user);

  let result = client("PROPFIND", `/remote.php/dav/files/${user.username}/`);

  checkResult(result);

  result = client(
    "PROPFIND",
    `/remote.php/dav/files/${user.username}/users%20(users)/`
  );

  checkResult(result);
}
