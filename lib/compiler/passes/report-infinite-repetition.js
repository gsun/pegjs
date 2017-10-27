"use strict";

let GrammarError = require("../../grammar-error");
let asts = require("../asts");
let Astvisitor = require("../astvisitor");

class ReportInfiniteRepetitionClass extends Astvisitor {
    constructor(ast) {
        super();
        this.ast = ast;
    }

    zero_or_more(node) {
        if (!asts.alwaysConsumesOnSuccess(this.ast, node.expression)) {
            throw new GrammarError(
                "Possible infinite loop when parsing (repetition used with an expression that may not consume any input).",
                node.location);
        }
    }

    one_or_more(node) {
        if (!asts.alwaysConsumesOnSuccess(this.ast, node.expression)) {
            throw new GrammarError(
                "Possible infinite loop when parsing (repetition used with an expression that may not consume any input).",
                node.location);
        }
    }
}
// Reports expressions that don't consume any input inside |*| or |+| in the
// grammar, which prevents infinite loops in the generated parser.
function reportInfiniteRepetition(ast) {
    let v = new ReportInfiniteRepetitionClass(ast);
    v.visit(ast);
}

module.exports = reportInfiniteRepetition;
