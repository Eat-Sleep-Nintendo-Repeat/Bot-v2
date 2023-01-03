import { CommandInteraction, ChatInputApplicationCommandData, Client } from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
  canExecute: (client: Client, interaction: CommandInteraction) => boolean;
  run: (client: Client, interaction: CommandInteraction) => void;
}
