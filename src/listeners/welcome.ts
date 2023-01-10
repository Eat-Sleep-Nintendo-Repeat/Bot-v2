import { EmbedBuilder, GuildMember, TextChannel } from "discord.js";
import User from "../Models/User";
import Client from "../Classes/Client";
import * as colors from "../Classes/Colors";
import DiscordEvent from "../Classes/DiscordEventClass";

export default class ReadyEvent extends DiscordEvent {
  constructor(client: Client) {
    super(client, "guildMemberAdd");
  }

  async run(member: GuildMember) {
    //Is member already in Database
    const UserDB = await User.findOne({ discordId: member.id });
    if (!UserDB) {
      //Add to DB
      await new User({
        discordId: member.id,
        username: member.user.username,
        avatar: member.displayAvatarURL(),
      }).save();
    } else {
      UserDB.reJoined?.push(new Date());
      await UserDB.save();
    }
    //Send Message to welcome channel
    let channel: TextChannel | undefined = undefined;
    if (this.client.env === "DEVELOPMENT") channel = <TextChannel>this.client.channels.cache.get("770299376303079424");
    if (this.client.env === "PRODUCTION") channel = <TextChannel>this.client.channels.cache.get("585522626407956492");
    channel?.send({ embeds: [new EmbedBuilder().setColor(colors.primary).setDescription(`${member.user.username}#${member.user.discriminator} ist gerade Eat, Sleep, Nintendo, Repeat gejoint!`)] });
  }
}

// export default (client: Client): void => {
//   client.on("guildMemberAdd", async (member) => {
//   });

//   client.on("guildMemberRemove", async (member) => {
//     //Find Member in Database
//     const UserDB = await User.findOne({ discordId: member.id });

//     if (UserDB) {
//       UserDB.left = new Date();
//       await UserDB.save();
//     }

//     //Send Message to welcome channel
//     let channel: TextChannel | undefined = undefined;

//     if (client.env === "DEVELOPMENT") channel = <TextChannel>client.channels.cache.get("770299376303079424");
//     if (client.env === "PRODUCTION") channel = <TextChannel>client.channels.cache.get("585522626407956492");

//     channel?.send({ embeds: [new EmbedBuilder().setColor(colors.error).setDescription(`${member.user.username}#${member.user.discriminator} hat soeben Eat, Sleep, Nintendo, Repeat verlassen.`)] });
//   });
// };
