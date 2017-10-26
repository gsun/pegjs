"use strict";

let AstVisitor = require("./astvisitor");

// AST utilities.
let asts = {
    findRule(ast, name) {
        for (let i = 0; i < ast.rules.length; i++) {
            if (ast.rules[i].name === name) {
                return ast.rules[i];
            }
        }

        return undefined;
    },

    indexOfRule(ast, name) {
        for (let i = 0; i < ast.rules.length; i++) {
            if (ast.rules[i].name === name) {
                return i;
            }
        }

        return -1;
    },

    alwaysConsumesOnSuccess(ast, node) {
        let v = new AlwaysConsumesOnSuccessClass(ast);
        return v.visit(node);
    }
}

class AlwaysConsumesOnSuccessClass extends AstVisitor {
    constructor(ast) {
        super();
        this.ast = ast;
    }

    choice(node) {
        return node.alternatives.every(e => {
            return this.visit(e);
        });
    }

    sequence(node) {
        return node.elements.some(e => {
            return this.visit(e);
        });
    }

    simple_and() {
        return false;
    }
    simple_not() {
        return false;
    }
    optional() {
        return false;
    }
    zero_or_more(node) {
        return false;
    }

    semantic_and() {
        return false;
    }
    semantic_not() {
        return false;
    }

    rule_ref(node) {
        return this.visit(asts.findRule(this.ast, node.name));
    }

    literal(node) {
        return node.value !== "";
    }

    class() {
        return true;
    }
    any() {
        return true;
    }
}

module.exports = asts;
