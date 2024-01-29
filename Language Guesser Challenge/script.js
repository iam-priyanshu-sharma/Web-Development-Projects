// REMEMBER TO RUN "npm install" in your terminal (in the same directory as this file)
import { franc } from "franc";
import langs from "langs";
import colors from "colors";

const input = process.argv[2];
const langCode = franc(input);
if (langCode === "und") {
  console.log(
    colors.red("SORRY, COULDN'T FIGURE IT OUT! TRY WITH MORE SAMPLE TEXT!")
  );
} else {
  const language = langs.where("3", langCode);
  console.log(colors.green(`Our best guess is: ${language.name}`));
}
