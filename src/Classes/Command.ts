import { CommandInteraction, ChatInputApplicationCommandData, Client, Application, ApplicationCommand, ApplicationCommandOptionData, OverwriteType } from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
  canExecute: (client: Client, interaction: CommandInteraction) => boolean;
  run: (client: Client, interaction: CommandInteraction) => void;
}
