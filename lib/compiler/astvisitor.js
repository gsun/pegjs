"use strict";

// Simple AST node visitor builder.
class AstVisitor {

    visit(node, ...extraArgs) {
        return this[node.type](node, ...extraArgs);
    }

    grammar(node, ...extraArgs) {
        if (node.initializer) {
            this.visit(node.initializer, ...extraArgs);
        }
        node.rules.forEach(rule => {
            this.visit(rule, ...extraArgs);
        });
    }

    initializer(node, ...extraArgs) {}

    rule(node, ...extraArgs) {
        return this.visit(node.expression, ...extraArgs);
    }

    named(node, ...extraArgs) {
        return this.visit(node.expression, ...extraArgs);
    }

    choice(node, ...extraArgs) {
        node["alternatives"].forEach(child => {
            this.visit(child, ...extraArgs);
        });
    }

    action(node, ...extraArgs) {
        return this.visit(node.expression, ...extraArgs);
    }
    sequence(node, ...extraArgs) {
        node["elements"].forEach(child => {
            this.visit(child, ...extraArgs);
        });
    }

    labeled(node, ...extraArgs) {
        return this.visit(node.expression, ...extraArgs);
    }

    text(node, ...extraArgs) {
        return this.visit(node.expression, ...extraArgs);
    }

    simple_and(node, ...extraArgs) {
        this.visit(node.expression, ...extraArgs);
    }

    simple_not(node, ...extraArgs) {
        this.visit(node.expression, ...extraArgs);
    }

    optional(node, ...extraArgs) {
        this.visit(node.expression, ...extraArgs);
    }

    zero_or_more(node, ...extraArgs) {
        this.visit(node.expression, ...extraArgs);
    }

    one_or_more(node, ...extraArgs) {
        return this.visit(node.expression, ...extraArgs);
    }

    group(node, ...extraArgs) {
        return this.visit(node.expression, ...extraArgs);
    }

    semantic_and(node, ...extraArgs) {}

    semantic_not(node, ...extraArgs) {}

    rule_ref(node, ...extraArgs) {}

    literal(node, ...extraArgs) {}

    class(node, ...extraArgs) {}

    any(node, ...extraArgs) {}

}

module.exports = AstVisitor;
