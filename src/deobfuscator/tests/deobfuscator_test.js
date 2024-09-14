import Deobfuscator from "../deobfuscator.js";
import fs from "fs";

const inputPath = "../assets/input.js";
const outputPath = "../assets/output.js";

const script = fs.readFileSync(inputPath, "utf-8");

const deobfuscator = new Deobfuscator(script);

const deobfuscatedCode = await deobfuscator.deobfuscate();

fs.writeFileSync(outputPath, deobfuscatedCode);