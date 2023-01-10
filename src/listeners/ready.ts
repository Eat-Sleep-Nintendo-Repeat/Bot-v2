import { Command } from "src/Classes/Command";
import Client from "../Classes/Client";
import { getCommands } from "../Commands";

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }

    const Commands: Command[] = getCommands();

    if (client.env === "DEVELOPMENT") await client.application.commands.set(Commands, "604747271862485012");
    if (client.env === "PRODUCTION") await client.application.commands.set(Commands);

    console.log(`${Commands.length} Commands detected`);

    if (client.env === "DEVELOPMENT") console.log(`${client.user.username} is online IN DEVELOPMENT MODE`);
    if (client.env === "PRODUCTION") console.log(`${client.user.username} is online`);
  });
};
