import * as dotenv from "dotenv";
import { Client } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";

//load data from .env file
dotenv.config();

const client = new Client({
  intents: ["Guilds", "GuildMembers", "MessageContent", "GuildMessages", "GuildVoiceStates", "GuildMessageReactions"],
});

ready(client);
interactionCreate(client);

client.login(process.env.DISCORD_BOT_TOKEN);
