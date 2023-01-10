import * as dotenv from "dotenv";
import Client from "./Classes/Client";
import ready from "./Listeners/ready";
import interactionCreate from "./Listeners/interactionCreate";
import { connectDB } from "./Services/Database";
import welcome from "./Listeners/welcome";

//load data from .env file
dotenv.config();
if (!process.env.ENVIRONMENT) throw Error("ENV is missing Environment Configuration");
const client = new Client(
  {
    intents: ["Guilds", "GuildMembers", "MessageContent", "GuildMessages", "GuildVoiceStates", "GuildMessageReactions"],
  },
  process.env.ENVIRONMENT
);

interactionCreate(client);
connectDB();
ready(client);
welcome(client);

client.login(process.env.DISCORD_BOT_TOKEN);
