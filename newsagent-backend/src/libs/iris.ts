import { IRIS } from "intersystems-iris";

export class Iris {
  private iris: IRIS;

  constructor(
    host: string,
    port: number,
    ns: string,
    username: string,
    password: string
  ) {
    this.iris = new IRIS(host, port, ns, username, password);
  }

  /*     public async connect() {
        return this.iris.createConnection({
            host: "localhost",
            port: 51773,
            ns: "USER",
            user: "_SYSTEM",
            pwd: "SYS",
        });
    } */

  public async disconnect() {
    return await this.iris.close();
  }

  public async executeQuery(query: string) {
    return this.iris.sql(query);
  }
}
