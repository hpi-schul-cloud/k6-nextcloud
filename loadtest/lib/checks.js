import { sleep, check } from "k6";

export function checkStatus2XX(res) {
  const message = `Response status was 2XX`;
  return check(res, { [message]: (r) => ("" + r.status).startsWith("2") });
}

export function checkStatusCode(res, code) {
  const message = `Response status was ${code}`;
  return check(res, { [message]: (r) => r.status == code });
}

export function checkResponseDuration(res, duration) {
  const message = `Response time less than ${duration}s`;
  check(res, {
    [message]: (r) => r.timings.duration <= duration * 1000,
  });
  return 0;
}

export function checkResult(res) {
  sleep(Math.random() + 5);
  checkResponseDuration(res, 10);
  return checkStatus2XX(res);
}
