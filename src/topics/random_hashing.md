# Random Hashing

> Given 2 Sequences `A`, `B` of length N and Q queries. Query `(la, ra, lb, rb)` asks if it is possible to rearrange `A[la..=ra]` to match `B[lb..=rb]`. [ABC367F](https://atcoder.jp/contests/abc367/submissions/56836954)

Random project each value to large integer(s) and store them in SegTree/PrefixSum. 
The query can be answered by checking the sum of the corresponding intervals.

```rust
let mut rnd = XorShift64 { seed: 123 };
let mut proj = vec![];
for i in 0..=n {
    let r1 = rnd.new() % M1;
    let r2 = rnd.new() % M2;
    proj.push((r1, r2));
}
let arr_a = mapv(&arr_a, |&x| proj[x]);
let arr_b = mapv(&arr_b, |&x| proj[x]);
```

```rust
let va = query(&pref_a, la, ra + 1);
let vb = query(&pref_b, lb, rb + 1);
let ok = ra - la == rb - lb && va == vb;
```