import Client from "../Classes/Client";
import { Commands } from "../Commands";

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }

    if (client.env === "DEVELOPMENT") await client.application.commands.set(Commands, "604747271862485012");
    if (client.env === "PRODUCTION") await client.application.commands.set(Commands);

    if (client.env === "DEVELOPMENT") console.log(`${client.user.username} is online IN DEVELOPMENT MODE`);
    if (client.env === "PRODUCTION") console.log(`${client.user.username} is online`);
  });
};
