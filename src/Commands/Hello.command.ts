import { CommandInteraction, Client } from "discord.js";
import { Command } from "../Classes/Command";
import { PermissionError } from "../Classes/ErrorTypes";

const Command: Command = {
  name: "hello",
  description: "Returns a greeting",
  canExecute: function (client: Client, interaction: CommandInteraction): boolean {
    if (interaction.member?.user.username === "Dustin_DM") {
      return true;
    } else {
      throw new PermissionError("Du bist nicht Dustin");
    }
  },
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = "Hello there!";

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};

export default Command;
