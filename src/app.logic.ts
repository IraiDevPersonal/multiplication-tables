import fs from "fs";
import { yarg } from "./config/plugins/yargs.plugin";

const { b: base, l: limit, s: showTable } = yarg;

let outputMessage: string = `
=========================================
            tabla del ${base}
=========================================

`;

for (let index = 1; index <= limit; index++) {
  outputMessage += `${base} x ${index} = ${base * index}\n`;
}

if (showTable) {
  console.log(outputMessage);
}
const outDir = "outputs";
const fileName = `${outDir}/tabla-${base}.txt`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(fileName, outputMessage);

console.log("File created");
