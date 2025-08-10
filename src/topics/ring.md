# Ring

## Ring Distance

> On a ring of length `n` where the ids are `0..n`, what is the distance between two position `u` and `v`.

There are two 2 distances.

```rust
let (src, dst) = (u.min(v), u.max(v));
let d1 = dst - src;
let d2 = n - d1;
```

[ABC376B](https://atcoder.jp/contests/abc376/submissions/58991107)