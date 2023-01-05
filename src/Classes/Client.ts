import { Client as DiscordClient, ClientOptions } from "discord.js";

export default class Client extends DiscordClient {
  public env: string;

  constructor(options: ClientOptions, env: string) {
    super(options);
    this.env = env;
  }
}
