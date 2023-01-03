import { CommandInteraction, Client, Interaction, EmbedBuilder } from "discord.js";
import { Commands } from "../Commands";
import * as colors from "../Classes/Colors";

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand()) {
      await handleSlashCommand(client, interaction);
    }
  });
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);
  if (!slashCommand) {
    interaction.followUp({ content: "An error has occurred" });
    return;
  }

  //Set Reply Message to "thinking"
  await interaction.deferReply();

  try {
    //Check if command is allowed to be Executed
    slashCommand.canExecute(client, interaction);
    //Execute command
    slashCommand.run(client, interaction);
  } catch (error: unknown) {
    if (error instanceof Error) {
      let e: Error = error;
      //Send Error Messages
      var fields = [];
      if (e.name) {
        fields.push({ name: "Fehlertyp:", value: e.name.toString(), inline: false });
      }

      if (e.message) {
        fields.push({ name: "Fehlermeldung:", value: e.message.toString(), inline: false });
      }

      if (e.cause) {
        fields.push({ name: "Fehleruhrsache:", value: "```" + e.cause.toString() + "```", inline: false });
      }

      if (e.stack) {
        fields.push({ name: "Wo im Code:", value: "```" + e.stack.toString() + "```", inline: false });
      }

      await interaction.followUp({
        ephemeral: true,
        embeds: [new EmbedBuilder().setTitle("Exception caught").setColor(colors.error).setFields(fields)],
      });
    } else {
      throw error;
    }
  }
};
