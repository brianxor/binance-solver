import vm from "vm";
import * as t from "@babel/types";
import _generate from "@babel/generator";
import _traverse from "@babel/traverse";
const generate = _generate.default;
const traverse = _traverse.default;

const vmCtx = vm.createContext();

const findArrayElements = (ast) => {
    traverse(ast, {
        VariableDeclaration(path) {
            const { declarations } = path.node;

            if (declarations.length !== 1 || !t.isVariableDeclarator(declarations[0])) return;

            const id = declarations[0].id;
            const init = declarations[0].init;
            
            if (t.isIdentifier(id) && t.isArrayExpression(init)) {
                const elements = init.elements;

                if (elements.length === 0) return;

                if (elements.every((element => t.isStringLiteral(element)))) {
                    const code = generate(path.node).code;
                    vm.runInContext(code, vmCtx);
                    path.remove();
                    path.stop();
                }
            }
        }
    })
};

const shuffleArrayElements = (ast) => {
    traverse(ast, {
        ExpressionStatement(path) {
            const { expression } = path.node;

            if (!t.isCallExpression(expression)) return;

            const callee = expression.callee;
            const args = expression.arguments;

            if (t.isFunctionExpression(callee) && args.length === 2 && t.isIdentifier(args[0]) && t.isNumericLiteral(args[1])) {
                const code = generate(path.node).code;
                vm.runInContext(code, vmCtx);
                path.remove();
                path.stop();
            }
        }
    })
}

const findDecodeFunction = (ast) => {
    traverse(ast, {
        VariableDeclaration(path) {
            const { declarations } = path.node;

            if (declarations.length !== 1 || !t.isVariableDeclarator(declarations[0])) return;

            const id = declarations[0].id;
            const init = declarations[0].init;

            if (t.isIdentifier(id) && t.isFunctionExpression(init)) {
                const body = init.body;

                if (!t.isBlockStatement(body)) return;

                const bodies = body.body;

                if (bodies.length !== 6) return;

                const code = generate(path.node).code;
                vm.runInContext(code, vmCtx);
                path.remove();
                path.stop();
            }
        }
    })
}

const findDecodeCalls = (ast) => {
    traverse(ast, {
        CallExpression(path) {
            const callee = path.node.callee;
            const args = path.node.arguments;

            if (t.isIdentifier(callee) && t.isStringLiteral(args[0]) && t.isStringLiteral(args[1])) {
                const code = generate(path.node).code;
                const decodedValue = vm.runInContext(code, vmCtx);
                path.replaceWith(t.stringLiteral(decodedValue))
            }
        }
    })
}

const replaceStringsVisitor = (ast) => {
    findArrayElements(ast);
    shuffleArrayElements(ast);
    findDecodeFunction(ast);
    findDecodeCalls(ast);
}

export default replaceStringsVisitor;