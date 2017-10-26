"use strict";

let GrammarError = require("../../grammar-error");
let asts = require("../asts");
let Astvisitor = require("../astvisitor");

class reportUndefinedRulesClass extends Astvisitor {
    constructor(ast) {
        super();
        this.ast = ast;
    }
    rule_ref(node) {
        if (!asts.findRule(this.ast, node.name)) {
            throw new GrammarError(
                `Rule "${node.name}" is not defined.`, 
                node.location);
        }
    }
}
// Checks that all referenced rules exist.
function reportUndefinedRules(ast, options) {
    let v = new reportUndefinedRulesClass(ast);

    v.visit(ast, options);

    if (options.allowedStartRules) {
        options.allowedStartRules.forEach(rule => {
            if (!asts.findRule(ast, rule)) {
                throw new GrammarError(
                    `Start rule "${rule}" is not defined.`);
            }
        });
    }
}

module.exports = reportUndefinedRules;
