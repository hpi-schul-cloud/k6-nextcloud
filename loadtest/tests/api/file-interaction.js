import { check, sleep } from "k6";
import { login, getUser } from "../../lib/auth/login.js";
import { checkResult } from "../../lib/checks.js";

export const options = JSON.parse(
  open(`../../config/options/${__ENV.OPTIONS_FILE}`)
);

export default function () {
  const user = getUser();
  const client = login(user);
  const fileClient = createFileClient(client, user);

  let result = createFile(fileClient);
  checkResult(result);

  result = fileClient("GET");
  check(result, { "Body is Hello World!": (r) => r.body == "Hello World!" });
  checkResult(result);

  result = updateFile(fileClient);
  checkResult(result);

  result = fileClient("DELETE");
  checkResult(result);
}

function createFileClient(client, user) {
  const random = (Math.random() + 1).toString(36).substring(7);
  return function (method, content) {
    return client(
      method,
      `/remote.php/dav/files/${user.username}/${random}.txt`,
      content
    );
  };
}

function createFile(fileClient) {
  return fileClient("PUT", "Hello World!");
}

function updateFile(fileClient) {
  return fileClient(
    "PUT",
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vestibulum eros arcu,
ut rhoncus erat fermentum eu. Aliquam cursus mollis elit sit amet blandit. Sed a 
consequat dui, id efficitur nibh. Vivamus et tellus vestibulum, iaculis ligula vitae,
maximus eros.Praesent id eros vel lectus semper placerat nec ac nulla. Nunc quis
efficitur lorem. Investibulum risus nec eros efficitur tristique. Nam vel massa a nunc
aliquam facilisis ac in justo. Quisque vulputate, enim nec blandit ullamcorper, risus
elit porta leo, id dapibus ipsum quam a dolor. Vestibulum vestibulum viverra molestie.
Suspendisse luctus lectus sed venenatis pulvinar. Phasellus ornare ac lorem sed
imperdiet.

Donec aliquet venenatis tellus ac fringilla. Integer a tincidunt quam. Nam faucibus
velit eu sapien consequat, quis ullamcorper dolor pulvinar. Interdum et malesuada
fames ac ante ipsum primis in faucibus. Donec euismod nulla eu lorem condimentum, ut
ultricies augue rutrum. Ut est nisi, maximus eget ultrices ut, congue et justo. Nulla
mattis enim nec cursus varius. Quisque eleifend urna non metus malesuada dapibus.
Praesent ut luctus ligula, a sagittis elit. Vivamus ullamcorper turpis sapien, et
fermentum ex interdum in. Nulla a leo tortor. In consequat, nulla et blandit
pellentesque, quam massa cursus risus, at consequat nulla tortor vel mauris. Sed
aliquet magna vel leo tincidunt, sodales iaculis enim congue. Curabitur sodales tempus
condimentum. Praesent quis varius est. Curabitur sagittis convallis mattis.`
  );
}
