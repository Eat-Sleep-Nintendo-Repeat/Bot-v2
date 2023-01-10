import requireAll from "require-all";
import path from "path";
import Client from "./Classes/Client";

export function registerListeners(client: Client): void {
  requireAll({
    dirname: path.join(__dirname, "./Listeners"),
    recursive: true,
    filter: /\w*.[tj]s/g,
    resolve: (x) => {
      x = new x.default(client);
      client.on(x.name, x.run.bind(x));
    },
  });
}
