import { getCommands } from "../Commands";
import Client from "../Classes/Client";
import DiscordEvent from "../Classes/DiscordEventClass";
import { Command } from "../Classes/Command";

export default class ReadyEvent extends DiscordEvent {
  constructor(client: Client) {
    super(client, "ready");
  }

  async run() {
    if (!this.client.user || !this.client.application) {
      return;
    }
    const Commands: Command[] = getCommands();
    if (this.client.env === "DEVELOPMENT") await this.client.application.commands.set(Commands, "604747271862485012");
    if (this.client.env === "PRODUCTION") await this.client.application.commands.set(Commands);
    console.log(`${Commands.length} Commands detected`);
    if (this.client.env === "DEVELOPMENT") console.log(`${this.client.user.username} is online IN DEVELOPMENT MODE`);
    if (this.client.env === "PRODUCTION") console.log(`${this.client.user.username} is online`);
  }
}
