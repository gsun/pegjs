"use strict";

let GrammarError = require("../../grammar-error");
let AstVisitor = require("../astvisitor");

class reportDuplicateRulesClass extends AstVisitor {
    constructor() {
        super();
        this.rules = {};
    }

    rule(node) {
        if (Object.prototype.hasOwnProperty.call(this.rules, node.name)) {
            throw new GrammarError(
                `Rule "${node.name}" is already defined at line ${this.rules[node.name].start.line}, column ${this.rules[node.name].start.column}.`, 
                node.location);
        }

        this.rules[node.name] = node.location;
    }
}
// Checks that each rule is defined only once.
function reportDuplicateRules(ast) {
    let v = new reportDuplicateRulesClass();

    v.visit(ast);
}

module.exports = reportDuplicateRules;
