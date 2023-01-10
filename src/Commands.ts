import { Command } from "./Classes/Command";
import requireAll from "require-all";
import path from "path";

export function getCommands(): Command[] {
  const returnValue: Command[] = [];

  requireAll({
    dirname: path.join(__dirname, "./Commands"),
    recursive: true,
    filter: /\w*.[tj]s/g,
    resolve: (x) => returnValue.push(x.default),
  });

  return returnValue;
}
