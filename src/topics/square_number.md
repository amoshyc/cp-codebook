# Square Number

Let `f(x)` = largest divisor of x that is square number.
`a * b` is square number if and only if `a / f(a) == b / f(b)`.

```rust
// Build f
let mut f = vec![0; m + 1];
for d in (1..).take_while(|&d| d * d <= m) {
    for x in ((d * d)..=m).step_by(d * d) {
        f[x] = d * d;
    }
}
```

ABC254D, ABC342D: <https://atcoder.jp/contests/abc342/submissions/50600083>