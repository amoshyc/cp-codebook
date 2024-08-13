# Binary Operations


## Period of Each Bit

```
index : 4 3 2 1 0
        - - - - -
    0 : 0 0 0 0 0
    1 : 0 0 0 0 1
    2 : 0 0 0 1 0
    3 : 0 0 0 1 1
    4 : 0 0 1 0 0
    5 : 0 0 1 0 1
    6 : 0 0 1 1 0
    7 : 0 0 1 1 1
    8 : 0 1 0 0 0
    9 : 0 1 0 0 1
   10 : 0 1 0 1 0
   11 : 0 1 0 1 1
   12 : 0 1 1 0 0
   13 : 0 1 1 0 1  <-- n
   14 : 0 1 1 1 0
   15 : 0 1 1 1 1
   16 : 1 0 0 0 0
```

* There are [{n + 1}] numbers from [{"0..=n"}]. 
* For the [{i}]-th bit:
   * period = [{2 ^ (i + 1)}]
   * [{0..2 ^ i}] is [{0}]
   * [{2 ^ i..2 ^ (i + 1)}] is [{1}]

[ABC356D](https://atcoder.jp/contests/abc356/submissions/54154574)


## XOR

* XOR is not distributive over addition.
* XOR is bit independent. [ABC365E](https://atcoder.jp/contests/abc365/submissions/56361454)