Rule Code:

```pegjs
Code
  = $((![{}] SourceCharacter)+ / "{" Code "}")*
```

rule Code include text, zero_or_more, choice, one_or_more, group, sequence, simple_not, class, rule_ref, literal expression.  

```javascript  
{
         "type": "rule",
         "name": "Code",
         "expression": {
            "type": "text",
            "expression": {
               "type": "zero_or_more",
               "expression": {
                  "type": "choice",
                  "alternatives": [
                     {
                        "type": "one_or_more",
                        "expression": {
                           "type": "group",
                           "expression": {
                              "type": "sequence",
                              "elements": [
                                 {
                                    "type": "simple_not",
                                    "expression": {
                                       "type": "class",
                                       "parts": [
                                          "{",
                                          "}"
                                       ],
                                       "inverted": false,
                                       "ignoreCase": false,
                                       "location": {
                                          "start": {
                                             "offset": 9436,
                                             "line": 442,
                                             "column": 9
                                          },
                                          "end": {
                                             "offset": 9440,
                                             "line": 442,
                                             "column": 13
                                          }
                                       }
                                    },
                                    "location": {
                                       "start": {
                                          "offset": 9435,
                                          "line": 442,
                                          "column": 8
                                       },
                                       "end": {
                                          "offset": 9440,
                                          "line": 442,
                                          "column": 13
                                       }
                                    }
                                 },
                                 {
                                    "type": "rule_ref",
                                    "name": "SourceCharacter",
                                    "location": {
                                       "start": {
                                          "offset": 9441,
                                          "line": 442,
                                          "column": 14
                                       },
                                       "end": {
                                          "offset": 9456,
                                          "line": 442,
                                          "column": 29
                                       }
                                    }
                                 }
                              ],
                              "location": {
                                 "start": {
                                    "offset": 9435,
                                    "line": 442,
                                    "column": 8
                                 },
                                 "end": {
                                    "offset": 9456,
                                    "line": 442,
                                    "column": 29
                                 }
                              }
                           }
                        },
                        "location": {
                           "start": {
                              "offset": 9434,
                              "line": 442,
                              "column": 7
                           },
                           "end": {
                              "offset": 9458,
                              "line": 442,
                              "column": 31
                           }
                        }
                     },
                     {
                        "type": "sequence",
                        "elements": [
                           {
                              "type": "literal",
                              "value": "{",
                              "ignoreCase": false,
                              "location": {
                                 "start": {
                                    "offset": 9461,
                                    "line": 442,
                                    "column": 34
                                 },
                                 "end": {
                                    "offset": 9464,
                                    "line": 442,
                                    "column": 37
                                 }
                              }
                           },
                           {
                              "type": "rule_ref",
                              "name": "Code",
                              "location": {
                                 "start": {
                                    "offset": 9465,
                                    "line": 442,
                                    "column": 38
                                 },
                                 "end": {
                                    "offset": 9469,
                                    "line": 442,
                                    "column": 42
                                 }
                              }
                           },
                           {
                              "type": "literal",
                              "value": "}",
                              "ignoreCase": false,
                              "location": {
                                 "start": {
                                    "offset": 9470,
                                    "line": 442,
                                    "column": 43
                                 },
                                 "end": {
                                    "offset": 9473,
                                    "line": 442,
                                    "column": 46
                                 }
                              }
                           }
                        ],
                        "location": {
                           "start": {
                              "offset": 9461,
                              "line": 442,
                              "column": 34
                           },
                           "end": {
                              "offset": 9473,
                              "line": 442,
                              "column": 46
                           }
                        }
                     }
                  ],
                  "location": {
                     "start": {
                        "offset": 9434,
                        "line": 442,
                        "column": 7
                     },
                     "end": {
                        "offset": 9473,
                        "line": 442,
                        "column": 46
                     }
                  }
               },
               "location": {
                  "start": {
                     "offset": 9433,
                     "line": 442,
                     "column": 6
                  },
                  "end": {
                     "offset": 9475,
                     "line": 442,
                     "column": 48
                  }
               }
            },
            "location": {
               "start": {
                  "offset": 9432,
                  "line": 442,
                  "column": 5
               },
               "end": {
                  "offset": 9475,
                  "line": 442,
                  "column": 48
               }
            }
         },
         "location": {
            "start": {
               "offset": 9423,
               "line": 441,
               "column": 1
            },
            "end": {
               "offset": 9476,
               "line": 443,
               "column": 1
            }
         }
      }
```

bytecode:5,4,4,5,5,28,20,143,2,2,21,1,23,144,29,14,3,3,6,6,1,6,7,
3,15,12,3,27,15,15,3,4,11,2,9,8,2,7,3,6,7,3,15,43,3,16,40,10,5,5,28,20,143,2,2,2
1,1,23,144,29,14,3,3,6,6,1,6,7,3,15,12,3,27,15,15,3,4,11,2,9,8,2,7,3,6,7,3,6,6,6
,3,14,43,0,6,5,18,137,2,2,22,137,23,138,15,27,3,27,52,15,18,4,18,139,2,2,22,139,
23,140,15,3,4,11,3,9,8,3,7,3,8,2,7,3,6,7,3,16,136,10,4,5,5,28,20,143,2,2,21,1,23
,144,29,14,3,3,6,6,1,6,7,3,15,12,3,27,15,15,3,4,11,2,9,8,2,7,3,6,7,3,15,43,3,16,
40,10,5,5,28,20,143,2,2,21,1,23,144,29,14,3,3,6,6,1,6,7,3,15,12,3,27,15,15,3,4,1
1,2,9,8,2,7,3,6,7,3,6,6,6,3,14,43,0,6,5,18,137,2,2,22,137,23,138,15,27,3,27,52,1
5,18,4,18,139,2,2,22,139,23,140,15,3,4,11,3,9,8,3,7,3,8,2,7,3,6,7,3,6,15,2,1,6,1
2,9

```javascript
  function peg$parseCode() {
    var startPos = peg$currPos;
    var s0,
    s1,
    s2,
    s3,
    s4,
    s5;

    s0 = peg$currPos;                                             //5,          op.PUSH_CURR_POS
    s1 = [];                                                      //4,          op.PUSH_EMPTY_ARRAY
    s2 = [];                                                      //4,          op.PUSH_EMPTY_ARRAY  
    s3 = peg$currPos;                                             //5,          op.PUSH_CURR_POS
    s4 = peg$currPos;                                             //5,          op.PUSH_CURR_POS
    peg$silentFails++;                                            //28          op.SILENT_FAILS_ON
    if (peg$c143.test(input.charAt(peg$currPos))) {               //20,143,2,2  op.MATCH_REGEXP c143 then-length else-length
      s5 = input.charAt(peg$currPos);                             //21,1        op.ACCEPT_N 1
      peg$currPos++;                                              //
    } else {                                                      //
      s5 = peg$FAILED;                                            //23,144      op.FAIL c144
      if (peg$silentFails === 0) {                                //
        peg$fail(peg$c144);                                       //
      }                                                           //
    }                                                             //
    peg$silentFails--;                                            //29          op.SILENT_FAILS_OFF
    if (s5 === peg$FAILED) {                                      //14,3,3      op.IF_ERROR then-length else-length
      s4 = undefined;                                             //6,6,1       op.POP op.POP op.PUSH_UNDEFINED
    } else {                                                      //
      peg$currPos = s4;                                           //6,7         op.POP op.POP_CURR_POS
      s4 = peg$FAILED;                                            //3,          op.PUSH_FAILED
    }                                                             //
    if (s4 !== peg$FAILED) {                                      //15,12,3     op.IF_NOT_ERROR then-length else-length
      s5 = peg$parseSourceCharacter();                            //27,15       op.RULE SourceCharacter
      if (s5 !== peg$FAILED) {                                    //15,3,4      op.IF_NOT_ERROR then-length else-length
        s4 = [s4, s5];                                            //11,2,9      op.WRAP  element-length op.NIP
        s3 = s4;                                                  //8,2,        op.POP_N N=2
      } else {                                                    //
        peg$currPos = s3;                                         //7,          op.POP_CURR_POS
        s3 = peg$FAILED;                                          //3,          op.PUSH_FAILED
      }                                                           //            
    } else {                                                      //6,          op.POP
      peg$currPos = s3;                                           //7,          op.POP_CURR_POS
      s3 = peg$FAILED;                                            //3,          op.PUSH_FAILED
    }                                                             //            
    if (s3 !== peg$FAILED) {                                      //15,43,3     op.IF_NOT_ERROR then-length else-length
      while (s3 !== peg$FAILED) {                                 //16,40       op.WHILE_NOT_ERROR body-length
        s2.push(s3);                                              //10,         op.APPEND
        s3 = peg$currPos;                                         //5,          op.PUSH_CURR_POS
        s4 = peg$currPos;                                         //5,          op.PUSH_CURR_POS
        peg$silentFails++;                                        //28          op.SILENT_FAILS_ON
        if (peg$c143.test(input.charAt(peg$currPos))) {           //20,143,2,2  op.MATCH_REGEXP c143 then-length else-length
          s5 = input.charAt(peg$currPos);                         //21,1        op.ACCEPT_N 1
          peg$currPos++;                                          //
        } else {                                                  //
          s5 = peg$FAILED;                                        //23,144      op.FAIL c144
          if (peg$silentFails === 0) {                            //
            peg$fail(peg$c144);                                   //
          }                                                       //
        }                                                         //
        peg$silentFails--;                                        //29          op.SILENT_FAILS_OFF
        if (s5 === peg$FAILED) {                                  //14,3,3      op.IF_ERROR then-length else-length
          s4 = undefined;                                         //6,6,1       op.POP op.POP op.PUSH_UNDEFINED
        } else {                                                  //
          peg$currPos = s4;                                       //6,7         op.POP op.POP_CURR_POS
          s4 = peg$FAILED;                                        //3,          op.PUSH_FAILED
        }                                                         //
        if (s4 !== peg$FAILED) {                                  //15,12,3     op.IF_NOT_ERROR then-length else-length
          s5 = peg$parseSourceCharacter();                        //27,15       op.RULE SourceCharacter
          if (s5 !== peg$FAILED) {                                //15,3,4      op.IF_NOT_ERROR then-length else-length
            s4 = [s4, s5];                                        //11,2,9      op.WRAP  element-length op.NIP
            s3 = s4;                                              //8,2,        op.POP_N N=2
          } else {                                                //
            peg$currPos = s3;                                     //7,          op.POP_CURR_POS
            s3 = peg$FAILED;                                      //3,          op.PUSH_FAILED
          }                                                       //            
        } else {                                                  //6,          op.POP
          peg$currPos = s3;                                       //7,          op.POP_CURR_POS
          s3 = peg$FAILED;                                        //3,          op.PUSH_FAILED
        }                                                         //6,          op.POP
      }                                                           //6,          op.POP
    } else {                                                      //6,          op.POP
      s2 = peg$FAILED;                                            //3,          op.PUSH_FAILED
    }                                                             //            
    if (s2 === peg$FAILED) {                                      //14,43,0     op.IF_ERROR then-length else-length
      s2 = peg$currPos;                                           //6,5         op.POP op.PUSH_CURR_POS
      if (input.charCodeAt(peg$currPos) === 123) {                //18,137,2,2  op.MATCH_STRING c137 then-length else-length
        s3 = peg$c137;                                            //22,137      op.ACCEPT_STRING c137
        peg$currPos++;                                            //            
      } else {                                                    //            
        s3 = peg$FAILED;                                          //23,138      op.FAIL c138
        if (peg$silentFails === 0) {                              //            
          peg$fail(peg$c138);                                     //            
        }                                                         //            
      }                                                           //            
      if (s3 !== peg$FAILED) {                                    //15,27,3     op.IF_NOT_ERROR then-length else-length
        s4 = peg$parseCode();                                     //27,52       op.Rule Code
        if (s4 !== peg$FAILED) {                                  //15,18,4     op.IF_NOT_ERROR then-length else-length
          if (input.charCodeAt(peg$currPos) === 125) {            //18,139,2,2  op.MATCH_STRING c139 then-length else-length
            s5 = peg$c139;                                        //22,139      op.ACCEPT_STRING c139
            peg$currPos++;                                        //
          } else {                                                //
            s5 = peg$FAILED;                                      //23,140      op.FAIL c140
            if (peg$silentFails === 0) {                          //
              peg$fail(peg$c140);                                 //
            }                                                     //
          }                                                       //
          if (s5 !== peg$FAILED) {                                //15,3,4      op.IF_NOT_ERROR then-length else-length
            s3 = [s3, s4, s5];                                    //11,3,9      op.WRAP element-length op.NIP
            s2 = s3;                                              //8,3,        op.POP_N N=3
          } else {                                                //            
            peg$currPos = s2;                                     //7,          op.POP_CURR_POS
            s2 = peg$FAILED;                                      //3,          op.PUSH_FAILED
          }                                                       //            
        } else {                                                  //8,2,        op.POP_N N=2
          peg$currPos = s2;                                       //7,          op.POP_CURR_POS
          s2 = peg$FAILED;                                        //3,          op.PUSH_FAILED
        }                                                         //            
      } else {                                                    //6,          op.POP
        peg$currPos = s2;                                         //7,          op.POP_CURR_POS
        s2 = peg$FAILED;                                          //3,          op.PUSH_FAILED
      }                                                           //            
    }                                                             //            
    while (s2 !== peg$FAILED) {                                   //16,136      op.WHILE_NOT_ERROR body-length
      s1.push(s2);                                                //10,         op.APPEND
      s2 = [];                                                    //4,          op.PUSH_EMPTY_ARRAY
      s3 = peg$currPos;                                           //5,          op.PUSH_CURR_POS
      s4 = peg$currPos;                                           //5,          op.PUSH_CURR_POS
      peg$silentFails++;                                          //28          op.SILENT_FAILS_ON
      if (peg$c143.test(input.charAt(peg$currPos))) {             //20,143,2,2  op.MATCH_REGEXP c143 then-length else-length
        s5 = input.charAt(peg$currPos);                           //21,1        op.ACCEPT_N 1
        peg$currPos++;                                            //
      } else {                                                    //
        s5 = peg$FAILED;                                          //23,144      op.FAIL c144
        if (peg$silentFails === 0) {                              //
          peg$fail(peg$c144);                                     //
        }                                                         //
      }                                                           //
      peg$silentFails--;                                          //29          op.SILENT_FAILS_OFF
      if (s5 === peg$FAILED) {                                    //14,3,3      op.IF_ERROR then-length else-length
        s4 = undefined;                                           //6,6,1       op.POP op.POP op.PUSH_UNDEFINED
      } else {                                                    //
        peg$currPos = s4;                                         //6,7         op.POP op.POP_CURR_POS
        s4 = peg$FAILED;                                          //3,          op.PUSH_FAILED
      }                                                           //
      if (s4 !== peg$FAILED) {                                    //15,12,3     op.IF_NOT_ERROR then-length else-length
        s5 = peg$parseSourceCharacter();                          //27,15       op.RULE SourceCharacter
        if (s5 !== peg$FAILED) {                                  //15,3,4      op.IF_NOT_ERROR then-length else-length
          s4 = [s4, s5];                                          //11,2,9      op.WRAP  element-length op.NIP
          s3 = s4;                                                //8,2,        op.POP_N N=2
        } else {                                                  //
          peg$currPos = s3;                                       //7,          op.POP_CURR_POS
          s3 = peg$FAILED;                                        //3,          op.PUSH_FAILED
        }                                                                     
      } else {                                                    //6,          op.POP
        peg$currPos = s3;                                         //7,          op.POP_CURR_POS
        s3 = peg$FAILED;                                          //3,          op.PUSH_FAILED
      }                                                           //            
      if (s3 !== peg$FAILED) {                                    //15,43,3     op.IF_NOT_ERROR then-length else-length
        while (s3 !== peg$FAILED) {                               //16,40       op.WHILE_NOT_ERROR body-length
          s2.push(s3);                                            //10,         op.APPEND
          s3 = peg$currPos;                                       //5,          op.PUSH_CURR_POS
          s4 = peg$currPos;                                       //5,          op.PUSH_CURR_POS
          peg$silentFails++;                                      //28          op.SILENT_FAILS_ON
          if (peg$c143.test(input.charAt(peg$currPos))) {         //20,143,2,2  op.MATCH_REGEXP c143 then-length else-length
            s5 = input.charAt(peg$currPos);                       //21,1        op.ACCEPT_N 1
            peg$currPos++;
          } else {
            s5 = peg$FAILED;                                      //23,144      op.FAIL c144
            if (peg$silentFails === 0) {                          //
              peg$fail(peg$c144);                                 //
            }                                                     //
          }                                                       //
          peg$silentFails--;                                      //29          op.SILENT_FAILS_OFF
          if (s5 === peg$FAILED) {                                //14,3,3      op.IF_ERROR then-length else-length
            s4 = undefined;                                       //6,6,1       op.POP op.POP op.PUSH_UNDEFINED
          } else {                                                //
            peg$currPos = s4;                                     //6,7         op.POP op.POP_CURR_POS
            s4 = peg$FAILED;                                      //3,          op.PUSH_FAILED
          }
          if (s4 !== peg$FAILED) {                                //15,12,3     op.IF_NOT_ERROR then-length else-length
            s5 = peg$parseSourceCharacter();                      //27,15       op.RULE SourceCharacter
            if (s5 !== peg$FAILED) {                              //15,3,4      op.IF_NOT_ERROR then-length else-length
              s4 = [s4, s5];                                      //11,2,9      op.WRAP  element-length op.NIP
              s3 = s4;                                            //8,2,        op.POP_N N=2
            } else {                                              //
              peg$currPos = s3;                                   //7,          op.POP_CURR_POS
              s3 = peg$FAILED;                                    //3,                op.PUSH_FAILED
            }                                                     //            
          } else {                                                //6,          op.POP
            peg$currPos = s3;                                     //7,          op.POP_CURR_POS
            s3 = peg$FAILED;                                      //3,                op.PUSH_FAILED
          }                                                       //6,          op.POP
        }                                                         //6,          op.POP
      } else {                                                    //6,          op.POP
        s2 = peg$FAILED;                                          //3,                op.PUSH_FAILED
      }                                                           //            
      if (s2 === peg$FAILED) {                                    //14,43,0     op.IF_ERROR then-length else-length
        s2 = peg$currPos;                                         //6,5         op.POP op.PUSH_CURR_POS
        if (input.charCodeAt(peg$currPos) === 123) {              //18,137,2,2  op.MATCH_STRING c137 then-length else-length
          s3 = peg$c137;                                          //22,137      op.ACCEPT_STRING c137
          peg$currPos++;                                          //
        } else {                                                  //
          s3 = peg$FAILED;                                        //23,138      op.FAIL c138
          if (peg$silentFails === 0) {                            //
            peg$fail(peg$c138);                                   //
          }                                                       //
        }                                                         //
        if (s3 !== peg$FAILED) {                                  //15,27,3     op.IF_NOT_ERROR then-length else-length
          s4 = peg$parseCode();                                   //27,52       op.Rule Code
          if (s4 !== peg$FAILED) {                                //15,18,4     op.IF_NOT_ERROR then-length else-length
            if (input.charCodeAt(peg$currPos) === 125) {          //18,139,2,2  op.MATCH_STRING c139 then-length else-length
              s5 = peg$c139;                                      //22,139      op.ACCEPT_STRING c139
              peg$currPos++;                                      //
            } else {                                              //
              s5 = peg$FAILED;                                    //23,140      op.FAIL c140
              if (peg$silentFails === 0) {                        //
                peg$fail(peg$c140);                               //
              }                                                   //
            }                                                     //
            if (s5 !== peg$FAILED) {                              //15,3,4      op.IF_NOT_ERROR then-length else-length
              s3 = [s3, s4, s5];                                  //11,3,9      op.WRAP element-length op.NIP
              s2 = s3;                                            //8,3,        op.POP_N N=3
            } else {                                              //            
              peg$currPos = s2;                                   //7,          op.POP_CURR_POS
              s2 = peg$FAILED;                                    //3,          op.PUSH_FAILED
            }                                                     //            
          } else {                                                //8,2,        op.POP_N N=2
            peg$currPos = s2;                                     //7,          op.POP_CURR_POS
            s2 = peg$FAILED;                                      //3,          op.PUSH_FAILED
          }                                                       //            
        } else {                                                  //6,          op.POP
          peg$currPos = s2;                                       //7,          op.POP_CURR_POS
          s2 = peg$FAILED;                                        //3,          op.PUSH_FAILED
        }                                                         //            
      }                                                           //6,          op.POP
    }                                                             //            
    if (s1 !== peg$FAILED) {                                      //15,2,1      op.IF_NOT_ERROR then-length else-length
      s0 = input.substring(s0, peg$currPos);                      //6,12        op.POP op.TEXT
    } else {                                                                  
      s0 = s1;                                                    //9,          op.NIP
    }

    return s0;

  }
```