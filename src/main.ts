import * as dotenv from "dotenv";
import Client from "./Classes/Client";
import { connectDB } from "./Services/Database";
import { registerListeners } from "./Listeners";

//load data from .env file
dotenv.config();
if (!process.env.ENVIRONMENT) throw Error("ENV is missing Environment Configuration");
const client = new Client(
  {
    intents: ["Guilds", "GuildMembers", "MessageContent", "GuildMessages", "GuildVoiceStates", "GuildMessageReactions"],
  },
  process.env.ENVIRONMENT
);

connectDB();
registerListeners(client);

client.login(process.env.DISCORD_BOT_TOKEN);
