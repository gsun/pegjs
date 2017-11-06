Rule LineTerminator:

```pegjs
LineTerminator
  = [\n\r\u2028\u2029]
```
rule LineTerminator include class expression.

```javascript
{
         "type": "rule",
         "name": "LineTerminator",
         "expression": {
            "type": "class",
            "parts": [
               "
",
               "
",
               "\u2028",
               "\u2029"
            ],
            "inverted": false,
            "ignoreCase": false,
            "location": {
               "start": {
                  "offset": 5208,
                  "line": 220,
                  "column": 5
               },
               "end": {
                  "offset": 5226,
                  "line": 220,
                  "column": 23
               }
            }
         },
         "location": {
            "start": {
               "offset": 5189,
               "line": 219,
               "column": 1
            },
            "end": {
               "offset": 5227,
               "line": 221,
               "column": 1
            }
         }
      }
```
  
bytecode:20,48,2,2,21,1,23,49

```javascript
  var peg$c48 = /^[\n\r\u{2028}\u{2029}]/;
  
  function peg$parseLineTerminator() {
    var startPos = peg$currPos;
    var s0;


    if (peg$c48.test(input.charAt(peg$currPos))) {          //20,48,2,2      op.MATCH_REGEXP c48 then-length else-length 
      s0 = input.charAt(peg$currPos);                       //21,1           op.ACCEPT_N 1
      peg$currPos++;                                        //               
    } else {                                                //               
      s0 = peg$FAILED;                                      //23,49          op.FAIL 49
      if (peg$silentFails === 0) {
        peg$fail(peg$c49);
      }
    }


    return s0;

  }
```