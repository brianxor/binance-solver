import _traverse from "@babel/traverse";
const traverse = _traverse.default;

const replaceHexadecimalIntegerVisitor = (ast) => {
    traverse(ast, {
        NumericLiteral(path) {
            if (path.node.extra) {
                delete path.node.extra;
            } else {
                return;
            }
        }
    });
};

export default replaceHexadecimalIntegerVisitor;