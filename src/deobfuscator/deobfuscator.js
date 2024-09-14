import { Deobfuscator as globalDeobfuscator } from "deobfuscator";
import beautify from "js-beautify";
import * as parser from "@babel/parser";
import _generate from "@babel/generator";
const generate = _generate.default;

import replaceHexadecimalIntegerVisitor from "./visitors/replaceHexadecimalInteger.js"
import replaceStringsVisitor from "./visitors/replaceStrings.js";

class Deobfuscator {
    constructor(script) {
        this.script = script;
        this.visitors = [
            replaceHexadecimalIntegerVisitor,
            replaceStringsVisitor
        ]
    }

    async deobfuscate() {
        const ast = parser.parse(this.script);

        // First we use our visitors

        this.visitors.map((visitor => visitor(ast)));

        let deobfuscatedCode = generate(ast, {
            comments: false,
        }).code;

        // Then we use a global deobfuscator for the rest

        let globalDeobf = new globalDeobfuscator();

        deobfuscatedCode = await globalDeobf.deobfuscateSource(deobfuscatedCode, {});

        deobfuscatedCode = beautify(deobfuscatedCode, {
            indent_size: 2,
            space_in_empty_paren: true,
        });

        return deobfuscatedCode
    }
}

export default Deobfuscator;