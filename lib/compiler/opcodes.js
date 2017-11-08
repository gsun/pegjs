"use strict";

// Bytecode instruction opcodes.
const opcodes = {
    // Stack Manipulation

    PUSH: 0, // PUSH c, save current match result
    PUSH_UNDEFINED: 1, // PUSH_UNDEFINED, save current match as undefined
    PUSH_NULL: 2, // PUSH_NULL, save current match as null
    PUSH_FAILED: 3, // PUSH_FAILED, save current match as peg$FAILED
    PUSH_EMPTY_ARRAY: 4, // PUSH_EMPTY_ARRAY, save current match as [], which is used in the begining of zero_or_more or one_or_more match
    PUSH_CURR_POS: 5, // PUSH_CURR_POS, save current position, which is restored if match fail
    POP: 6, // POP, drop current match result
    POP_CURR_POS: 7, // POP_CURR_POS, restore the save positon to current position for match fail
    POP_N: 8, // POP_N n, drop the previous N match result, which is used for sequence match fail on the Nth elements
    NIP: 9, // NIP, drop the previous match, and keep the current match
    APPEND: 10, // APPEND, append current match into [], which is used for zero_or_more or one_or_more
    WRAP: 11, // WRAP n, combine the previous matches, which is used in group
    TEXT: 12, // TEXT, save the text instead of expression if the current match

    // Conditions and Loops

    IF: 13, // IF t, f, if match success
    IF_ERROR: 14, // IF_ERROR t, f, if  match fail
    IF_NOT_ERROR: 15, // IF_NOT_ERROR t, f, if  match not fail
    WHILE_NOT_ERROR: 16, // WHILE_NOT_ERROR b, while match not fail

    // Matching

    MATCH_ANY: 17, // MATCH_ANY a, f, ..., match any single character
    MATCH_STRING: 18, // MATCH_STRING s, a, f, ..., match the string
    MATCH_STRING_IC: 19, // MATCH_STRING_IC s, a, f, ..., match the string ignore case.
    MATCH_REGEXP: 20, // MATCH_REGEXP r, a, f, ..., match with the regexp
    ACCEPT_N: 21, // ACCEPT_N n, accecpt n characters as match reault
    ACCEPT_STRING: 22, // ACCEPT_STRING s, accept the string as match result
    FAIL: 23, // FAIL e, set result as fail

    // Calls

    LOAD_SAVED_POS: 24, // LOAD_SAVED_POS p
    UPDATE_SAVED_POS: 25, // UPDATE_SAVED_POS
    CALL: 26, // CALL f, n, pc, p1, p2, ..., pN,  call the action code

    // Rules

    RULE: 27, // RULE r, call the rule to match

    // Failure Reporting

    SILENT_FAILS_ON: 28, // SILENT_FAILS_ON
    SILENT_FAILS_OFF: 29, // SILENT_FAILS_OFF
};

module.exports = opcodes;
