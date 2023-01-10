import { EmbedBuilder, GuildMember, TextChannel } from "discord.js";
import User from "../Models/User";
import Client from "../Classes/Client";
import * as colors from "../Classes/Colors";
import DiscordEvent from "../Classes/DiscordEventClass";

export default class ReadyEvent extends DiscordEvent {
  constructor(client: Client) {
    super(client, "guildMemberRemove");
  }

  async run(member: GuildMember) {
    // Find Member in Database
    const UserDB = await User.findOne({ discordId: member.id });

    if (UserDB) {
      UserDB.left = new Date();
      await UserDB.save();
    }

    //Send Message to welcome channel
    let channel: TextChannel | undefined = undefined;

    if (this.client.env === "DEVELOPMENT") channel = <TextChannel>this.client.channels.cache.get("770299376303079424");
    if (this.client.env === "PRODUCTION") channel = <TextChannel>this.client.channels.cache.get("585522626407956492");

    channel?.send({ embeds: [new EmbedBuilder().setColor(colors.error).setDescription(`${member.user.username}#${member.user.discriminator} hat soeben Eat, Sleep, Nintendo, Repeat verlassen.`)] });
  }
}
