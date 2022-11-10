export class Service {

  getHost(): string {

    return process.env.NODE_ENV === "production" ? "" : "";
  }

}
