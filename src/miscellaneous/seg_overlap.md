# Segment/Rect/Cube Overlapping

The overlapping segment of segment `l1..=r1` and segment `l2..=r2` is 

```rust
let l: i64 = l1.max(l2);
let r: i64 = r1.min(r2);
let w = (r1.min(r2) - l1.max(l2)).max(0);
```

When the segments do not overlap, the result segment is **invalid**.
Don't use unsigned types for such operation, use `i64`.

Cube: [ABC361B](https://atcoder.jp/contests/abc361/submissions/55258977)