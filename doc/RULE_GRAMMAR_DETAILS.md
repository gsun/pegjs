let us check the Grammar rule in parser.pegjs for example.

```pegjs
Grammar
  = __ initializer:(Initializer __)? rules:(Rule __)+ {
      return {
        type: "grammar",
        initializer: extractOptional(initializer, 0),
        rules: extractList(rules, 0),
        location: location()
      };
    }
```

Grammar rule includes a sequence of rule refs.
the first rule is rule __.
the second rule is a subsequence rules include rule Initializer and rule __, and the second rule is optional.
the last rule is a subsequence rules include rule Rule and rule __, and the last rule has at least one.
there is an action if match, and the action code will use the label(initializer, rules) as parameters.
Grammar rule include action, sequence, rule_ref, labeled, optional, group, one_or_more expression.

ast:                                                          
```json
      {
         "type": "rule",
         "name": "Grammar",
         "expression": {
            "type": "action",
            "expression": {
               "type": "sequence",                            
               "elements": [                                  
                  {                                           
                     "type": "rule_ref",                      
                     "name": "__",                            
                     "location": {
                        "start": {
                           "offset": 1552,
                           "line": 58,
                           "column": 5
                        },
                        "end": {
                           "offset": 1554,
                           "line": 58,
                           "column": 7
                        }
                     }
                  },                                          
                  {                                           
                     "type": "labeled",                       
                     "label": "initializer",                  
                     "expression": {                          
                        "type": "optional",                   
                        "expression": {                       
                           "type": "group",                   
                           "expression": {                    
                              "type": "sequence",             
                              "elements": [                   
                                 {                            
                                    "type": "rule_ref",       
                                    "name": "Initializer",    
                                    "location": {
                                       "start": {
                                          "offset": 1568,
                                          "line": 58,
                                          "column": 21
                                       },
                                       "end": {
                                          "offset": 1579,
                                          "line": 58,
                                          "column": 32
                                       }
                                    }
                                 },
                                 {                               
                                    "type": "rule_ref",          
                                    "name": "__",                
                                    "location": {
                                       "start": {
                                          "offset": 1580,
                                          "line": 58,
                                          "column": 33
                                       },
                                       "end": {
                                          "offset": 1582,
                                          "line": 58,
                                          "column": 35
                                       }
                                    }
                                 }                               
                              ],                                 
                              "location": {                      
                                 "start": {                      
                                    "offset": 1568,              
                                    "line": 58,                  
                                    "column": 21                 
                                 },                              
                                 "end": {                        
                                    "offset": 1582,              
                                    "line": 58,                  
                                    "column": 35
                                 }
                              }
                           }
                        },
                        "location": {
                           "start": {
                              "offset": 1567,
                              "line": 58,
                              "column": 20
                           },
                           "end": {
                              "offset": 1584,
                              "line": 58,
                              "column": 37
                           }
                        }
                     },
                     "location": {
                        "start": {
                           "offset": 1555,
                           "line": 58,
                           "column": 8
                        },
                        "end": {
                           "offset": 1584,
                           "line": 58,
                           "column": 37
                        }
                     }
                  },
                  {                                                  
                     "type": "labeled",                              
                     "label": "rules",                               
                     "expression": {                                 
                        "type": "one_or_more",                       
                        "expression": {                              
                           "type": "group",                          
                           "expression": {                           
                              "type": "sequence",                    
                              "elements": [                          
                                 {                                   
                                    "type": "rule_ref",              
                                    "name": "Rule",                  
                                    "location": {
                                       "start": {
                                          "offset": 1592,
                                          "line": 58,
                                          "column": 45
                                       },
                                       "end": {
                                          "offset": 1596,
                                          "line": 58,
                                          "column": 49
                                       }
                                    }
                                 },
                                 {                                   
                                    "type": "rule_ref",              
                                    "name": "__",                    
                                    "location": {
                                       "start": {
                                          "offset": 1597,
                                          "line": 58,
                                          "column": 50
                                       },
                                       "end": {
                                          "offset": 1599,
                                          "line": 58,
                                          "column": 52
                                       }
                                    }
                                 }                                   
                              ],                                     
                              "location": {                          
                                 "start": {                          
                                    "offset": 1592,                  
                                    "line": 58,                      
                                    "column": 45                     
                                 },                                  
                                 "end": {                            
                                    "offset": 1599,                  
                                    "line": 58,                      
                                    "column": 52                     
                                 }                                   
                              }                                      
                           }                                         
                        },                                           
                        "location": {                                
                           "start": {
                              "offset": 1591,                        
                              "line": 58,
                              "column": 44
                           },
                           "end": {
                              "offset": 1601,
                              "line": 58,
                              "column": 54
                           }
                        }
                     },
                     "location": {
                        "start": {
                           "offset": 1585,
                           "line": 58,
                           "column": 38
                        },
                        "end": {
                           "offset": 1601,
                           "line": 58,
                           "column": 54
                        }
                     }
                  }
               ],
               "location": {
                  "start": {
                     "offset": 1552,
                     "line": 58,
                     "column": 5
                  },
                  "end": {
                     "offset": 1601,
                     "line": 58,
                     "column": 54
                  }
               }
            },
            "code": "                                                     
      return {                                                            
        type: \"grammar\",                                                
        initializer: extractOptional(initializer, 0),                     
        rules: extractList(rules, 0),                                     
        location: location()                                              
      };                                                                  
    ",                                                                    
            "location": {                                                 
               "start": {                                                 
                  "offset": 1552,                                         
                  "line": 58,                                             
                  "column": 5                                             
               },                                                         
               "end": {
                  "offset": 1779,
                  "line": 65,
                  "column": 6
               }
            }
         },
         "location": {
            "start": {
               "offset": 1540,
               "line": 57,
               "column": 1
            },
            "end": {
               "offset": 1780,
               "line": 66,
               "column": 1
            }
         }
      }
```	  
bytecode:
5,27,100,15,101,3,5,27,1,15,12,3,27,100,15,3,4,11,2,9,8,2,7,3,6,7,3,14,2,0,6,2,
15,68,4,4,5,27,2,15,12,3,27,100,15,3,4,11,2,9,8,2,7,3,6,7,3,15,25,3,16,22,10,5,
27,2,15,12,3,27,100,15,3,4,11,2,9,8,2,7,3,6,7,3,6,6,6,3,15,8,4,24,3,26,0,4,2,1,
0,8,3,7,3,8,2,7,3,6,7,3


generated code:
each rule will generate one function, and rule Grammar is peg$parseGrammar.
```javascript
  function peg$parseGrammar() {
    var startPos = peg$currPos;
    var s0,
    s1,
    s2,
    s3,
    s4,
    s5,
    s6;

    s0 = peg$currPos;                          //5,        op.PUSH_CURR_POS         
    s1 = peg$parse__();                        //27,100    op.RULE __
    if (s1 !== peg$FAILED) {                   //15,101,3  op.IF_NOT_ERROR then-length else-length
      s2 = peg$currPos;                        //5,        op.PUSH_CURR_POS                         #check rule (Initializer __)?
      s3 = peg$parseInitializer();             //27,1      op.RULE Initializer
      if (s3 !== peg$FAILED) {                 //15,12,3   op.IF_NOT_ERROR then-length else-length
        s4 = peg$parse__();                    //27,1      op.RULE __
        if (s4 !== peg$FAILED) {               //15,3,4    op.IF_NOT_ERROR then-length else-length
          s3 = [s3, s4];                       //11,2,9    op.WRAP                                  #retrun the group match with array
          s2 = s3;                             //8,2,      op.POP_N N=2
        } else {                               //                                  
          peg$currPos = s2;                    //7,        op.POP_CURR_POS                          #restore the saved position if no match
          s2 = peg$FAILED;                     //3,        op.PUSH_FAILED          
        }                                      //                                  
      } else {                                 //6,        op.POP                  
        peg$currPos = s2;                      //7,        op.POP_CURR_POS         
        s2 = peg$FAILED;                       //3,        op.PUSH_FAILED          
      }                                        //                                  
      if (s2 === peg$FAILED) {                 //14,2,0    op.IF_ERROR then-length else-length
        s2 = null;                             //6,        op.POP                                   #fail is ok, because rule (Initializer __) is optional
      }                                        //2,        op.PUSH_NULL            
      if (s2 !== peg$FAILED) {                 //15,68,4   op.IF_NOT_ERROR then-length else-length
        s3 = [];                               //4,        op.PUSH_EMPTY_ARRAY     
        s4 = peg$currPos;                      //5,        op.PUSH_CURR_POS                         #check rule (Rule __)+
        s5 = peg$parseRule();                  //27,2      op.RULE Rule
        if (s5 !== peg$FAILED) {               //15,12,3   op.IF_NOT_ERROR then-length else-length
          s6 = peg$parse__();                  //27,100    op.RULE __
          if (s6 !== peg$FAILED) {             //15,3,4    op.IF_NOT_ERROR then-length else-length
            s5 = [s5, s6];                     //11,2,9    op.WRAP                                  #return group match with array
            s4 = s5;                           //8,2,      op.POP_N                
          } else {                             //                                  
            peg$currPos = s4;                  //7,        op.POP_CURR_POS         
            s4 = peg$FAILED;                   //3,        op.PUSH_FAILED          
          }                                    //                                  
        } else {                               //6,        op.POP                  
          peg$currPos = s4;                    //7,        op.POP_CURR_POS         
          s4 = peg$FAILED;                     //3,        op.PUSH_FAILED          
        }                                      //                                  
        if (s4 !== peg$FAILED) {               //15,25,3   op.IF_NOT_ERROR then-length else-length
          while (s4 !== peg$FAILED) {          //16,22     op.WHILE_NOT_ERROR                       #check more for rule (Rule __)+
            s3.push(s4);                       //10,       op.APPEND               
            s4 = peg$currPos;                  //5,        op.PUSH_CURR_POS        
            s5 = peg$parseRule();              //27,2      op.RULE                 
            if (s5 !== peg$FAILED) {           //15,12,3   op.IF_NOT_ERROR then-length else-length
              s6 = peg$parse__();              //27,100    op.RULE                 
              if (s6 !== peg$FAILED) {         //15,3,4    op.IF_NOT_ERROR then-length else-length
                s5 = [s5, s6];                 //11,2,9    op.WRAP                 
                s4 = s5;                       //8,2,      op.POP_N N=2
              } else {                         //                                  
                peg$currPos = s4;              //7,        op.POP_CURR_POS         
                s4 = peg$FAILED;               //3,        op.PUSH_FAILED          
              }                                //                                  
            } else {                           //6,        op.POP                  
              peg$currPos = s4;                //7,        op.POP_CURR_POS         
              s4 = peg$FAILED;                 //3,        op.PUSH_FAILED          
            }                                  //6,        op.POP                  
          }                                    //6,        op.POP                  
        } else {                               //6,        op.POP                  
          s3 = peg$FAILED;                     //3,        op.PUSH_FAILED          
        }                                      //                                  
        if (s3 !== peg$FAILED) {               //15,8,4    op.IF_NOT_ERROR then-length else-length
          peg$savedPos = s0;                   //24,3      op.LOAD_SAVED_POS       
          s0 = peg$c0(s2, s3);                 //26,0,4,2,1,0       op.CALL c0  param-lenth param1 param2                           #call the action, with s2, s3 as parameters.
        } else {                               //8,3,      op.POP_N N=3                                #peg$c0 is the action code, s2,s3 is the label(initializer, rules) in rule.
          peg$currPos = s0;                    //7,        op.POP_CURR_POS
          s0 = peg$FAILED;                     //3,        op.PUSH_FAILED
        }                                      //
      } else {                                 //8,2,      op.POP_N N=2
        peg$currPos = s0;                      //7,        op.POP_CURR_POS
        s0 = peg$FAILED;                       //3,        op.PUSH_FAILED
      }                                        //
    } else {                                   //6,        op.POP
      peg$currPos = s0;                        //7,        op.POP_CURR_POS
      s0 = peg$FAILED;                         //3,        op.PUSH_FAILED
    }

    return s0;

  }
  
action code:  
  var peg$c0 = function (initializer, rules) {
    return {
      type: "grammar",
      initializer: extractOptional(initializer, 0),
      rules: extractList(rules, 0),
      location: location()
    };
  };
```