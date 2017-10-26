"use strict";

let GrammarError = require("../../grammar-error");
let asts = require("../asts");
let AstVisitor = require("../astvisitor");

// Reports left recursion in the grammar, which prevents infinite recursion in
// the generated parser.
//
// Both direct and indirect recursion is detected. The pass also correctly
// reports cases like this:
//
//   start = "a"? start
//
// In general, if a rule reference can be reached without consuming any input,
// it can lead to left recursion.
class reportInfiniteRecursionClass extends AstVisitor {
    constructor(ast) {
        super();
        this.ast = ast;
        this.visitedRules = [];
    }

    rule(node) {
        this.visitedRules.push(node.name);
        this.visit(node.expression);
        this.visitedRules.pop(node.name);
    }

    sequence(node) {
        node.elements.every(element => {
            this.visit(element);

            return !asts.alwaysConsumesOnSuccess(this.ast, element);
        });
    }

    rule_ref(node) {
        if (this.visitedRules.indexOf(node.name) !== -1) {
            this.visitedRules.push(node.name);

            throw new GrammarError(
                `Possible infinite loop when parsing (left recursion: ${this.visitedRules.join(" -> ")}).`, 
                node.location);
        }

        this.visit(asts.findRule(this.ast, node.name));
    }
}

function reportInfiniteRecursion(ast) {
    let v = new reportInfiniteRecursionClass(ast);
    v.visit(ast);
}

module.exports = reportInfiniteRecursion;
