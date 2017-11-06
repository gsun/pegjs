```pegjs
Comment "comment"
  = MultiLineComment
  / SingleLineComment
```
```javascript
{
         "type": "rule",
         "name": "Comment",
         "expression": {
            "type": "named",
            "name": "comment",
            "expression": {
               "type": "choice",
               "alternatives": [
                  {
                     "type": "rule_ref",
                     "name": "MultiLineComment",
                     "location": {
                        "start": {
                           "offset": 5343,
                           "line": 230,
                           "column": 5
                        },
                        "end": {
                           "offset": 5359,
                           "line": 230,
                           "column": 21
                        }
                     }
                  },
                  {
                     "type": "rule_ref",
                     "name": "SingleLineComment",
                     "location": {
                        "start": {
                           "offset": 5364,
                           "line": 231,
                           "column": 5
                        },
                        "end": {
                           "offset": 5381,
                           "line": 231,
                           "column": 22
                        }
                     }
                  }
               ],
               "location": {
                  "start": {
                     "offset": 5343,
                     "line": 230,
                     "column": 5
                  },
                  "end": {
                     "offset": 5381,
                     "line": 231,
                     "column": 22
                  }
               }
            },
            "location": {
               "start": {
                  "offset": 5321,
                  "line": 229,
                  "column": 1
               },
               "end": {
                  "offset": 5382,
                  "line": 232,
                  "column": 1
               }
            }
         },
         "location": {
            "start": {
               "offset": 5321,
               "line": 229,
               "column": 1
            },
            "end": {
               "offset": 5382,
               "line": 232,
               "column": 1
            }
         }
      }
```
      
bytecode:28,27,20,14,3,0,6,27,22,29,14,2,0,23,61

```javascript
choice:
  function peg$parseComment() {
    var startPos = peg$currPos;
    var s0,
    s1;

    peg$silentFails++;                                          //op.SILENT_FAILS_ON,
    s0 = peg$parseMultiLineComment();                           //op.Rule 20
    if (s0 === peg$FAILED) {                                    //op.IF_ERROR, 3, 0,
      s0 = peg$parseSingleLineComment();                        //op.POP
    }                                                           //op.Rule 22
    peg$silentFails--;                                          //op.SILENT_FAILS_OFF,
    if (s0 === peg$FAILED) {                                    //op.IF_ERROR, 2, 0, 
      s1 = peg$FAILED;                                          //op.FAIL, nameIndex
      if (peg$silentFails === 0) {
        peg$fail(peg$c61);
      }
    }

    return s0;

  } 
```