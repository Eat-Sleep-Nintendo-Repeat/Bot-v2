import { ClientEvents } from "discord.js";

import Client from "./Client";

export default abstract class DiscordEvent {
  /**
   * Discord client.
   */
  readonly client: Client;

  /**
   * Name of the event.
   */
  readonly name: keyof ClientEvents;

  constructor(client: Client, name: keyof ClientEvents) {
    this.client = client;
    this.name = name;
  }

  /**
   * Runs the event.
   * @param params Event parameters from [discord.js.org](https://discord.js.org/#/docs/main/stable/class/Client)
   */
  abstract run(...params: any | undefined): Promise<any>;
}
