@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace
@builtin "number.ne"     # `int`, `decimal`, and `percentage` number primitives

Line -> Assignment | Operation
Assignment -> int _ assign _ letter
Operation -> Operator _ assign _ letter
Operator -> NOT | AND | OR | LSHIFT | RSHIFT

letter -> [a-zA-Z]:+
assign -> "->"
NOT -> "NOT" _ letter
AND -> letter _ "AND" _ letter
OR -> letter _ "OR" _ letter
LSHIFT -> letter _ "LSHIFT" _ int
RSHIFT -> letter _ "RSHIFT" _ int
