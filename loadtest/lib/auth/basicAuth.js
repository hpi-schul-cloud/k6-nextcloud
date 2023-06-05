import encoding from "k6/encoding";

export default class BasicAuth {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  get headers() {
    return {
      Authorization: `Basic ${encoding.b64encode(
        `${this.username}:${this.password}`
      )}`,
    };
  }
}
