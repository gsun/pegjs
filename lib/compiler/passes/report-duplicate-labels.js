"use strict";

let GrammarError = require("../../grammar-error");
let AstVisitor = require("../astvisitor");

function cloneEnv(env) {
    let clone = {};

    Object.keys(env).forEach(name => {
        clone[name] = env[name];
    });

    return clone;
}

class ReportDuplicateLabelsClass extends AstVisitor {

    rule(node) {
        this.visit(node.expression, {});
    }

    choice(node, env) {
        node.alternatives.forEach(alternative => {
            this.visit(alternative, cloneEnv(env));
        });
    }

    action(node, env) {
        this.visit(node.expression, cloneEnv(env));
    }

    labeled(node, env) {
        if (Object.prototype.hasOwnProperty.call(env, node.label)) {
            throw new GrammarError(
                `Label "${node.label}" is already defined at line ${env[node.label].start.line}, column ${env[node.label].start.column}.`, 
                node.location);
        }

        this.visit(node.expression, env);

        env[node.label] = node.location;
    }

    text(node, env) {
        this.visit(node.expression, cloneEnv(env));
    }
    simple_and(node, env) {
        this.visit(node.expression, cloneEnv(env));
    }
    simple_not(node, env) {
        this.visit(node.expression, cloneEnv(env));
    }
    optional(node, env) {
        this.visit(node.expression, cloneEnv(env));
    }
    zero_or_more(node, env) {
        this.visit(node.expression, cloneEnv(env));
    }
    one_or_more(node, env) {
        this.visit(node.expression, cloneEnv(env));
    }
    group(node, env) {
        this.visit(node.expression, cloneEnv(env));
    }
}
// Checks that each label is defined only once within each scope.
function reportDuplicateLabels(ast) {
    let v = new ReportDuplicateLabelsClass();
    v.visit(ast);
}

module.exports = reportDuplicateLabels;
