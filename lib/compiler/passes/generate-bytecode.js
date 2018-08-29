"use strict";

let asts = require("../asts");
let js = require("../js");
let op = require("../opcodes");
let AstVisitor = require("../astvisitor");

// Generates bytecode.
//
// Instructions
// ============
//
// Stack Manipulation
// ------------------
//
//  [0] PUSH c
//
//        stack.push(consts[c]);
//
//  [1] PUSH_UNDEFINED
//
//        stack.push(undefined);
//
//  [2] PUSH_NULL
//
//        stack.push(null);
//
//  [3] PUSH_FAILED
//
//        stack.push(FAILED);
//
//  [4] PUSH_EMPTY_ARRAY
//
//        stack.push([]);
//
//  [5] PUSH_CURR_POS
//
//        stack.push(currPos);
//
//  [6] POP
//
//        stack.pop();
//
//  [7] POP_CURR_POS
//
//        currPos = stack.pop();
//
//  [8] POP_N n
//
//        stack.pop(n);
//
//  [9] NIP
//
//        value = stack.pop();
//        stack.pop();
//        stack.push(value);
//
// [10] APPEND
//
//        value = stack.pop();
//        array = stack.pop();
//        array.push(value);
//        stack.push(array);
//
// [11] WRAP n
//
//        stack.push(stack.pop(n));
//
// [12] TEXT
//
//        stack.push(input.substring(stack.pop(), currPos));
//
// Conditions and Loops
// --------------------
//
// [13] IF t, f
//
//        if (stack.top()) {
//          interpret(ip + 3, ip + 3 + t);
//        } else {
//          interpret(ip + 3 + t, ip + 3 + t + f);
//        }
//
// [14] IF_ERROR t, f
//
//        if (stack.top() === FAILED) {
//          interpret(ip + 3, ip + 3 + t);
//        } else {
//          interpret(ip + 3 + t, ip + 3 + t + f);
//        }
//
// [15] IF_NOT_ERROR t, f
//
//        if (stack.top() !== FAILED) {
//          interpret(ip + 3, ip + 3 + t);
//        } else {
//          interpret(ip + 3 + t, ip + 3 + t + f);
//        }
//
// [16] WHILE_NOT_ERROR b
//
//        while(stack.top() !== FAILED) {
//          interpret(ip + 2, ip + 2 + b);
//        }
//
// Matching
// --------
//
// [17] MATCH_ANY a, f, ...
//
//        if (input.length > currPos) {
//          interpret(ip + 3, ip + 3 + a);
//        } else {
//          interpret(ip + 3 + a, ip + 3 + a + f);
//        }
//
// [18] MATCH_STRING s, a, f, ...
//
//        if (input.substr(currPos, consts[s].length) === consts[s]) {
//          interpret(ip + 4, ip + 4 + a);
//        } else {
//          interpret(ip + 4 + a, ip + 4 + a + f);
//        }
//
// [19] MATCH_STRING_IC s, a, f, ...
//
//        if (input.substr(currPos, consts[s].length).toLowerCase() === consts[s]) {
//          interpret(ip + 4, ip + 4 + a);
//        } else {
//          interpret(ip + 4 + a, ip + 4 + a + f);
//        }
//
// [20] MATCH_REGEXP r, a, f, ...
//
//        if (consts[r].test(input.charAt(currPos))) {
//          interpret(ip + 4, ip + 4 + a);
//        } else {
//          interpret(ip + 4 + a, ip + 4 + a + f);
//        }
//
// [21] ACCEPT_N n
//
//        stack.push(input.substring(currPos, n));
//        currPos += n;
//
// [22] ACCEPT_STRING s
//
//        stack.push(consts[s]);
//        currPos += consts[s].length;
//
// [23] FAIL e
//
//        stack.push(FAILED);
//        fail(consts[e]);
//
// Calls
// -----
//
// [24] LOAD_SAVED_POS p
//
//        savedPos = stack[p];
//
// [25] UPDATE_SAVED_POS
//
//        savedPos = currPos;
//
// [26] CALL f, n, pc, p1, p2, ..., pN
//
//        value = consts[f](stack[p1], ..., stack[pN]);
//        stack.pop(n);
//        stack.push(value);
//
// Rules
// -----
//
// [27] RULE r
//
//        stack.push(parseRule(r));
//
// Failure Reporting
// -----------------
//
// [28] SILENT_FAILS_ON
//
//        silentFails++;
//
// [29] SILENT_FAILS_OFF
//
//        silentFails--;


function cloneEnv(env) {
    let clone = {};

    Object.keys(env).forEach(name => {
        clone[name] = env[name];
    });

    return clone;
}

function buildSequence() {
    return [].concat(...arguments);
}

function buildCondition(condCode, thenCode, elseCode) {
    return [...condCode, thenCode.length, elseCode.length, ...thenCode, ...elseCode];
}

function buildLoop(condCode, bodyCode) {
    return [...condCode, bodyCode.length, ...bodyCode];
}

function buildCall(functionIndex, delta, env, sp) {
    let params = Object.keys(env).map(name => sp - env[name]);

    return [op.CALL, functionIndex, delta, params.length, ...params];
}

function buildSimplePredicate(expressionCode, negative) {
    return buildSequence(
        [op.PUSH_CURR_POS],
        [op.SILENT_FAILS_ON],
        expressionCode,
        [op.SILENT_FAILS_OFF],
        buildCondition(
            [negative ? op.IF_ERROR : op.IF_NOT_ERROR],
            buildSequence(
                [op.POP],
                [negative ? op.POP : op.POP_CURR_POS],
                [op.PUSH_UNDEFINED]),
            buildSequence(
                [op.POP],
                [negative ? op.POP_CURR_POS : op.POP],
                [op.PUSH_FAILED])));
}

function buildSemanticPredicate(functionIndex, negative, context) {
    return buildSequence(
        [op.UPDATE_SAVED_POS], //update saved postion with current position
        buildCall(functionIndex, 0, context.env, context.sp), //save the check result true/false
        buildCondition(
            [op.IF],  //check true/false
            buildSequence(
                [op.POP],  //drop the result
                negative ? [op.PUSH_FAILED] : [op.PUSH_UNDEFINED]),
            buildSequence(
                [op.POP],  //drop the result
                negative ? [op.PUSH_UNDEFINED] : [op.PUSH_FAILED])));
}

function buildAppendLoop(expressionCode) {
    return buildLoop(
        [op.WHILE_NOT_ERROR],
        buildSequence([op.APPEND], expressionCode));  //append the current result to array, and get the next one
}

class GenerateBytecodeClass extends AstVisitor {
    constructor(ast) {
        super();
        this.ast = ast;
        this.consts = [];
		this.constfunces = [];
    }

    addConst(value) {
        let index = this.consts.indexOf(value);

        return index === -1 ? this.consts.push(value) - 1 : index;
    }

    addFunctionConst(params, code) {
        let value = `function(${params.join(", ")}) {${code}}`;
		let index = this.constfunces.indexOf(value);

        return index === -1 ? this.constfunces.push(value) - 1 : index;
    }

    grammar(node) {
        node.rules.forEach(rule => this.visit(rule));

        node.consts = this.consts;
		node.constfunces = this.constfunces;
    }

    rule(node) {
        node.bytecode = this.visit(node.expression, {
                sp: -1, // stack pointer
                env: {}, // mapping of label names to stack positions
                action: null // action nodes pass themselves to children here
            });
    }

    named(node, context) {
        let nameIndex = this.addConst(`peg$otherExpectation("${js.stringEscape(node.name)}")`);
        let expressionCode = this.visit(node.expression, context);
        // The code generated below is slightly suboptimal because |FAIL| pushes
        // to the stack, so we need to stick a |POP| in front of it. We lack a
        // dedicated instruction that would just report the failure and not touch
        // the stack.
        return buildSequence(
            [op.SILENT_FAILS_ON],
            expressionCode,
            [op.SILENT_FAILS_OFF],
            buildCondition([op.IF_ERROR], [op.FAIL, nameIndex], [])); //if fail, save fail with erro info
    }

    buildAlternativesCode(alternatives, context) {
        let firstChoiceCode = this.visit(alternatives[0], {
                sp: context.sp,
                env: cloneEnv(context.env),
                action: null
            });
        return buildSequence(
            firstChoiceCode,   //save first match result
            alternatives.length > 1
             ? buildCondition(
                [op.IF_ERROR],  //if previous match fail
                buildSequence(
                    [op.POP],   //drop the previous result
                    this.buildAlternativesCode(alternatives.slice(1), context)), //match the next one
                [])
             : []);
    }

    choice(node, context) {

        return this.buildAlternativesCode(node.alternatives, context);
    }

    action(node, context) {
        let env = cloneEnv(context.env);
        let emitCall = node.expression.type !== "sequence"
             || node.expression.elements.length === 0;
        let expressionCode = this.visit(node.expression, {
                sp: context.sp + (emitCall ? 1 : 0),
                env: env,
                action: node
            });
        let functionIndex = this.addFunctionConst(Object.keys(env), node.code);

        return emitCall
         ? buildSequence(
            [op.PUSH_CURR_POS],
            expressionCode,
            buildCondition(
                [op.IF_NOT_ERROR],
                buildSequence(
                    [op.LOAD_SAVED_POS, 1],
                    buildCall(functionIndex, 1, env, context.sp + 2)),
                []),
            [op.NIP])
         : expressionCode;
    }

    buildElementsCode(node, elements, context) {
        if (elements.length > 0) {
            let processedCount = node.elements.length - elements.slice(1).length;
            let element0Code = this.visit(elements[0], {
                    sp: context.sp,
                    env: context.env,
                    action: null
                });
            return buildSequence(
                element0Code,     //current match result
                buildCondition(
                    [op.IF_NOT_ERROR], //check current match result
                    this.buildElementsCode(node, elements.slice(1), {  //check the next one
                        sp: context.sp + 1,
                        env: context.env,
                        action: context.action
                    }),
                    buildSequence(
                        processedCount > 1 ? [op.POP_N, processedCount] : [op.POP], //drop the previous saved match result
                        [op.POP_CURR_POS],   //drop the saved current position
                        [op.PUSH_FAILED]))); //save the result as fail
        } else {
            if (context.action) {
                let functionIndex = this.addFunctionConst(
                        Object.keys(context.env),
                        context.action.code);

                return buildSequence(
                    [op.LOAD_SAVED_POS, node.elements.length], //reset the saved position
                    buildCall(                             //call the action code if sequence match success
                        functionIndex,
                        node.elements.length + 1,
                        context.env,
                        context.sp));
            } else {
                return buildSequence([op.WRAP, node.elements.length], [op.NIP]); //combine all the match into current result, and drop the saved position
            }
        }
    }
    sequence(node, context) {
        let elementsCode = this.buildElementsCode(node, node.elements, {
                sp: context.sp + 1,
                env: context.env,
                action: context.action
            });
        return buildSequence(
            [op.PUSH_CURR_POS],
            elementsCode);
    }

    labeled(node, context) {
        let env = cloneEnv(context.env);

        context.env[node.label] = context.sp + 1;

        return this.visit(node.expression, {
            sp: context.sp,
            env: env,
            action: null
        });
    }

    text(node, context) {
        let expressionCode = this.visit(node.expression, {
                sp: context.sp + 1,
                env: cloneEnv(context.env),
                action: null
            });
        return buildSequence(
            [op.PUSH_CURR_POS], //save current position
            expressionCode,     //save macth result
            buildCondition(   
                [op.IF_NOT_ERROR], //check if match
                buildSequence([op.POP], [op.TEXT]), //drop the match result, and save the result with text instead of expression.
                [op.NIP])); //drop teh current position, and save the reuslt as fail
    }

    simple_and(node, context) {
        let expressionCode = this.visit(node.expression, {
                sp: context.sp + 1,
                env: cloneEnv(context.env),
                action: null
            });
        return buildSimplePredicate(expressionCode, false);
    }

    simple_not(node, context) {
        let expressionCode = this.visit(node.expression, {
                sp: context.sp + 1,
                env: cloneEnv(context.env),
                action: null
            });
        return buildSimplePredicate(expressionCode, true);
    }

    optional(node, context) {
        let expressionCode = this.visit(node.expression, {
                sp: context.sp,
                env: cloneEnv(context.env),
                action: null
            });
        return buildSequence(
            expressionCode,  //the match result
            buildCondition(
                [op.IF_ERROR],  //check if match
                buildSequence([op.POP], [op.PUSH_NULL]), //if not match, drop the result and set result as null
                []));
    }

    zero_or_more(node, context) {
        let expressionCode = this.visit(node.expression, {
                sp: context.sp + 1,
                env: cloneEnv(context.env),
                action: null
            });

        return buildSequence(
            [op.PUSH_EMPTY_ARRAY],    //a new array for the match results
            expressionCode,           //the first match result
            buildAppendLoop(expressionCode), //append the other match result
            [op.POP]);   //drop the last match result, which has been pushed into array
    }

    one_or_more(node, context) {
        let expressionCode = this.visit(node.expression, {
                sp: context.sp + 1,
                env: cloneEnv(context.env),
                action: null
            });

        return buildSequence(
            [op.PUSH_EMPTY_ARRAY], //a new array for the match results
            expressionCode,        //the first match result
            buildCondition(
                [op.IF_NOT_ERROR], //check if the first match not error
                buildSequence(buildAppendLoop(expressionCode), [op.POP]), //append the other match result and drop the last match result, which has been pushed into array
                buildSequence([op.POP], [op.POP], [op.PUSH_FAILED]))); //drop the empty array, and the first match result, and set the result as failed
    }

    group(node, context) {
        return this.visit(node.expression, {
            sp: context.sp,
            env: cloneEnv(context.env),
            action: null
        });
    }

    semantic_and(node, context) {
        let functionIndex = this.addFunctionConst(Object.keys(context.env), node.code);
        return buildSemanticPredicate(functionIndex, false, context);
    }

    semantic_not(node, context) {
        let functionIndex = this.addFunctionConst(Object.keys(context.env), node.code);
        return buildSemanticPredicate(functionIndex, true, context);
    }

    rule_ref(node) {
        return [op.RULE, asts.indexOfRule(this.ast, node.name)];
    }

    literal(node) {
        if (node.value.length > 0) {
            let stringIndex = this.addConst(`"${js.stringEscape(node.ignoreCase ? node.value.toLowerCase() : node.value)}"`);
            let expectedIndex = this.addConst(`peg$literalExpectation("${js.stringEscape(node.value)}", ${node.ignoreCase})`);

            // For case-sensitive strings the value must match the beginning of the
            // remaining input exactly. As a result, we can use |ACCEPT_STRING| and
            // save one |substr| call that would be needed if we used |ACCEPT_N|.
            return buildCondition(
                node.ignoreCase
                 ? [op.MATCH_STRING_IC, stringIndex]
                 : [op.MATCH_STRING, stringIndex],
                node.ignoreCase
                 ? [op.ACCEPT_N, node.value.length]
                 : [op.ACCEPT_STRING, stringIndex],
                [op.FAIL, expectedIndex]);
        } else {
            let stringIndex = this.addConst("\"\"");

            return [op.PUSH, stringIndex];
        }
    }

    class(node) {
        let regexpParts = node.parts.map(part =>
                Array.isArray(part)
                 ? `${js.regexpClassEscape(part[0])}-${js.regexpClassEscape(part[1])}`
                 : js.regexpClassEscape(part)).join("");
        let regexp = `/^[${node.inverted ? "^" : ""}${regexpParts}]/${node.ignoreCase ? "i" : ""}`;
        let expectParts = node.parts.map(part =>
                Array.isArray(part)
                 ? `["${js.stringEscape(part[0])}", "${js.stringEscape(part[1])}"]`
                 : `"${js.stringEscape(part)}"`).join(", ");
        let parts = `[${expectParts}]`;
        let regexpIndex = this.addConst(regexp);
        let expectedIndex = this.addConst(`peg$classExpectation(${parts}, ${node.inverted}, ${node.ignoreCase})`);

        return buildCondition(
            [op.MATCH_REGEXP, regexpIndex],
            [op.ACCEPT_N, 1],
            [op.FAIL, expectedIndex]);
    }

    any() {
        let expectedIndex = this.addConst("peg$anyExpectation()");

        return buildCondition(
            [op.MATCH_ANY],
            [op.ACCEPT_N, 1],
            [op.FAIL, expectedIndex]);
    }
}

function generateBytecode(ast) {
    let v = new GenerateBytecodeClass(ast);
    v.visit(ast);
}
module.exports = generateBytecode;
