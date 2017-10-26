"use strict";

let AstVisitor = require("../astvisitor");

class removeProxyRulesClass extends AstVisitor {
    rule_ref(node, from, to) {
        if (node.name === from) {
            node.name = to;
        }
    }
}
// Removes proxy rules -- that is, rules that only delegate to other rule.
function removeProxyRules(ast, options) {
    function isProxyRule(node) {
        return node.type === "rule" && node.expression.type === "rule_ref";
    }

    let indices = [];

    ast.rules.forEach((rule, i) => {
        if (isProxyRule(rule)) {
            let v = new removeProxyRulesClass();
            v.visit(ast, rule.name, rule.expression.name);
            if (options.allowedStartRules.indexOf(rule.name) === -1) {
                indices.push(i);
            }
        }
    });

    indices.reverse();

    indices.forEach(i => {
        ast.rules.splice(i, 1);
    });
}

module.exports = removeProxyRules;
