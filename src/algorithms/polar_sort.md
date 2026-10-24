# Polar Sort


```rust
input! {
    xy: [(i64, i64); n]
}

// cross > 0: a -> b is ccw
// cross = 0: a -> b is on same line
// cross < 0: a -> b is cw
// cross only work within 180°.
let cross = |a: (i64, i64), b: (i64, i64)| a.0 * b.1 - a.1 * b.0;

// polar angle sorting by cw
// undefined for (0, 0)
xy.sort_by(|&a, &b| {
    (a > (0, 0)) // left/right plane of a
        .cmp(&(b > (0, 0))) // left/right plane of b
        .then_with(|| cross(a, b).cmp(&0))
});
```

[ABC481E](https://atcoder.jp/contests/abc481/submissions/80353454)